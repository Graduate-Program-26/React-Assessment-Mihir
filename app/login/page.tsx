import { signIn, signOut } from "@/auth"
import SignIn from "../ui/login/SignIn"

export default function LoginPage() {
    return (
        <>
            <main>
                <h1>Login Page</h1>
                <SignIn />
            </main>
        </>
    )
}