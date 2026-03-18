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

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader />
            <SidebarContent>
                <SidebarGroup />
                <SidebarGroupContent>
                    <SidebarMenu>
                        <Button variant="outline" type="submit" className="w-11/12 self-center">
                            <a href="/">
                                <span>Landing Page</span>
                            </a>
                        </Button>
                        <Button variant="outline" type="submit" className="w-11/12 self-center">
                            <a href="/dashboard">
                                <span>Dashboard</span>
                            </a>
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