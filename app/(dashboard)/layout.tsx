import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="flex-1 flex flex-col items-center w-full">
                <div className="w-full flex justify-start p-2">
                    <SidebarTrigger />
                </div>
                <div className="w-full max-w-7xl px-4">
                    {children}
                </div>
            </main>
        </SidebarProvider>
    );
}