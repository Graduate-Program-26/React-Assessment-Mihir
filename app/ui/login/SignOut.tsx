import { signOut } from "@/auth"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default function SignOut() {
    return (
        <>
            <form
                action={async () => {
                    "use server"
                    await signOut({ redirectTo: "/login" })
                }}
            >
                <Button variant="outline" type="submit" className="w-full">
                    Sign Out
                </Button>
            </form>
        </>
    )
}