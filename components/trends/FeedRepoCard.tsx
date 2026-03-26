import { Star, GitFork, ExternalLink } from "lucide-react";
import { LANGUAGE_COLORS, type TrendingRepo } from "@/hooks/useTrendingRepos";
import Link from "next/link";
import Image from "next/image";

function fmt(n: number) {
    return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);
}

export function FeedRepoCard({ repo }: { repo: TrendingRepo }) {
    const langColor = repo.language ? (LANGUAGE_COLORS[repo.language] ?? "#8b949e") : null;

    return (
        <Link
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-3 rounded-xl border border-border bg-card p-5 hover:border-primary/50 hover:shadow-md transition-all duration-200"
        >
            < div className="flex items-start justify-between gap-2" >
                <div className="flex items-center gap-2 min-w-0">
                    <Image
                        src={repo.owner.avatar_url}
                        alt={repo.owner.login}
                        width={30}
                        height={30}
                        className="rounded-full shrink-0"
                    />
                    <span className="text-xs text-muted-foreground truncate">{repo.owner.login}</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
            </div >

            < p className="font-semibold text-sm text-foreground leading-snug" >
                {repo.name}
            </p >

            < p className="text-xs text-muted-foreground line-clamp-2 flex-1 leading-relaxed" >
                {repo.description ?? "No description provided."}
            </p >

            {
                repo.topics.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                        {repo.topics.slice(0, 3).map((t) => (
                            <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                                {t}
                            </span>
                        ))}
                    </div>
                )
            }

            <div className="flex items-center gap-3 mt-auto pt-2 border-t border-border text-xs text-muted-foreground">
                {langColor && (
                    <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: langColor }} />
                        {repo.language}
                    </span>
                )}
                <span className="flex items-center gap-1 ml-auto">
                    <Star className="w-3.5 h-3.5" />
                    {fmt(repo.stargazers_count)}
                </span>
                <span className="flex items-center gap-1">
                    <GitFork className="w-3.5 h-3.5" />
                    {fmt(repo.forks_count)}
                </span>
            </div>
        </Link>
    );
}