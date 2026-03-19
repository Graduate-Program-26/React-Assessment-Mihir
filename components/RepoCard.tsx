import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { LiaStarSolid } from "react-icons/lia";

interface Repo {
    name: string;
    description: string;
    html_url: string;
    stargazers_count: number;
    language: string;
}

export default function RepoCard({ repo }: { repo: Repo }) {
    return (
        <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
        >
            <Card className="h-full hover:shadow-lg transition cursor-pointer">
                <CardHeader>
                    <h3 className="font-semibold text-lg">{repo.name}</h3>
                </CardHeader>

                <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                        {repo.description || "No description provided"}
                    </p>

                    <div className="flex items-center gap-1">
                        <LiaStarSolid size={30} color="gold" />
                        <span>{repo.stargazers_count}</span>
                    </div>
                </CardContent>
            </Card>
        </a>
    );
}