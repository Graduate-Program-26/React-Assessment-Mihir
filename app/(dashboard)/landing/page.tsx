import { SearchBar } from "@/components/SearchBar";
import { SearchBarSkeleton } from "@/components/SearchBarSkeleton";
import { Suspense } from "react";

export default function Page() {
    return (
        <main className="flex w-full min-h-screen">
            <div className="flex-1 flex justify-center pt-8 px-4">
                <Suspense fallback={<SearchBarSkeleton />}>
                    <SearchBar />
                </Suspense>
            </div>
        </main>
    );
}