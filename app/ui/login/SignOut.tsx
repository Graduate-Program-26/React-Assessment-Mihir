import { signOut } from "@/auth"
import { LogOut } from "lucide-react"

export default function SignOut() {
    return (
        <form
            action={async () => {
                "use server"
                await signOut({ redirectTo: "/" })
            }}
        >
            <button
                type="submit"
                className="flex items-center gap-2 w-full px-0.5 py-1.5 text-sm rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
            >
                <LogOut className="w-4 h-4 shrink-0" />
                <span>Sign Out</span>
            </button>
        </form>
    )
}