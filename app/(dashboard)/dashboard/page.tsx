import { RepoGrid } from "@/components/profile/RepoGrid";
import Image from "next/image";
import { ActivityFeed } from "@/components/profile/ActivityFeed";
import { ContributionChart } from "@/components/profile/ContributionChart";
import { Metadata } from "next";
import { auth } from "@/auth";

export const metadata: Metadata = {
    title: `Personal GitHub profile page`,
    description: `This is your personal GitHub profile page`,
}

export default async function DashboardPage() {
    const session = await auth();

    if (!session?.user?.name) {
        return <div>Not authenticated</div>;
    }

    const username = session.user.name;

    const headers = {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
    };

    const userRes = await fetch(`https://api.github.com/users/${username}`, {
        headers,
        cache: "no-store",
    });

    if (!userRes.ok) return <div>Failed to load user</div>;

    const user = await userRes.json();

    const [repoRes, activitiesRes] = await Promise.all([
        fetch(`https://api.github.com/users/${username}/repos?sort=stars&per_page=6`, {
            headers,
            cache: "no-store",
        }),
        fetch(`https://api.github.com/users/${username}/events/public?per_page=10`, {
            headers,
            cache: "no-store",
        }),
    ]);

    const [repos, activities] = await Promise.all([
        repoRes.json(),
        activitiesRes.json(),
    ]);

    return (
        <div className="flex justify-center p-6">
            <div className="w-full max-w-2xl space-y-6">

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

                    <div className="grid grid-cols-3 gap-4 mt-6">
                        <div className="text-center">
                            <p className="font-semibold">{user.public_repos}</p>
                            <p className="text-xs text-muted-foreground">Repos</p>
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

                <div>
                    <h2 className="text-xl font-semibold mb-4">Contributions</h2>
                    <div className="border rounded-xl p-4 shadow-sm overflow-x-auto">
                        <ContributionChart username={user.login} />
                    </div>
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                    <ActivityFeed activities={activities} />
                </div>
            </div>
        </div>
    );
}