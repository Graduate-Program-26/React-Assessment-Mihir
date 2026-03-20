import SignOut from "@/app/ui/login/SignOut"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { ModeToggle } from "./ModeToggle"
import { Button } from "./ui/button"
import Link from "next/link"

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader />
            <SidebarContent>
                <SidebarGroup />
                <SidebarGroupContent>
                    <SidebarMenu>
                        <Button variant="outline" type="submit" className="w-11/12 self-center">
                            <Link href="/landing">
                                <span>Landing Page</span>
                            </Link>
                        </Button>
                        <Button variant="outline" type="submit" className="w-11/12 self-center">
                            <Link href="/dashboard">
                                <span>Dashboard</span>
                            </Link>
                        </Button>
                    </SidebarMenu>
                </SidebarGroupContent>
                <SidebarGroup />
            </SidebarContent>

            <SidebarFooter>
                <SidebarGroupContent>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <ModeToggle />
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <SignOut />
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarFooter>
        </Sidebar>
    )
}