import { ModeToggle } from "@/components/ModeToggle";
import SignOut from "../ui/login/SignOut";

export default function Page() {
    return (
        <>
            <h1>Dashboard Page</h1>
            <ModeToggle />
            <SignOut />
        </>
    )
}