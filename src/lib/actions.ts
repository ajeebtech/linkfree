"use server"

import { supabaseAdmin } from "./supabase-admin"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export async function checkUsernameAvailability(username: string) {
    // Basic validation
    if (!username || username.length < 3) return false
    const cleanUsername = username.toLowerCase().replace(/[^a-z0-9-_]/g, "")
    if (cleanUsername !== username) return false

    // Check reserved words
    const reserved = ["admin", "root", "api", "dashboard", "onboarding", "settings"]
    if (reserved.includes(cleanUsername)) return false

    const { data, error } = await supabaseAdmin
        .from("profiles")
        .select("username")
        .eq("username", cleanUsername)
        .single()

    if (error && error.code === 'PGRST116') {
        // No rows found, so it's available
        return true
    }

    return false
}

export async function createProfile(data: {
    username: string
    role: string
    socials: any
}) {
    const user = await currentUser()

    if (!user) {
        throw new Error("Unauthorized")
    }

    const { username, role, socials } = data

    // Double check availability
    const isAvailable = await checkUsernameAvailability(username)
    if (!isAvailable) {
        return { error: "Username taken" }
    }

    // Construct initial links from socials
    const initialLinks = []
    if (socials?.instagram) initialLinks.push({ title: "Instagram", url: `https://instagram.com/${socials.instagram}` })
    if (socials?.tiktok) initialLinks.push({ title: "TikTok", url: `https://tiktok.com/@${socials.tiktok}` })
    if (socials?.twitter) initialLinks.push({ title: "Twitter", url: `https://x.com/${socials.twitter}` })

    const { error } = await supabaseAdmin
        .from("profiles")
        .insert({
            // Let Supabase generate the UUID for 'id'
            clerk_id: user.id,
            username,
            role,
            socials,
            links: initialLinks,
            full_name: user.firstName + " " + user.lastName,
            avatar_url: user.imageUrl,
            // email: user.emailAddresses[0].emailAddress // Schema doesn't have email, maybe add it?
        })

    if (error) {
        console.error("Error creating profile:", error)
        return { error: "Failed to create profile" }
    }

    return { success: true }
}

export async function getProfile() {
    const user = await currentUser()
    if (!user) return null

    const { data, error } = await supabaseAdmin
        .from("profiles")
        .select("*")
        .eq("clerk_id", user.id)
        .single()

    if (error) return null

    // Migration: If links is empty but socials exist, populate links
    if ((!data.links || data.links.length === 0) && data.socials) {
        const newLinks = []
        if (data.socials.instagram) newLinks.push({ title: "Instagram", url: `https://instagram.com/${data.socials.instagram}` })
        if (data.socials.tiktok) newLinks.push({ title: "TikTok", url: `https://tiktok.com/@${data.socials.tiktok}` })
        if (data.socials.twitter) newLinks.push({ title: "Twitter", url: `https://x.com/${data.socials.twitter}` })

        if (newLinks.length > 0) {
            // Update DB
            await supabaseAdmin
                .from("profiles")
                .update({ links: newLinks })
                .eq("id", data.id)

            // Return updated data
            return { ...data, links: newLinks }
        }
    }

    return data
}

import { redis } from "./redis"

// ... existing imports

export async function updateProfile(data: any) {
    const user = await currentUser()
    if (!user) throw new Error("Unauthorized")

    // First, get the current profile to know the username for cache key
    const { data: currentProfile } = await supabaseAdmin
        .from("profiles")
        .select("username")
        .eq("clerk_id", user.id)
        .single()

    const { error } = await supabaseAdmin
        .from("profiles")
        .update(data)
        .eq("clerk_id", user.id)

    if (error) {
        console.error("Error updating profile:", error)
        return { error: "Failed to update profile" }
    }

    // Invalidate cache
    if (currentProfile?.username) {
        const cacheKey = `user:${currentProfile.username}`
        await redis.del(cacheKey)
        console.log(`CACHE INVALIDATED: ${currentProfile.username}`)
    }

    return { success: true }
}
