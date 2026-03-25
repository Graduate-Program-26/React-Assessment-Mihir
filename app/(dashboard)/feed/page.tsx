"use client";

import { useState } from "react";
import { useTrendingRepos } from "@/hooks/useTrendingRepos";
import { IoMdTrendingUp, IoMdStats } from "react-icons/io";
import RepoCardSkeleton from "@/components/RepoCardSkeleton";
import { cn } from "@/app/lib/utils";
import { FeedRepoCard } from "@/components/FeedRepoCard";
import { TrendingInsights } from "@/components/TrendingInsights";

const LANGUAGES = ["All", "TypeScript", "Python", "Rust", "Go", "JavaScript", "C++", "Zig", "Swift", "Kotlin"];
const TIME_RANGES = [
    { label: "Today", value: 1 },
    { label: "This week", value: 7 },
    { label: "This month", value: 30 },
];

function FilterPill({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-150 border",
                active
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-transparent text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
            )}
        >
            {children}
        </button>
    );
}

export default function FeedPage() {
    const [language, setLanguage] = useState("All");
    const [since, setSince] = useState(7);
    const [activeTab, setActiveTab] = useState<"trending" | "insights">("trending");

    const { data, isLoading, isError, error } = useTrendingRepos(language, since);

    return (
        <div className="flex flex-col items-center w-full gap-6 py-8 px-4">
            <div className="flex flex-col items-center gap-1 text-center">
                <div className="flex items-center gap-2">
                    <IoMdTrendingUp size={30} className="text-primary" />
                    <h1 className="text-2xl font-bold tracking-tight">Trending Repositories</h1>
                </div>
                <p className="text-sm text-muted-foreground">
                    The fastest-rising open source projects right now
                </p>
            </div>

            <div className="flex gap-2 border-b border-border mb-4">
                <button
                    onClick={() => setActiveTab("trending")}
                    className={cn(
                        "px-4 py-2 font-medium transition-colors",
                        activeTab === "trending"
                            ? "border-b-2 border-primary text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                    )}
                >
                    <IoMdTrendingUp className="inline mr-1" /> Trending
                </button>
                {language === "All" && (
                    <button
                        onClick={() => setActiveTab("insights")}
                        className={cn(
                            "px-4 py-2 font-medium transition-colors",
                            activeTab === "insights"
                                ? "border-b-2 border-primary text-foreground"
                                : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        <IoMdStats className="inline mr-1" /> Insights
                    </button>
                )}
            </div>

            {activeTab === "trending" && (
                <div className="flex flex-col items-center gap-3 w-full max-w-3xl">
                    <div className="flex flex-wrap justify-center gap-1.5">
                        {TIME_RANGES.map((r) => (
                            <FilterPill key={r.value} active={since === r.value} onClick={() => setSince(r.value)}>
                                {r.label}
                            </FilterPill>
                        ))}
                    </div>
                    <div className="flex flex-wrap justify-center gap-1.5">
                        {LANGUAGES.map((l) => (
                            <FilterPill key={l} active={language === l} onClick={() => setLanguage(l)}>
                                {l}
                            </FilterPill>
                        ))}
                    </div>
                </div>
            )}

            {isError && <p className="text-red-500">{(error as Error).message}</p>}

            {activeTab === "trending" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full max-w-7xl">
                    {isLoading
                        ? Array.from({ length: 24 }).map((_, i) => <RepoCardSkeleton key={i} />)
                        : data?.items.map((repo) => <FeedRepoCard key={repo.id} repo={repo} />)}
                </div>
            )}

            {activeTab === "insights" && data && !isLoading && (
                <TrendingInsights repos={data.items} />
            )}
        </div>
    );
}