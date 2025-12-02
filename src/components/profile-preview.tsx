"use client"

import React from "react"
import { getIconForUrl } from "@/components/icons"

interface ProfilePreviewProps {
    profile: {
        theme: {
            mode: "light" | "dark"
            palette: "monochrome" | "blue" | "green" | "purple"
        }
        font: string
        avatar_url?: string
        full_name: string
        username: string
        links: Array<{ title: string; url: string }>
    }
    isPreview?: boolean
}

export function ProfilePreview({ profile, isPreview = false }: ProfilePreviewProps) {
    // Theme Logic
    const mode = profile.theme?.mode || "light"
    const palette = profile.theme?.palette || "monochrome"
    const font = profile.font || "inter"

    // Page background
    const pageBg = mode === "dark" ? "bg-zinc-900" : "bg-gray-50"

    // Card styles
    const cardBg = mode === "dark" ? "bg-zinc-950 text-white border-zinc-800" : "bg-white text-zinc-950 border-gray-200"

    const fontClass = {
        inter: "font-sans",
        serif: "font-serif",
        mono: "font-mono",
    }[font as string] || "font-sans"

    const getButtonClass = () => {
        const base = "w-full p-4 rounded-xl text-center font-medium transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-sm border"

        if (mode === "dark") {
            switch (palette) {
                case "blue": return `${base} bg-blue-600 text-white border-blue-500 hover:bg-blue-500`
                case "green": return `${base} bg-emerald-600 text-white border-emerald-500 hover:bg-emerald-500`
                case "purple": return `${base} bg-violet-600 text-white border-violet-500 hover:bg-violet-500`
                default: return `${base} bg-zinc-900 text-white border-zinc-800 hover:bg-zinc-800`
            }
        } else {
            switch (palette) {
                case "blue": return `${base} bg-blue-600 text-white border-blue-600 hover:bg-blue-700`
                case "green": return `${base} bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700`
                case "purple": return `${base} bg-violet-600 text-white border-violet-600 hover:bg-violet-700`
                default: return `${base} bg-white text-black border-gray-200 hover:bg-gray-50`
            }
        }
    }

    return (
        <div className={`${isPreview ? 'min-h-full' : 'min-h-screen'} flex items-center justify-center p-4 ${pageBg} ${fontClass}`}>
            <div className={`w-full max-w-lg flex flex-col items-center justify-start gap-8 pt-20 px-8 pb-8 rounded-[3rem] shadow-2xl border ${cardBg}`}>
                <div className="flex flex-col items-center gap-4 shrink-0">
                    <div className="h-28 w-28 rounded-full bg-secondary overflow-hidden ring-4 ring-current ring-opacity-5 shadow-lg">
                        {profile.avatar_url && <img src={profile.avatar_url} alt="Profile" className="h-full w-full object-cover" />}
                    </div>

                    <div className="text-center space-y-1">
                        <h1 className="text-2xl font-bold tracking-tight">{profile.full_name}</h1>
                        <p className="opacity-60 font-medium">@{profile.username}</p>
                    </div>
                </div>

                <div className="w-full flex-1 overflow-y-auto scrollbar-hide space-y-4 p-4">
                    {(profile.links || []).map((link: any, i: number) => {
                        const Icon = getIconForUrl(link.url)
                        return (
                            <a
                                key={i}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`${getButtonClass()} flex items-center justify-center relative group z-0 hover:z-50`}
                                onClick={(e) => {
                                    if (isPreview) {
                                        e.preventDefault()
                                    }
                                }}
                            >
                                {Icon && <Icon className="w-5 h-5 absolute left-4 opacity-75 group-hover:opacity-100 transition-opacity" />}
                                <span>{link.title}</span>
                            </a>
                        )
                    })}
                    {(!profile.links || profile.links.length === 0) && (
                        <p className="text-center opacity-50 text-sm py-4">This user hasn't added any links yet.</p>
                    )}
                </div>
            </div>
        </div>
    )
}
