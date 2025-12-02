"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface Theme {
    mode: "light" | "dark"
    palette: "monochrome" | "blue" | "green" | "purple"
}

interface AppearanceEditorProps {
    initialTheme: Theme
    initialFont: string
    onUpdate: (theme: Theme, font: string) => void
}

export function AppearanceEditor({ initialTheme, initialFont, onUpdate }: AppearanceEditorProps) {
    const [theme, setTheme] = useState<Theme>(initialTheme || { mode: "light", palette: "monochrome" })
    const [font, setFont] = useState(initialFont || "inter")

    const handleThemeChange = (newTheme: Theme) => {
        setTheme(newTheme)
        onUpdate(newTheme, font)
    }

    const handleFontChange = (newFont: string) => {
        setFont(newFont)
        onUpdate(theme, newFont)
    }

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Customize Appearance</h2>
            </div>

            <div className="space-y-4">
                <Label className="text-base">Color Palette</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { id: "monochrome", bg: "bg-zinc-950", name: "Mono" },
                        { id: "blue", bg: "bg-blue-600", name: "Blue" },
                        { id: "green", bg: "bg-emerald-600", name: "Green" },
                        { id: "purple", bg: "bg-violet-600", name: "Purple" },
                    ].map((palette) => (
                        <div
                            key={palette.id}
                            className={`
                        cursor-pointer rounded-lg border-2 p-4 flex flex-col items-center gap-2 transition-all
                        ${theme.palette === palette.id ? "border-primary bg-secondary/50" : "border-transparent bg-secondary/20 hover:bg-secondary/40"}
                    `}
                            onClick={() => handleThemeChange({ ...theme, palette: palette.id as any })}
                        >
                            <div className={`h-8 w-8 rounded-full ${palette.bg}`} />
                            <span className="text-sm font-medium">{palette.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                <Label className="text-base">Background Mode</Label>
                <RadioGroup
                    value={theme.mode}
                    onValueChange={(val) => handleThemeChange({ ...theme, mode: val as any })}
                    className="grid grid-cols-2 gap-4"
                >
                    <div>
                        <RadioGroupItem value="light" id="light" className="peer sr-only" />
                        <Label
                            htmlFor="light"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-50 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                        >
                            <div className="mb-2 h-12 w-full rounded bg-gray-100" />
                            Light
                        </Label>
                    </div>
                    <div>
                        <RadioGroupItem value="dark" id="dark" className="peer sr-only" />
                        <Label
                            htmlFor="dark"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-zinc-950 p-4 hover:bg-zinc-900 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer text-white"
                        >
                            <div className="mb-2 h-12 w-full rounded bg-zinc-800" />
                            Dark
                        </Label>
                    </div>
                </RadioGroup>
            </div>

            <div className="space-y-4">
                <Label className="text-base">Font Style</Label>
                <div className="grid grid-cols-3 gap-4">
                    {[
                        { id: "inter", name: "Modern", font: "font-sans" },
                        { id: "serif", name: "Elegant", font: "font-serif" },
                        { id: "mono", name: "Technical", font: "font-mono" },
                    ].map((f) => (
                        <div
                            key={f.id}
                            className={`
                        cursor-pointer rounded-lg border-2 p-4 text-center transition-all
                        ${font === f.id ? "border-primary bg-secondary/50" : "border-transparent bg-secondary/20 hover:bg-secondary/40"}
                    `}
                            onClick={() => handleFontChange(f.id)}
                        >
                            <span className={`text-lg ${f.font}`}>Aa</span>
                            <p className="text-xs mt-1 text-muted-foreground">{f.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
