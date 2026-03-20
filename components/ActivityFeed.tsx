import { GitHubEvent } from "@/types/github";
import { CircleDot, GitCommit, GitFork, GitPullRequest, MessageSquare, Star } from "lucide-react";

interface ActivityFeedProps {
    activities: GitHubEvent[];
}

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-ZA", {
        month: "short", day: "numeric", year: "numeric",
    });
}

function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function parseActivity(event: GitHubEvent): { icon: React.ReactNode; text: string } | null {
    const repo = event.repo.name;

    switch (event.type) {
        case "PushEvent": {
            return {
                icon: <GitCommit className="w-4 h-4 text-blue-500 shrink-0" />,
                text: `Pushed 1 commit to ${repo}`,
            };
        }
        case "PullRequestEvent": {
            const payload = event.payload as { type: "PullRequestEvent"; action: string };
            return {
                icon: <GitPullRequest className="w-4 h-4 text-purple-500 shrink-0" />,
                text: `${capitalize(payload.action)} a pull request in ${repo}`,
            };
        }
        case "IssuesEvent": {
            const payload = event.payload as { type: "IssuesEvent"; action: string };
            return {
                icon: <CircleDot className="w-4 h-4 text-green-500 shrink-0" />,
                text: `${capitalize(payload.action)} an issue in ${repo}`,
            };
        }
        case "WatchEvent":
            return {
                icon: <Star className="w-4 h-4 text-yellow-500 shrink-0" />,
                text: `Starred ${repo}`,
            };
        case "ForkEvent":
            return {
                icon: <GitFork className="w-4 h-4 text-orange-500 shrink-0" />,
                text: `Forked ${repo}`,
            };
        case "IssueCommentEvent":
            return {
                icon: <MessageSquare className="w-4 h-4 text-sky-500 shrink-0" />,
                text: `Commented on an issue in ${repo}`,
            };
        default:
            return null;
    }
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
    const hasActivity = activities.some((e) => parseActivity(e) !== null);

    if (!hasActivity) {
        <p className="text-center text-sm text-muted-foreground">
            No recent public activity
        </p>
    }

    return (
        <div className="border rounded-xl shadow-sm divide-y">
            {activities.map((activity) => {
                const parsed = parseActivity(activity);
                if (!parsed) {
                    return null;
                }
                return (
                    <div key={activity.id} className="flex items-center gap-3 px-4 py-3 text-sm">
                        {parsed.icon}
                        <span className="flex-1">{parsed.text}</span>
                        <span className="text-xs text-muted-foreground shrink-0">
                            {formatDate(activity.created_at)}
                        </span>
                    </div>
                )
            })}
        </div>
    )
}