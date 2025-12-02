"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Trash2, GripVertical, Save } from "lucide-react"
import { updateProfile } from "@/lib/actions"

interface Link {
    title: string
    url: string
}

interface LinkEditorProps {
    initialLinks: Link[]
    onUpdate: (links: Link[]) => void
}

export function LinkEditor({ initialLinks, onUpdate }: LinkEditorProps) {
    const [links, setLinks] = useState<Link[]>(initialLinks || [])
    const [isSaving, setIsSaving] = useState(false)

    const addLink = () => {
        setLinks([...links, { title: "", url: "" }])
    }

    const removeLink = (index: number) => {
        const newLinks = links.filter((_, i) => i !== index)
        setLinks(newLinks)
    }

    const updateLink = (index: number, field: keyof Link, value: string) => {
        const newLinks = [...links]
        newLinks[index] = { ...newLinks[index], [field]: value }
        setLinks(newLinks)
    }

    const handleSave = async () => {
        setIsSaving(true)
        try {
            await updateProfile({ links })
            onUpdate(links)
            // Optional: Show success toast
        } catch (error) {
            console.error(error)
            // Optional: Show error toast
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Links</h2>
                <Button onClick={handleSave} disabled={isSaving} variant="outline" className="gap-2 rounded-full">
                    {isSaving ? "Saving..." : <><Save className="w-4 h-4" /> Save Changes</>}
                </Button>
            </div>

            <div className="space-y-6">
                <Button
                    className="w-full py-6 rounded-full bg-[#8129D9] hover:bg-[#6f21bc] text-white font-bold text-base shadow-sm transition-all hover:scale-[1.01] active:scale-[0.99]"
                    onClick={addLink}
                >
                    <Plus className="w-5 h-5 mr-2" /> Add link
                </Button>

                <div className="space-y-4">
                    {links.map((link, index) => (
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
                                    <Input
                                        className="text-sm text-muted-foreground border-none shadow-none p-0 h-auto focus-visible:ring-0 placeholder:text-muted-foreground/50"
                                        placeholder="URL"
                                        value={link.url}
                                        onChange={(e) => updateLink(index, "url", e.target.value)}
                                    />
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
                    ))}

                    {links.length === 0 && (
                        <div className="text-center py-12 border-2 border-dashed rounded-3xl text-muted-foreground bg-white/50">
                            <p>No links yet. Add one to get started!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
