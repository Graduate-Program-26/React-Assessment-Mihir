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
import { FaGithub } from "react-icons/fa";
import { RecentSearches } from "./RecentSearches";
import { IoHomeOutline } from "react-icons/io5";

const navItems = [
    { label: "Feed", href: "/feed", icon: IoHomeOutline },
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
    public_gists: number;
}

export async function AppSidebar() {
    const session = await auth();
    const username = session?.user?.name;

    let githubUser: GitHubUser | null = null;

    if (username) {
        const [userRes] = await Promise.all([
            fetch(`https://api.github.com/users/${username}`, {
                headers: { Authorization: `token ${process.env.GITHUB_TOKEN}` },
                next: { revalidate: 3600 },
            }),
        ]);

        if (userRes.ok) githubUser = await userRes.json();
    }

    return (
        <Sidebar>

            <SidebarHeader className="px-4 py-5">
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-md bg-500 border flex items-center justify-center">
                        <span className="text-2xl font-bold"><FaGithub /></span>
                    </div>
                    <span className="font-semibold text-sm tracking-tight">Github Portfolios</span>
                </div>
            </SidebarHeader>

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
                    <SidebarGroupLabel>Recent Searches</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <RecentSearches />
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

            {githubUser && (
                <SidebarFooter className="p-3">
                    <Link
                        href={`/users/${githubUser.login}`}
                        className="flex items-center gap-3 p-2 rounded-lg border border-border bg-muted/40 hover:bg-muted transition-colors"
                    >
                        <Image
                            src={githubUser.avatar_url}
                            alt={githubUser.login}
                            width={36}
                            height={36}
                            className="rounded-full ring-2 shrink-0"
                        />
                        <div className="min-w-0">
                            <p className="text-sm font-semibold truncate">
                                {githubUser.name || githubUser.login}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">
                                @{githubUser.login}
                            </p>
                        </div>
                    </Link>
                </SidebarFooter>
            )}

        </Sidebar>
    );
}