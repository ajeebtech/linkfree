"use client";

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SignInButton } from "@clerk/nextjs"
import { motion } from "framer-motion"
import { ArrowRight, Copy } from "lucide-react"

export function Hero() {
    return (
        <section className="relative overflow-hidden pt-24 md:pt-32 pb-20">
            <div className="container relative z-10 flex flex-col md:flex-row items-start justify-between gap-8 px-6 max-w-screen-2xl">
                <div className="flex flex-col items-start gap-6 max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center gap-2"
                    >
                        <div className="h-2 w-2 rounded-full bg-[#ff4d00]" />
                        <span className="font-mono text-xs font-bold tracking-widest uppercase text-muted-foreground">
                            FREE FOREVER
                        </span>
                    </motion.div>

                    <motion.h1
                        className="text-5xl font-medium tracking-tight sm:text-6xl md:text-7xl leading-[0.9]"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        Linktree Premium.<br />
                        but free.
                    </motion.h1>

                    <motion.div
                        className="space-y-6 max-w-xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <p className="font-mono text-sm md:text-base text-muted-foreground leading-relaxed">
                            Stop paying for basic features. Get advanced analytics, deep audience insights,
                            and complete design freedom without the monthly subscription.
                            <br /><br />
                            The open-source alternative for creators who demand more.
                        </p>

                        <div className="flex flex-col gap-2 w-full max-w-md">
                            <SignInButton mode="modal">
                                <Button className="w-full h-12 rounded-none text-base bg-black hover:bg-black/80 text-white font-mono uppercase tracking-widest" size="lg">
                                    Get Started for Free
                                </Button>
                            </SignInButton>
                        </div>
                    </motion.div>
                </div>

                {/* Right side abstract visual */}
                <motion.div
                    className="relative w-full max-w-xl aspect-square hidden md:block"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="w-64 h-64 border border-muted-foreground/20 rotate-45 flex items-center justify-center backdrop-blur-sm bg-white/50">
                            <div className="w-32 h-32 border border-black rotate-45 flex items-center justify-center">
                                <div className="w-16 h-16 bg-black rotate-45" />
                            </div>
                        </div>
                    </div>
                    {/* Floating code blocks */}
                    <div className="absolute top-10 right-0 bg-white border border-muted p-4 rounded shadow-sm font-mono text-[10px] text-muted-foreground">
                        run_droid_fix() {'{'}
                        <br />
                        &nbsp;&nbsp;echo "Processing..."
                        <br />
                        {'}'}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
