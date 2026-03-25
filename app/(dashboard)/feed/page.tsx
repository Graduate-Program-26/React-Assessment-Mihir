"use client";

import { useState } from "react";
import { useTrendingRepos } from "@/hooks/useTrendingRepos";
import { IoMdTrendingUp } from "react-icons/io";
import RepoCard from "@/components/RepoCard";

export default function FeedPage() {
    const [language, setLanguage] = useState("All"); // will use later for filtering
    const [since, setSince] = useState(7); // will also use this later for filtering
    const { data, isLoading, isError, error } = useTrendingRepos(language, since);

    return (
        <div className="flex flex-col items-center w-full gap-6 py-8 px-4">
            <div className="flex flex-col items-center gap-1 text-center">
                <div className="flex items-center gap-2">
                    <IoMdTrendingUp size={30} className="text-primary" />
                    <h1 className="text-2xl font-bold tracking-tight">Trending Repositories</h1>
                </div>
                <p className="text-sm text-muted-foreground">
                    The most active open source projects right now
                </p>
            </div>

            {isError && (
                <p className="text-red-500">{(error as Error).message}</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full max-w-7xl">
                {data?.items.map((repo) => <RepoCard key={repo.id} repo={repo} />)}
            </div>
        </div>
    );
}