import Link from "next/link"

export function Footer() {
    return (
        <footer className="border-t border-border/40 py-6 md:py-0 bg-background/50 backdrop-blur-sm">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
                    <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                        Built by{" "}
                        <a
                            href="#"
                            target="_blank"
                            rel="noreferrer"
                            className="font-medium underline underline-offset-4 hover:text-foreground transition-colors"
                        >
                            Linkfree
                        </a>
                        . The source code is available on{" "}
                        <a
                            href="#"
                            target="_blank"
                            rel="noreferrer"
                            className="font-medium underline underline-offset-4 hover:text-foreground transition-colors"
                        >
                            GitHub
                        </a>
                        .
                    </p>
                </div>
            </div>
        </footer>
    )
}
