import { SearchBar } from "@/components/SearchBar";
import { Sidebar } from "lucide-react";
import SignOut from "../ui/login/SignOut";

export default function Page() {
    return (
        <main className="w-full">
            <div className="flex mt-4 ml-4 w-full justify-self-center">
                <SearchBar />
            </div>
        </main>
    )
}