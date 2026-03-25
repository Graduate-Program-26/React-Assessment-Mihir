import { TrendingRepo } from "@/hooks/useTrendingRepos";
import { LANGUAGE_COLORS } from "@/hooks/useTrendingRepos";

export interface LanguageStat {
    language: string;
    count: number;
    stars: number;
    color: string;
}

export interface TopicStat {
    topic: string;
    count: number;
}


export function deriveTrendingStats(repos: TrendingRepo[]) {
    const languageMap = new Map<string, { count: number; stars: number }>();
    const topicMap = new Map<string, number>();

    for (const repo of repos) {
        if (repo.language) {
            const existing = languageMap.get(repo.language) ?? { count: 0, stars: 0 };
            languageMap.set(repo.language, {
                count: existing.count + 1,
                stars: existing.stars + repo.stargazers_count,
            });
        }

        for (const topic of repo.topics ?? []) {
            topicMap.set(topic, (topicMap.get(topic) ?? 0) + 1);
        }
    }

    const languages: LanguageStat[] = Array.from(languageMap.entries())
        .map(([language, { count, stars }]) => ({
            language,
            count,
            stars,
            color: LANGUAGE_COLORS[language] ?? "#8b949e",
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 8);

    const topics: TopicStat[] = Array.from(topicMap.entries())
        .map(([topic, count]) => ({ topic, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 30);

    return { languages, topics };
}