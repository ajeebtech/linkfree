"use client";

import { Zap, Shield, BarChart3, Globe, Smartphone, Palette } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const features = [
    {
        name: "Lightning Fast",
        description: "Built on Next.js for optimal performance and SEO.",
        icon: Zap,
        className: "md:col-span-2",
    },
    {
        name: "Secure by Default",
        description: "Enterprise-grade security with Clerk authentication.",
        icon: Shield,
        className: "md:col-span-1",
    },
    {
        name: "Detailed Analytics",
        description: "Track views, clicks, and engagement in real-time.",
        icon: BarChart3,
        className: "md:col-span-1",
    },
    {
        name: "Custom Domains",
        description: "Connect your own domain for free. No premium required.",
        icon: Globe,
        className: "md:col-span-2",
    },
    {
        name: "Mobile First",
        description: "Responsive design that looks great on any device.",
        icon: Smartphone,
        className: "md:col-span-1",
    },
    {
        name: "Fully Customizable",
        description: "Change colors, fonts, and layouts to match your brand.",
        icon: Palette,
        className: "md:col-span-2",
    },
]

export function Features() {
    return (
        <section id="features" className="container space-y-12 py-12 md:py-24 lg:py-32">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
                <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl font-bold">
                    Features
                </h2>
                <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                    Everything you need to build your personal brand.
                    Without the subscription fatigue.
                </p>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-3">
                {features.map((feature, index) => (
                    <motion.div
                        key={feature.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className={cn(
                            "group relative overflow-hidden border border-border bg-white p-8 hover:border-black transition-colors duration-300",
                            feature.className
                        )}
                    >
                        <div className="flex h-full flex-col justify-between gap-6">
                            <div className="border border-black p-3 w-fit bg-transparent group-hover:bg-black group-hover:text-white transition-colors">
                                <feature.icon className="h-6 w-6" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-bold text-xl">{feature.name}</h3>
                                <p className="text-muted-foreground">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
