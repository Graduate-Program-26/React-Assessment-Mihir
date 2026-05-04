import { Metadata } from "next";
import SignIn from "../../ui/login/SignIn"

export const metadata: Metadata = {
    title: 'Login Page',
    description: 'This is a login page for the user to login with their GitHub credentials.',
}

export default function LoginPage() {
    return (
        <>
            <main>
                <SignIn />
            </main>
        </>
    )
}