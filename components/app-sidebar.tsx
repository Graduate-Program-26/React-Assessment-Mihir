import SignOut from "@/app/ui/login/SignOut";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ModeToggle } from "./ModeToggle";
import { LayoutDashboard, Search } from "lucide-react";
import Link from "next/link";
import { auth } from "@/auth";
import Image from "next/image";

const navItems = [
    { label: "Search", href: "/landing", icon: Search },
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
];

interface GitHubUser {
    login: string;
    name: string;
    avatar_url: string;
    public_repos: number;
    followers: number;
    following: number;
}

export async function AppSidebar() {
    const session = await auth();
    const username = session?.user?.name;

    let githubUser: GitHubUser | null = null;

    if (username) {
        const res = await fetch(`https://api.github.com/users/${username}`, {
            headers: { Authorization: `token ${process.env.GITHUB_TOKEN}` },
            next: { revalidate: 3600 },
        });
        if (res.ok) githubUser = await res.json();
    }

    return (
        <Sidebar>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navItems.map(({ label, href, icon: Icon }) => (
                                <SidebarMenuItem key={label}>
                                    <SidebarMenuButton asChild>
                                        <Link href={href} className="flex items-center gap-2">
                                            <Icon className="w-4 h-4" />
                                            <span>{label}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel>Settings</SidebarGroupLabel>
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
                </SidebarGroup>

            </SidebarContent>

            <SidebarFooter>
                <SidebarContent>
                    {githubUser && (
                        <div className="mx-3 mt-1 mb-2 p-3 rounded-lg border border-border bg-muted/40 space-y-3">
                            <div className="flex items-center gap-3">
                                <Image
                                    src={githubUser.avatar_url}
                                    alt={githubUser.login}
                                    width={40}
                                    height={40}
                                    className="rounded-full ring-2"
                                />
                                <div className="min-w-0">
                                    <p className="text-sm font-semibold truncate">
                                        {githubUser.name || githubUser.login}
                                    </p>
                                    <p className="text-xs text-muted-foreground truncate">
                                        @{githubUser.login}
                                    </p>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 divide-x divide-border text-center">
                                {[
                                    { label: "Repos", value: githubUser.public_repos },
                                    { label: "Followers", value: githubUser.followers },
                                    { label: "Following", value: githubUser.following },
                                ].map(({ label, value }) => (
                                    <div key={label} className="px-1">
                                        <p className="text-xs font-semibold">{value}</p>
                                        <p className="text-[10px] text-muted-foreground">{label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </SidebarContent>
            </SidebarFooter>
        </Sidebar>
    );
}