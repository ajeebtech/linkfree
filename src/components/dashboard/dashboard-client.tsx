"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Layout, Palette, Link as LinkIcon, Settings, ExternalLink, Save } from "lucide-react"
import Link from "next/link"

import { LinkEditor } from "./link-editor"
import { AppearanceEditor } from "./appearance-editor"
import { ProfilePreview } from "@/components/profile-preview"
import { updateProfile } from "@/lib/actions"

interface DashboardClientProps {
    profile: any
}

export function DashboardClient({ profile }: DashboardClientProps) {
    const [activeTab, setActiveTab] = useState("links")
    const [data, setData] = useState(profile)
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
    const [isSaving, setIsSaving] = useState(false)

    // Helper to update local state when child components save
    const handleUpdate = (updates: any) => {
        setData((prev: any) => ({ ...prev, ...updates }))
        setHasUnsavedChanges(true)
    }

    const handleSave = async () => {
        setIsSaving(true)
        try {
            await updateProfile({
                links: data.links,
                theme: data.theme,
                font: data.font,
            })
            setHasUnsavedChanges(false)
        } catch (error) {
            console.error(error)
        } finally {
            setIsSaving(false)
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
                <div className="flex-1 overflow-y-auto w-full">
                    {/* Header with Save Button */}
                    <div className="sticky top-0 z-20 bg-[#F3F3F1]/80 backdrop-blur-md px-8 py-4 flex justify-end border-b border-black/5">
                        <Button
                            onClick={handleSave}
                            disabled={!hasUnsavedChanges || isSaving}
                            className="rounded-full gap-2 transition-all"
                            size="lg"
                        >
                            {isSaving ? "Saving..." : <><Save className="w-4 h-4" /> Save Changes</>}
                        </Button>
                    </div>

                    <div className="p-8 max-w-3xl mx-auto">
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
                </div>

                {/* Preview Panel */}
                <div className="w-[450px] border-l bg-white p-8 hidden xl:flex items-center justify-center relative shadow-sm z-10">
                    <div className="absolute top-6 right-6 flex items-center gap-2 bg-white px-4 py-2 rounded-full border shadow-sm text-sm font-medium text-muted-foreground">
                        <span>linktr.ee/{data.username}</span>
                        <ExternalLink className="w-3 h-3" />
                    </div>

                    {/* Phone Mockup */}
                    <div className="w-[340px] h-[680px] bg-black rounded-[3.5rem] p-3 shadow-2xl border-[8px] border-black relative z-10 ring-4 ring-gray-200 overflow-hidden">
                        {/* Phone Status Bar */}
                        <div className="absolute top-0 left-0 right-0 h-6 z-20 flex justify-between px-6 items-center text-[10px] font-medium text-white opacity-50 mt-3 mix-blend-difference">
                            <span>9:41</span>
                            <div className="flex gap-1">
                                <div className="w-3 h-3 bg-current rounded-full" />
                                <div className="w-3 h-3 bg-current rounded-full" />
                            </div>
                        </div>

                        {/* Preview Content */}
                        <div className="h-full w-full bg-white rounded-[2.5rem] overflow-hidden relative">
                            <div className="absolute inset-0 overflow-y-auto scrollbar-hide origin-top scale-[0.65] w-[153.8%] h-[153.8%] -ml-[26.9%] -mt-[26.9%]">
                                <ProfilePreview profile={data} isPreview={true} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

