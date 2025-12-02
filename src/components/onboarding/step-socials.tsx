"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Instagram, Twitter, Link as LinkIcon } from "lucide-react"
import { OnboardingData } from "./onboarding-wizard"

interface StepSocialsProps {
    data: OnboardingData
    onChange: (socials: OnboardingData["socials"]) => void
    onBack: () => void
    onComplete: () => void
}

export function StepSocials({ data, onChange, onBack, onComplete }: StepSocialsProps) {
    const handleChange = (key: keyof OnboardingData["socials"], value: string) => {
        onChange({ ...data.socials, [key]: value })
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
        >
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Connect your socials</h1>
                <p className="text-muted-foreground">Add your links so people can find you.</p>
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                        <Instagram className="w-4 h-4" /> Instagram
                    </label>
                    <Input
                        placeholder="@username"
                        value={data.socials.instagram}
                        onChange={(e) => handleChange("instagram", e.target.value)}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-4 h-4"
                        >
                            <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                        </svg>
                        TikTok
                    </label>
                    <Input
                        placeholder="@username"
                        value={data.socials.tiktok}
                        onChange={(e) => handleChange("tiktok", e.target.value)}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                        <Twitter className="w-4 h-4" /> Twitter / X
                    </label>
                    <Input
                        placeholder="@username"
                        value={data.socials.twitter}
                        onChange={(e) => handleChange("twitter", e.target.value)}
                    />
                </div>
            </div>

            <div className="flex justify-between pt-4">
                <Button variant="ghost" onClick={onBack}>
                    Back
                </Button>
                <Button
                    size="lg"
                    onClick={onComplete}
                    className="rounded-full px-8 bg-black hover:bg-black/80 text-white"
                >
                    Complete Setup
                </Button>
            </div>
        </motion.div>
    )
}
