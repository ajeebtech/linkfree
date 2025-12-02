"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { usePathname } from "next/navigation"

export function Navbar() {
    const pathname = usePathname()

    // Hide navbar on profile pages (/[username])
    // We assume profile pages are anything that isn't a known route
    // Known routes: /, /onboarding, /admin, /sign-in, /sign-up

    const isProfilePage =
        pathname !== "/" &&
        !pathname.startsWith("/onboarding") &&
        !pathname.startsWith("/admin") &&
        !pathname.startsWith("/sign-in") &&
        !pathname.startsWith("/sign-up")

    if (isProfilePage) return null

    return (
        <header className="fixed top-0 left-0 z-50 w-full bg-[#f2f2f2]/90 backdrop-blur-sm">
            <div className="container flex h-16 items-center justify-between px-6 max-w-screen-2xl">
                <div className="flex items-center gap-12">
                    <Link className="flex items-center space-x-2" href="/">
                        <span className="font-bold text-lg tracking-widest uppercase font-mono">
                            LINKFREE
                        </span>
                    </Link>
                    <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-muted-foreground tracking-widest uppercase">
                        <SignedIn>
                            <Link href="/admin" className="hover:text-foreground transition-colors">
                                Admin
                            </Link>
                        </SignedIn>
                        <Link href="#" className="hover:text-foreground transition-colors">
                            Docs
                        </Link>
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    <SignedOut>
                        <SignInButton mode="modal">
                            <Button variant="ghost" size="sm" className="text-xs font-bold uppercase tracking-widest bg-black text-white hover:bg-black/80 rounded-none px-6 h-9">
                                Log in
                            </Button>
                        </SignInButton>
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </div>
        </header>
    )
}
