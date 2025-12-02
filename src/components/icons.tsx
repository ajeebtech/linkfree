import React from "react"

export const Icons = {
    Instagram: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" {...props}>
            <rect width="256" height="256" fill="none" />
            <circle cx="128" cy="128" r="40" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="16" />
            <rect x="32" y="32" width="192" height="192" rx="48" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
            <circle cx="180" cy="76" r="12" />
        </svg>
    ),
    TikTok: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" {...props}>
            <rect width="256" height="256" fill="none" />
            <path d="M168,102a95.55,95.55,0,0,0,56,18V80a56,56,0,0,1-56-56H128V156a28,28,0,1,1-40-25.31V88c-31.83,5.67-56,34.54-56,68a68,68,0,0,0,136,0Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
        </svg>
    ),
    Twitter: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" {...props}>
            <rect width="256" height="256" fill="none" />
            <polygon points="48 40 96 40 208 216 160 216 48 40" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
            <line x1="113.88" y1="143.53" x2="48" y2="216" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
            <line x1="208" y1="40" x2="142.12" y2="112.47" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
        </svg>
    ),
    YouTube: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" {...props}>
            <rect width="256" height="256" fill="none" />
            <path d="M234.33,69.52a24,24,0,0,0-14.49-16.4C185.56,44,128,44,128,44s-57.56,0-91.84,9.12A24,24,0,0,0,21.67,69.52C16,97.72,16,128,16,128s0,30.28,5.67,58.48a24,24,0,0,0,14.49,16.41C69,212,128,212,128,212s57.56,0,91.84-9.12a24,24,0,0,0,14.49-16.41C240,158.28,240,128,240,128S240,97.72,234.33,69.52Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
            <polygon points="112 160 160 128 112 96 112 160" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
        </svg>
    ),
    LinkedIn: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" {...props}>
            <rect width="256" height="256" fill="none" />
            <rect x="36" y="36" width="184" height="184" rx="8" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
            <line x1="120" y1="112" x2="120" y2="176" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
            <line x1="88" y1="112" x2="88" y2="176" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
            <path d="M120,140a28,28,0,0,1,56,0v36" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
            <circle cx="88" cy="80" r="12" />
        </svg>
    ),
    Facebook: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" {...props}>
            <rect width="256" height="256" fill="none" />
            <circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
            <path d="M168,88H152a23.9,23.9,0,0,0-24,24V224" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
            <line x1="96" y1="144" x2="160" y2="144" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
        </svg>
    ),
    Github: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" {...props}>
            <rect width="256" height="256" fill="none" />
            <path d="M208.31,75.68A79.52,79.52,0,0,0,102.93,52.74a8,8,0,0,1-11.25-3.56c-5.92-13.76-18.08-22.83-42.5-18.35a8,8,0,0,0-6,5.28c-2.27,6.56-1.67,16.5,3.37,27.16a8,8,0,0,1-2.92,10.12c-30.63,18.09-34.52,51.29-30.82,81.33,4.49,36.4,37.13,58.85,69.57,60.65,2.79.16,5.6.23,8.42.23,26.4,0,49.08-6.68,66.6-19.66a8,8,0,0,1,8.56-1.07c13.73,7.2,35.19,10.59,57.58,2.37a8,8,0,0,0,4.85-5.37c2.18-7.25,2-16.6-1.4-26.64a8,8,0,0,1,2.09-9.6C237.17,141.1,237.11,102.21,208.31,75.68Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
            <path d="M168,184c0-20-10-40-40-40s-40,20-40,40" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
        </svg>
    ),
    Twitch: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" {...props}>
            <rect width="256" height="256" fill="none" />
            <path d="M168,176h40V72H168Zm-56,0h40V72H112Z" opacity="0.2" />
            <path d="M88,200l-40,32V40H208V176l-40,24H128Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
            <line x1="168" y1="176" x2="168" y2="72" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
            <line x1="112" y1="176" x2="112" y2="72" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
        </svg>
    ),
    Discord: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" {...props}>
            <rect width="256" height="256" fill="none" />
            <path d="M197.4,61.6c-18.4-8.2-38.2-13.2-58.8-14.2a8,8,0,0,0-7.2,3.6c-4.6,8-9.4,18.6-11.4,23.4a159.6,159.6,0,0,0-53.6,0c-2.2-5-6.8-15.4-11.4-23.4a8,8,0,0,0-7.2-3.6c-20.6,1-40.4,6-58.8,14.2a8,8,0,0,0-3.6,11C-8.4,152,15.6,215.2,46.2,236.4a8,8,0,0,0,9.8-1.4,163.4,163.4,0,0,0,32.8-16.6,8,8,0,0,0-4.4-14.6,108.6,108.6,0,0,1-17-8.2,8,8,0,0,1,8.4-13.6c3.4,1.8,7,3.4,10.6,5a140.4,140.4,0,0,0,83.2,0c3.6-1.6,7.2-3.2,10.6-5a8,8,0,0,1,8.4,13.6,108.6,108.6,0,0,1-17,8.2,8,8,0,0,0-4.4,14.6,163.4,163.4,0,0,0,32.8,16.6,8,8,0,0,0,9.8,1.4c30.6-21.2,54.6-84.4,60.8-163.8A8,8,0,0,0,197.4,61.6ZM94,164a20,20,0,1,1,20-20A20,20,0,0,1,94,164Zm68,0a20,20,0,1,1,20-20A20,20,0,0,1,162,164Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
        </svg>
    )
}

export const getIconForUrl = (url: string) => {
    if (!url) return null
    const lowerUrl = url.toLowerCase()
    if (lowerUrl.includes("instagram.com")) return Icons.Instagram
    if (lowerUrl.includes("tiktok.com")) return Icons.TikTok
    if (lowerUrl.includes("twitter.com") || lowerUrl.includes("x.com")) return Icons.Twitter
    return null
}
