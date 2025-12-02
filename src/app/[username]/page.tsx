
import { notFound } from "next/navigation"
import { getCachedProfile } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { getIconForUrl } from "@/components/icons"
import { ProfilePreview } from "@/components/profile-preview"

interface PageProps {
    params: Promise<{ username: string }>
}

export default async function ProfilePage({ params }: PageProps) {
    const { username } = await params

    const profile: any = await getCachedProfile(username)

    if (!profile) notFound()

    return <ProfilePreview profile={profile} />
}

