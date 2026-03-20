import { RepoGrid } from "@/components/RepoGrid";
import Image from "next/image";
import { BackButton } from "@/components/BackButton";

interface PageProps {
    params: Promise<{
        username: string;
    }>;
}

export default async function UserProfilePage({ params }: PageProps) {
    const { username } = await params;

    if (!username) {
        return <div>Invalid user</div>;
    }

    const res = await fetch(`https://api.github.com/users/${username}`, {
        headers: {
            Authorization: `token ${process.env.GITHUB_TOKEN}`,
        },
        cache: "no-store",
    });

    if (!res.ok) {
        return <div>User not found</div>;
    }

    const user = await res.json();

    const reposRes = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`,
        {
            headers: {
                Authorization: `token ${process.env.GITHUB_TOKEN}`,
            },
            cache: "no-store",
        }
    );

    const repos = await reposRes.json();

    return (
        <div className="flex justify-center p-6">
            <div className="w-full max-w-2xl space-y-6">

                <BackButton />

                <div className="border rounded-xl p-6 shadow-sm text-center">
                    <Image
                        src={user.avatar_url}
                        alt={user.login}
                        width={128}
                        height={128}
                        className="rounded-full mx-auto"
                    />

                    <h1 className="text-2xl font-bold mt-4">
                        {user.name || user.login}
                    </h1>

                    <p className="text-muted-foreground">@{user.login}</p>

                    {user.bio && (
                        <p className="mt-3 text-sm">{user.bio}</p>
                    )}

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                        <div className="text-center">
                            <p className="font-semibold">{user.public_repos}</p>
                            <p className="text-xs text-muted-foreground">Repos</p>
                        </div>

                        <div className="text-center">
                            <p className="font-semibold">{user.public_gists}</p>
                            <p className="text-xs text-muted-foreground">Gists</p>
                        </div>

                        <div className="text-center">
                            <p className="font-semibold">{user.followers}</p>
                            <p className="text-xs text-muted-foreground">Followers</p>
                        </div>

                        <div className="text-center">
                            <p className="font-semibold">{user.following}</p>
                            <p className="text-xs text-muted-foreground">Following</p>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-4">Repositories</h2>
                    {repos.length === 0 ? (
                        <p className="text-center text-sm text-muted-foreground">
                            This user has no public repositories.
                        </p>
                    ) : (
                        <RepoGrid repos={repos} />
                    )}
                </div>

            </div>
        </div>
    );
}