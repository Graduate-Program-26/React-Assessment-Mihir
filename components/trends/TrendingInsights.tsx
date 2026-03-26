import { TrendingRepo } from "@/hooks/useTrendingRepos";
import { deriveTrendingStats } from "@/app/lib/trendingStats";
import { LanguageBreakdownChart } from "./LanguageBreakdownChart";
import { StarsByLanguageChart } from "./StarsByLanguageChart";
import { TopicCloud } from "./TopicCloud";

export function TrendingInsights({ repos }: { repos: TrendingRepo[] }) {
    const { languages, topics } = deriveTrendingStats(repos);

    if (languages.length === 0) return null;

    return (
        <div className="w-full max-w-7xl flex flex-col gap-4">
            <p className="text-sm font-semibold text-foreground">Insights</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <LanguageBreakdownChart languages={languages} />
                <StarsByLanguageChart languages={languages} />
            </div>
            <TopicCloud topics={topics} />
        </div>
    );
}