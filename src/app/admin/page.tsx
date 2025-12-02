import { getProfile } from "@/lib/actions"
import { DashboardClient } from "@/components/dashboard/dashboard-client"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
    const profile = await getProfile()

    if (!profile) {
        // If no profile, redirect to onboarding
        redirect("/onboarding")
    }

    return <DashboardClient profile={profile} />
}
