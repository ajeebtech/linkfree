"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Check, X, Loader2 } from "lucide-react"
import { checkUsernameAvailability } from "@/lib/actions"

interface StepUsernameProps {
    value: string
    onChange: (username: string) => void
    onNext: () => void
    onBack: () => void
}

export function StepUsername({ value, onChange, onNext, onBack }: StepUsernameProps) {
    const [status, setStatus] = useState<"idle" | "checking" | "available" | "taken">("idle")

    useEffect(() => {
        if (!value) {
            setStatus("idle")
            return
        }

        const checkAvailability = async () => {
            setStatus("checking")

            try {
                const isAvailable = await checkUsernameAvailability(value)
                if (isAvailable) {
                    setStatus("available")
                } else {
                    setStatus("taken")
                }
            } catch (error) {
                console.error(error)
                setStatus("idle")
            }
        }

        const debounce = setTimeout(checkAvailability, 500)
        return () => clearTimeout(debounce)
    }, [value])

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
        >
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Claim your username</h1>
                <p className="text-muted-foreground">This will be your unique link on Linkfree.</p>
            </div>

            <div className="space-y-4">
                <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-mono">
                        linkfree.com/
                    </div>
                    <Input
                        value={value}
                        onChange={(e) => onChange(e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, ""))}
                        className="pl-32 h-16 text-lg font-mono"
                        placeholder="username"
                        autoFocus
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        {status === "checking" && <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />}
                        {status === "available" && <Check className="w-5 h-5 text-green-500" />}
                        {status === "taken" && <X className="w-5 h-5 text-red-500" />}
                    </div>
                </div>

                {status === "available" && (
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-green-600 font-medium"
                    >
                        Nice! {value} is available.
                    </motion.p>
                )}

                {status === "taken" && (
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-red-600 font-medium"
                    >
                        Sorry, {value} is already taken.
                    </motion.p>
                )}
            </div>

            <div className="flex justify-between pt-4">
                <Button variant="ghost" onClick={onBack}>
                    Back
                </Button>
                <Button
                    size="lg"
                    onClick={onNext}
                    disabled={status !== "available"}
                    className="rounded-full px-8"
                >
                    Continue
                </Button>
            </div>
        </motion.div>
    )
}
