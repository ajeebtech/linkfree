import { redis } from "./redis"
import { supabaseAdmin } from "./supabase-admin"

export async function getCachedProfile(username: string) {
    const cacheKey = `user:${username}`

    // Try fetching from Redis
    const cached = await redis.get(cacheKey)
    if (cached) {
        console.log(`CACHE HIT: ${username}`)
        return cached
    }

    console.log(`CACHE MISS: ${username}`)

    // Fetch from Supabase
    const { data: profile, error } = await supabaseAdmin
        .from("profiles")
        .select("*")
        .eq("username", username)
        .single()

    if (error || !profile) return null

    // Cache the result
    await redis.set(cacheKey, profile, { ex: 3600 }) // Cache for 1 hour

    return profile
}
