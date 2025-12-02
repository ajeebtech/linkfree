import { OnboardingWizard } from "@/components/onboarding/onboarding-wizard"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { supabaseAdmin } from "@/lib/supabase-admin"

export default async function OnboardingPage() {
    const user = await currentUser()

    if (!user) {
        redirect("/")
    }

    // Check if user already has a profile
    const { data: profile } = await supabaseAdmin
        .from("profiles")
        .select("username")
        .eq("clerk_id", user.id)
        .single()

    if (profile) {
        redirect("/admin")
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-background">
            <OnboardingWizard />
        </div>
    )
}
