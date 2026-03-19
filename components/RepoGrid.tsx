import RepoCard from "./RepoCard";

interface Repo {
    id: number;
    name: string;
    description: string;
    html_url: string;
    stargazers_count: number;
    language: string;
}

export function RepoGrid({ repos }: { repos: Repo[] }) {
    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {repos.map((repo) => (
                <RepoCard key={repo.id} repo={repo} />
            ))}
        </div>
    );
}