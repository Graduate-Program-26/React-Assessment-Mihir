import { signIn } from "@/auth"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { FaGithub } from "react-icons/fa";

export default function SignIn() {
    return (
        <>
            <div className="flex min-h-screen items-center justify-center">
                <Card className="w-full max-w-sm">
                    <CardHeader>
                        <CardTitle>Login to your account</CardTitle>
                        <CardDescription>
                            Click on the button below to sign in
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form
                            action={async () => {
                                "use server"
                                await signIn("github")
                            }}
                        >
                            <div className="flex justify-self-center">
                                <FaGithub size={300} />
                            </div>
                            <Button variant="outline" type="submit" className="w-full mt-4">
                                Sign in with Github
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}