
import { notFound } from "next/navigation"
import { getCachedProfile } from "@/lib/data"
import { Button } from "@/components/ui/button"

interface PageProps {
    params: Promise<{ username: string }>
}

export default async function ProfilePage({ params }: PageProps) {
    const { username } = await params

    const profile: any = await getCachedProfile(username)

    if (!profile) notFound()

    // Theme Logic
    const mode = profile.theme?.mode || "light"
    const palette = profile.theme?.palette || "monochrome"
    const font = profile.font || "inter"

    const baseClasses = `min - h - screen flex flex - col items - center p - 8 ${mode === "dark" ? "bg-zinc-950 text-white" : "bg-white text-zinc-950"
        } `

    const fontClass = {
        inter: "font-sans",
        serif: "font-serif",
        mono: "font-mono",
    }[font as string] || "font-sans"

    const getButtonClass = () => {
        const base = "w-full max-w-md p-4 rounded-xl text-center font-medium transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-sm"

        if (mode === "dark") {
            switch (palette) {
                case "blue": return `${base} bg - blue - 600 text - white hover: bg - blue - 500`
                case "green": return `${base} bg - emerald - 600 text - white hover: bg - emerald - 500`
                case "purple": return `${base} bg - violet - 600 text - white hover: bg - violet - 500`
                default: return `${base} bg - white text - black hover: bg - gray - 100`
            }
        } else {
            switch (palette) {
                case "blue": return `${base} bg - blue - 600 text - white hover: bg - blue - 700`
                case "green": return `${base} bg - emerald - 600 text - white hover: bg - emerald - 700`
                case "purple": return `${base} bg - violet - 600 text - white hover: bg - violet - 700`
                default: return `${base} bg - black text - white hover: bg - zinc - 800`
            }
        }
    }

    return (
        <div className={`${baseClasses} ${fontClass} `}>
            <div className="w-full max-w-md flex flex-col items-center gap-6 mt-12">
                <div className="h-32 w-32 rounded-full bg-secondary overflow-hidden ring-4 ring-current ring-opacity-5">
                    {profile.avatar_url && <img src={profile.avatar_url} alt="Profile" className="h-full w-full object-cover" />}
                </div>

                <div className="text-center space-y-2">
                    <h1 className="text-2xl font-bold">{profile.full_name}</h1>
                    <p className="opacity-60">@{profile.username}</p>
                </div>

                <div className="w-full space-y-4 mt-8">
                    {(profile.links || []).map((link: any, i: number) => (
                        <a
                            key={i}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={getButtonClass()}
                        >
                            {link.title}
                        </a>
                    ))}
                    {(!profile.links || profile.links.length === 0) && (
                        <p className="text-center opacity-50 text-sm">This user hasn't added any links yet.</p>
                    )}
                </div>
            </div>
        </div>
    )
}

