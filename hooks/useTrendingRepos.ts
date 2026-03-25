import { useQuery } from "@tanstack/react-query";

interface TrendingRepo {
    id: number;
    full_name: string;
    name: string;
    owner: { login: string; avatar_url: string };
    description: string;
    stargazers_count: number;
    forks_count: number;
    language: string;
    html_url: string;
    topics: string[];
    updated_at: string;
}

interface SearchResult {
    items: TrendingRepo[];
}

const LANGUAGE_COLORS: Record<string, string> = {
    TypeScript: "#3178c6", JavaScript: "#f1e05a", Python: "#3572A5",
    Rust: "#dea584", Go: "#00ADD8", Java: "#b07219", "C++": "#f34b7d",
    C: "#555555", Ruby: "#701516", Swift: "#F05138", Kotlin: "#A97BFF",
    Zig: "#ec915c", Nix: "#7e7eff",
};

export { LANGUAGE_COLORS, type TrendingRepo };

async function fetchTrendingRepos(language: string, since: number) {
    const date = new Date();
    date.setDate(date.getDate() - since);
    const dateStr = date.toISOString().split("T")[0];
    //language filter to be handled here eventually
    const url = `https://api.github.com/search/repositories?q=created:>${dateStr}&sort=stars&order=desc&per_page=24`;

    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch trending repos");
    return res.json() as Promise<SearchResult>;
}

export function useTrendingRepos(language: string, since: number) {
    return useQuery({
        queryKey: ["trendingRepos", language, since],
        queryFn: () => fetchTrendingRepos(language, since),
        staleTime: 1000 * 60 * 10,
    });
}