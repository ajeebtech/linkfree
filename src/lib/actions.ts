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

    const { error } = await supabaseAdmin
        .from("profiles")
        .insert({
            // Let Supabase generate the UUID for 'id'
            clerk_id: user.id,
            username,
            role,
            socials,
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
