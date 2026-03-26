import { Card } from "@/components/ui/card";
import { LiaStarSolid } from "react-icons/lia";

interface Repo {
    name: string;
    description: string;
    html_url: string;
    stargazers_count: number;
    language: string;
    updated_at: string;
}

export default function RepoCard({ repo }: { repo: Repo }) {
    const updated = new Date(repo.updated_at).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
    });

    return (
        <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
        >
            <Card className="h-full p-4 hover:shadow-md transition flex flex-col justify-between">

                <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-base line-clamp-1">
                        {repo.name}
                    </h3>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <LiaStarSolid className="text-yellow-500" />
                        {repo.stargazers_count.toLocaleString()}
                    </div>
                </div>

                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                    {repo.description || "No description provided"}
                </p>

                <div className="flex justify-between items-center mt-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500" />
                        {repo.language || "Unknown"}
                    </div>
                    <span>Updated {updated}</span>
                </div>
            </Card>
        </a>
    );
}