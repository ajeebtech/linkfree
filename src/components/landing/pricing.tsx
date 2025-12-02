"use client";

import { Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SignInButton } from "@clerk/nextjs"
import { motion } from "framer-motion"

export function Pricing() {
    return (
        <section id="pricing" className="container py-12 md:py-24 lg:py-32">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
                <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl font-bold">
                    Simple, transparent pricing
                </h2>
                <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                    It's free. Forever.
                </p>
            </div>
            <div className="mx-auto grid max-w-screen-lg gap-8 py-12 md:grid-cols-2 lg:gap-12">
                {/* Linktree Free */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="flex flex-col overflow-hidden border border-border bg-white/50 opacity-75 grayscale transition-all hover:grayscale-0 hover:opacity-100 hover:bg-white hover:border-black"
                >
                    <div className="p-8 border-b border-border">
                        <h3 className="text-xl font-bold font-mono uppercase tracking-widest text-muted-foreground">Linktree Free</h3>
                        <div className="mt-4 flex items-baseline text-4xl font-bold text-foreground">
                            $0
                            <span className="ml-1 text-xl font-normal text-muted-foreground font-mono">
                                /mo
                            </span>
                        </div>
                        <p className="mt-4 text-sm text-muted-foreground font-mono">
                            Basic features with branding.
                        </p>
                    </div>
                    <div className="flex flex-1 flex-col justify-between p-8">
                        <ul className="space-y-4 font-mono text-sm">
                            <li className="flex items-center text-muted-foreground">
                                <Check className="mr-2 h-4 w-4" /> Unlimited links
                            </li>
                            <li className="flex items-center text-muted-foreground">
                                <X className="mr-2 h-4 w-4 text-muted-foreground" /> Custom background
                            </li>
                            <li className="flex items-center text-muted-foreground">
                                <X className="mr-2 h-4 w-4 text-muted-foreground" /> Analytics
                            </li>
                            <li className="flex items-center text-muted-foreground">
                                <X className="mr-2 h-4 w-4 text-muted-foreground" /> Remove branding
                            </li>
                        </ul>
                    </div>
                </motion.div>

                {/* Linkfree */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="relative flex flex-col overflow-hidden border border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                >
                    <div className="absolute top-0 right-0 bg-black px-3 py-1 text-xs font-bold text-white font-mono uppercase tracking-widest">
                        RECOMMENDED
                    </div>
                    <div className="p-8 border-b border-black">
                        <h3 className="text-xl font-bold font-mono uppercase tracking-widest text-foreground">Linkfree</h3>
                        <div className="mt-4 flex items-baseline text-4xl font-bold text-foreground">
                            $0
                            <span className="ml-1 text-xl font-normal text-muted-foreground font-mono">
                                /mo
                            </span>
                        </div>
                        <p className="mt-4 text-sm text-muted-foreground font-mono">
                            Everything included.
                        </p>
                    </div>
                    <div className="flex flex-1 flex-col justify-between p-8">
                        <ul className="space-y-4 font-mono text-sm">
                            <li className="flex items-center text-foreground">
                                <Check className="mr-2 h-4 w-4 text-black" /> Unlimited links
                            </li>
                            <li className="flex items-center text-foreground">
                                <Check className="mr-2 h-4 w-4 text-black" /> Custom background
                            </li>
                            <li className="flex items-center text-foreground">
                                <Check className="mr-2 h-4 w-4 text-black" /> Advanced Analytics
                            </li>
                            <li className="flex items-center text-foreground">
                                <Check className="mr-2 h-4 w-4 text-black" /> No branding
                            </li>
                        </ul>
                        <div className="mt-8">
                            <SignInButton mode="modal">
                                <Button className="w-full h-12 rounded-none text-base bg-black hover:bg-black/80 text-white font-mono uppercase tracking-widest" size="lg">Get Started</Button>
                            </SignInButton>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
