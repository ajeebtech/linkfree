"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Layout, Palette, Link as LinkIcon, Settings, ExternalLink } from "lucide-react"
import Link from "next/link"

import { LinkEditor } from "./link-editor"
import { AppearanceEditor } from "./appearance-editor"

interface DashboardClientProps {
    profile: any
}

export function DashboardClient({ profile }: DashboardClientProps) {
    const [activeTab, setActiveTab] = useState("links")
    const [data, setData] = useState(profile)

    // Helper to update local state when child components save
    const handleUpdate = (updates: any) => {
        setData((prev: any) => ({ ...prev, ...updates }))
    }

    // Theme styles for preview
    const getThemeStyles = () => {
        const mode = data.theme?.mode || "light"
        const palette = data.theme?.palette || "monochrome"
        const font = data.font || "inter"

        const baseClasses = `h-full w-full rounded-[2.2rem] overflow-hidden relative flex flex-col ${mode === "dark" ? "bg-zinc-950 text-white" : "bg-white text-zinc-950"
            }`

        const fontClass = {
            inter: "font-sans",
            serif: "font-serif",
            mono: "font-mono",
        }[font as string] || "font-sans"

        return { baseClasses, fontClass, palette }
    }

    const { baseClasses, fontClass, palette } = getThemeStyles()

    const getButtonClass = () => {
        const base = "w-full p-3 rounded-lg text-center text-sm font-medium transition-transform active:scale-95"

        if (data.theme?.mode === "dark") {
            switch (palette) {
                case "blue": return `${base} bg-blue-600 text-white`
                case "green": return `${base} bg-emerald-600 text-white`
                case "purple": return `${base} bg-violet-600 text-white`
                default: return `${base} bg-white text-black`
            }
        } else {
            switch (palette) {
                case "blue": return `${base} bg-blue-600 text-white`
                case "green": return `${base} bg-emerald-600 text-white`
                case "purple": return `${base} bg-violet-600 text-white`
                default: return `${base} bg-black text-white`
            }
        }
    }

    return (
        <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-[#F3F3F1]">
            {/* Sidebar / Tabs */}
            <div className="w-[280px] border-r bg-white flex flex-col shadow-sm z-10">
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="h-10 w-10 rounded-full bg-secondary overflow-hidden ring-2 ring-offset-2 ring-gray-100">
                            {data.avatar_url && <img src={data.avatar_url} alt="Profile" className="h-full w-full object-cover" />}
                        </div>
                        <div className="overflow-hidden">
                            <p className="font-bold text-sm truncate">{data.full_name}</p>
                            <p className="text-xs text-muted-foreground truncate">linktr.ee/{data.username}</p>
                        </div>
                    </div>

                    <nav className="space-y-1">
                        <Button
                            variant="ghost"
                            className={`w-full justify-start gap-3 h-12 rounded-lg font-medium ${activeTab === "links" ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                            onClick={() => setActiveTab("links")}
                        >
                            <LinkIcon className="w-5 h-5" /> Links
                        </Button>
                        <Button
                            variant="ghost"
                            className={`w-full justify-start gap-3 h-12 rounded-lg font-medium ${activeTab === "appearance" ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                            onClick={() => setActiveTab("appearance")}
                        >
                            <Palette className="w-5 h-5" /> Appearance
                        </Button>
                        <Button
                            variant="ghost"
                            className={`w-full justify-start gap-3 h-12 rounded-lg font-medium ${activeTab === "settings" ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                            onClick={() => setActiveTab("settings")}
                        >
                            <Settings className="w-5 h-5" /> Settings
                        </Button>
                    </nav>
                </div>

                <div className="mt-auto p-6 border-t">
                    <Button variant="outline" className="w-full gap-2 rounded-full h-10 font-medium" asChild>
                        <Link href={`/${data.username}`} target="_blank">
                            View Page <ExternalLink className="w-3 h-3" />
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex overflow-hidden">
                {/* Editor Panel */}
                <div className="flex-1 overflow-y-auto p-8 max-w-3xl mx-auto w-full">
                    {activeTab === "links" && (
                        <LinkEditor
                            initialLinks={data.links}
                            onUpdate={(links) => handleUpdate({ links })}
                        />
                    )}

                    {activeTab === "appearance" && (
                        <AppearanceEditor
                            initialTheme={data.theme}
                            initialFont={data.font}
                            onUpdate={(theme, font) => handleUpdate({ theme, font })}
                        />
                    )}
                </div>

                {/* Preview Panel */}
                <div className="w-[450px] border-l bg-white p-8 hidden xl:flex items-center justify-center relative shadow-sm z-10">
                    <div className="absolute top-6 right-6 flex items-center gap-2 bg-white px-4 py-2 rounded-full border shadow-sm text-sm font-medium text-muted-foreground">
                        <span>linktr.ee/{data.username}</span>
                        <ExternalLink className="w-3 h-3" />
                    </div>

                    {/* Phone Mockup */}
                    <div className="w-[320px] h-[640px] bg-black rounded-[3.5rem] p-3 shadow-2xl border-[8px] border-black relative z-10 ring-4 ring-gray-200">
                        <div className={`${baseClasses} ${fontClass}`}>
                            {/* Phone Status Bar */}
                            <div className="absolute top-0 left-0 right-0 h-6 z-20 flex justify-between px-6 items-center text-[10px] font-medium opacity-50 mt-2">
                                <span>9:41</span>
                                <div className="flex gap-1">
                                    <div className="w-3 h-3 bg-current rounded-full opacity-20" />
                                    <div className="w-3 h-3 bg-current rounded-full opacity-20" />
                                </div>
                            </div>

                            {/* Preview Content */}
                            <div className="h-full overflow-y-auto pt-14 px-4 pb-8 scrollbar-hide">
                                <div className="flex flex-col items-center gap-4">
                                    <div className="h-24 w-24 rounded-full bg-secondary overflow-hidden ring-4 ring-current ring-opacity-5">
                                        {data.avatar_url && <img src={data.avatar_url} alt="Profile" className="h-full w-full object-cover" />}
                                    </div>
                                    <div className="text-center space-y-1">
                                        <h2 className="font-bold text-xl">{data.full_name}</h2>
                                        <p className="text-sm opacity-60">@{data.username}</p>
                                    </div>

                                    {/* Links Preview */}
                                    <div className="w-full space-y-3 mt-6">
                                        {(data.links || []).map((link: any, i: number) => (
                                            <a key={i} href="#" className={getButtonClass()}>
                                                {link.title}
                                            </a>
                                        ))}
                                        {(!data.links || data.links.length === 0) && (
                                            <div className="w-full p-4 rounded-lg border-2 border-dashed border-current border-opacity-20 text-center text-xs opacity-50">
                                                Add links to see them here
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

