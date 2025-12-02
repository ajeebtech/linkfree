"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Trash2, GripVertical, X, ChevronDown } from "lucide-react"
import { Icons, getIconForUrl } from "@/components/icons"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"

interface Link {
    title: string
    url: string
}

interface LinkEditorProps {
    initialLinks: Link[]
    onUpdate: (links: Link[]) => void
}

const PLATFORMS = [
    { id: "instagram", name: "Instagram", icon: Icons.Instagram, prefix: "https://instagram.com/" },
    { id: "tiktok", name: "TikTok", icon: Icons.TikTok, prefix: "https://tiktok.com/@" },
    { id: "twitter", name: "Twitter", icon: Icons.Twitter, prefix: "https://x.com/" },
    { id: "custom", name: "Custom Link", icon: null, prefix: "https://" },
]

export function LinkEditor({ initialLinks, onUpdate }: LinkEditorProps) {
    const [links, setLinks] = useState<Link[]>(initialLinks || [])
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [selectedPlatform, setSelectedPlatform] = useState(PLATFORMS[0])
    const [newLinkUrl, setNewLinkUrl] = useState("")
    const [isSelectOpen, setIsSelectOpen] = useState(false)

    const availablePlatforms = PLATFORMS.filter(platform => {
        if (platform.id === "custom") return true
        return !links.some(link => link.url.startsWith(platform.prefix))
    })

    const handleAddClick = () => {
        setSelectedPlatform(availablePlatforms[0])
        setNewLinkUrl(availablePlatforms[0].prefix)
        setIsDrawerOpen(true)
    }

    const confirmAddLink = () => {
        if (!newLinkUrl) return

        const title = selectedPlatform.id === "custom" ? "New Link" : selectedPlatform.name
        const newLinks = [...links, { title, url: newLinkUrl }]
        setLinks(newLinks)
        onUpdate(newLinks)
        setIsDrawerOpen(false)
    }

    const removeLink = (index: number) => {
        const newLinks = links.filter((_, i) => i !== index)
        setLinks(newLinks)
        onUpdate(newLinks)
    }

    const updateLink = (index: number, field: keyof Link, value: string) => {
        const newLinks = [...links]
        newLinks[index] = { ...newLinks[index], [field]: value }
        setLinks(newLinks)
        onUpdate(newLinks)
    }

    return (
        <div className="space-y-6 relative">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Links</h2>
            </div>

            <div className="space-y-6">
                <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                    <DrawerTrigger asChild>
                        <Button
                            className="w-full py-6 rounded-full bg-[#8129D9] hover:bg-[#6f21bc] text-white font-bold text-base shadow-sm transition-all hover:scale-[1.01] active:scale-[0.99]"
                            onClick={handleAddClick}
                        >
                            <Plus className="w-5 h-5 mr-2" /> Add link
                        </Button>
                    </DrawerTrigger>
                    <DrawerContent>
                        <div className="mx-auto w-full max-w-sm">
                            <DrawerHeader>
                                <DrawerTitle>Add New Link</DrawerTitle>
                                <DrawerDescription>Choose a platform and add your URL.</DrawerDescription>
                            </DrawerHeader>
                            <div className="p-4 space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted-foreground">Platform</label>
                                    <div className="relative">
                                        <button
                                            onClick={() => setIsSelectOpen(!isSelectOpen)}
                                            className="w-full flex items-center justify-between p-4 bg-secondary/30 rounded-xl border-2 border-transparent hover:border-primary/20 transition-all text-left"
                                        >
                                            <div className="flex items-center gap-3">
                                                {selectedPlatform.icon && <selectedPlatform.icon className="w-5 h-5" />}
                                                <span className="font-medium">{selectedPlatform.name}</span>
                                            </div>
                                            <ChevronDown className={`w-5 h-5 transition-transform ${isSelectOpen ? "rotate-180" : ""}`} />
                                        </button>

                                        {isSelectOpen && (
                                            <div className="absolute bottom-full mb-2 left-0 right-0 bg-white rounded-xl shadow-xl border overflow-hidden z-10 animate-in fade-in slide-in-from-bottom-2">
                                                {availablePlatforms.map((platform) => (
                                                    <button
                                                        key={platform.id}
                                                        onClick={() => {
                                                            setSelectedPlatform(platform)
                                                            setNewLinkUrl(platform.prefix)
                                                            setIsSelectOpen(false)
                                                        }}
                                                        className="w-full flex items-center gap-3 p-4 hover:bg-secondary/50 transition-colors text-left"
                                                    >
                                                        {platform.icon ? <platform.icon className="w-5 h-5" /> : <div className="w-5 h-5" />}
                                                        <span className="font-medium">{platform.name}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted-foreground">URL</label>
                                    <Input
                                        value={newLinkUrl}
                                        onChange={(e) => setNewLinkUrl(e.target.value)}
                                        className="h-14 rounded-xl bg-secondary/30 border-transparent focus:border-primary"
                                        placeholder="https://..."
                                        autoFocus
                                    />
                                </div>
                            </div>
                            <DrawerFooter>
                                <Button
                                    onClick={confirmAddLink}
                                    className="w-full h-14 rounded-full text-lg font-bold bg-[#8129D9] hover:bg-[#6f21bc]"
                                >
                                    Add Link
                                </Button>
                                <DrawerClose asChild>
                                    <Button variant="outline" className="w-full rounded-full">Cancel</Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </div>
                    </DrawerContent>
                </Drawer>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {links.map((link, index) => {
                        const Icon = getIconForUrl(link.url)
                        return (
                            <div key={index} className="flex flex-col gap-4 p-6 bg-white border rounded-3xl shadow-sm group transition-all hover:shadow-md">
                                <div className="flex items-start gap-4">
                                    <div className="mt-2 text-muted-foreground cursor-grab active:cursor-grabbing hover:text-foreground">
                                        <GripVertical className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1 space-y-4">
                                        <div className="flex items-center gap-2">
                                            <Input
                                                className="font-semibold text-lg border-none shadow-none p-0 h-auto focus-visible:ring-0 placeholder:text-muted-foreground/50"
                                                placeholder="Title"
                                                value={link.title}
                                                onChange={(e) => updateLink(index, "title", e.target.value)}
                                            />
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-muted-foreground hover:text-destructive ml-auto"
                                                onClick={() => removeLink(index)}
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </Button>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            {Icon ? (
                                                <div className="shrink-0 text-muted-foreground">
                                                    <Icon className="w-5 h-5" />
                                                </div>
                                            ) : (
                                                <div className="w-5 h-5 shrink-0" />
                                            )}
                                            <Input
                                                className="text-sm text-muted-foreground border-none shadow-none p-0 h-auto focus-visible:ring-0 placeholder:text-muted-foreground/50"
                                                placeholder="URL"
                                                value={link.url}
                                                onChange={(e) => updateLink(index, "url", e.target.value)}
                                            />
                                        </div>
                                        <div className="flex gap-4 pt-2">
                                            <Button variant="ghost" size="sm" className="h-8 px-2 text-muted-foreground">
                                                <span className="sr-only">Thumbnail</span>
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" /></svg>
                                            </Button>
                                            <Button variant="ghost" size="sm" className="h-8 px-2 text-muted-foreground">
                                                <span className="sr-only">Star</span>
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                                            </Button>
                                            <Button variant="ghost" size="sm" className="h-8 px-2 text-muted-foreground">
                                                <span className="sr-only">Schedule</span>
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /></svg>
                                            </Button>
                                            <Button variant="ghost" size="sm" className="h-8 px-2 text-muted-foreground">
                                                <span className="sr-only">Lock</span>
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                                            </Button>
                                            <Button variant="ghost" size="sm" className="h-8 px-2 text-muted-foreground ml-auto">
                                                <span className="text-xs">0 clicks</span>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                    {links.length === 0 && (
                        <div className="col-span-full text-center py-12 border-2 border-dashed rounded-3xl text-muted-foreground bg-white/50">
                            <p>No links yet. Add one to get started!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
