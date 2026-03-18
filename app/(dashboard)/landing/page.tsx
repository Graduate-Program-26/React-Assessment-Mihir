"use client";

import { SearchBar } from "@/components/SearchBar";

export default function Page() {
    return (
        <main className="flex w-full min-h-screen">
            <div className="flex-1 flex justify-center pt-8 px-4">
                <SearchBar />
            </div>
        </main>
    );
}