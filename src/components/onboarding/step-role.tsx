"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Monitor, Palette, Briefcase, User } from "lucide-react"

interface StepRoleProps {
    value: string
    onChange: (role: string) => void
    onNext: () => void
}

const roles = [
    { id: "creator", label: "Creator", icon: Palette, description: "I make content across platforms" },
    { id: "streamer", label: "Streamer", icon: Monitor, description: "I broadcast live to my audience" },
    { id: "brand", label: "Brand", icon: Briefcase, description: "I represent a company or product" },
    { id: "personal", label: "Personal", icon: User, description: "I just want a cool link in bio" },
]

export function StepRole({ value, onChange, onNext }: StepRoleProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
        >
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">How do you identify?</h1>
                <p className="text-muted-foreground">This helps us customize your experience.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {roles.map((role) => {
                    const Icon = role.icon
                    const isSelected = value === role.id
                    return (
                        <div
                            key={role.id}
                            onClick={() => onChange(role.id)}
                            className={`
                cursor-pointer relative p-6 rounded-xl border-2 transition-all duration-200
                ${isSelected
                                    ? "border-black bg-secondary/50"
                                    : "border-transparent bg-secondary hover:bg-secondary/80"
                                }
              `}
                        >
                            <div className="flex items-start gap-4">
                                <div className={`p-3 rounded-lg ${isSelected ? "bg-black text-white" : "bg-white text-black"}`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">{role.label}</h3>
                                    <p className="text-sm text-muted-foreground mt-1">{role.description}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="flex justify-end pt-4">
                <Button
                    size="lg"
                    onClick={onNext}
                    disabled={!value}
                    className="rounded-full px-8"
                >
                    Continue
                </Button>
            </div>
        </motion.div>
    )
}
