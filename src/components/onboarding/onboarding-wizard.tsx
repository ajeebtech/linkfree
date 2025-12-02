"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { StepRole } from "./step-role"
import { StepUsername } from "./step-username"
import { StepSocials } from "./step-socials"
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { createProfile } from "@/lib/actions"

export type OnboardingData = {
    role: string
    username: string
    socials: {
        instagram: string
        tiktok: string
        twitter: string
    }
}

export function OnboardingWizard() {
    const [step, setStep] = useState(1)
    const [data, setData] = useState<OnboardingData>({
        role: "",
        username: "",
        socials: {
            instagram: "",
            tiktok: "",
            twitter: "",
        },
    })
    const { user } = useUser()
    const router = useRouter()

    const updateData = (newData: Partial<OnboardingData>) => {
        setData((prev) => ({ ...prev, ...newData }))
    }

    const nextStep = () => setStep((prev) => prev + 1)
    const prevStep = () => setStep((prev) => prev - 1)

    return (
        <div className="max-w-2xl mx-auto w-full">
            <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-mono text-muted-foreground">
                        STEP {step < 4 ? `0${step}` : "03"} / 03
                    </span>
                    <span className="text-sm font-mono text-muted-foreground">
                        {step === 1 && "IDENTITY"}
                        {step === 2 && "CLAIM"}
                        {step === 3 && "CONNECT"}
                    </span>
                </div>
                <div className="h-1 w-full bg-secondary rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-black"
                        initial={{ width: "0%" }}
                        animate={{ width: `${(step / 3) * 100}%` }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    />
                </div>
            </div>

            <AnimatePresence mode="wait">
                {step === 1 && (
                    <StepRole
                        key="step1"
                        value={data.role}
                        onChange={(role) => updateData({ role })}
                        onNext={nextStep}
                    />
                )}
                {step === 2 && (
                    <StepUsername
                        key="step2"
                        value={data.username}
                        onChange={(username) => updateData({ username })}
                        onNext={nextStep}
                        onBack={prevStep}
                    />
                )}
                {step === 3 && (
                    <StepSocials
                        key="step3"
                        data={data}
                        onChange={(socials) => updateData({ socials })}
                        onBack={prevStep}
                        onComplete={async () => {
                            try {
                                const result = await createProfile(data)
                                if (result.error) {
                                    alert(result.error) // Simple error handling for now
                                    return
                                }
                                router.push("/admin")
                            } catch (error) {
                                console.error(error)
                                alert("Something went wrong")
                            }
                        }}
                    />
                )}
            </AnimatePresence>
        </div>
    )
}

