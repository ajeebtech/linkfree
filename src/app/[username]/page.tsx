import { notFound } from "next/navigation"

interface PageProps {
    params: Promise<{ username: string }>
}

export default async function ProfilePage({ params }: PageProps) {
    const { username } = await params

    // TODO: Fetch from Supabase
    // const profile = await getProfile(username)
    // if (!profile) notFound()

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background">
            <h1 className="text-4xl font-bold mb-4">@{username}</h1>
            <p className="text-muted-foreground">This is a placeholder for the user profile.</p>
        </div>
    )
}
