import { ModeToggle } from "@/components/ModeToggle";
import SignOut from "../ui/login/SignOut";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Page() {
    return (
        <>
            <h1>Dashboard Page</h1>
            <SidebarProvider
                style={
                    {
                        "--sidebar-width": "20rem",
                        "--sidebar-width-mobile": "20rem",
                    } as React.CSSProperties
                }
            >
                <AppSidebar />
            </SidebarProvider>
        </>
    )
}