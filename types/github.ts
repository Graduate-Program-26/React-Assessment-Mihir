export interface GitHubUser {
    login: string;
    id: number;
    avatar_url: string;
    html_url: string;
}

export interface GitHubUserSearchResponse {
    total_count: number;
    incomplete_results: boolean;
    items: GitHubUser[];
}

export interface GitHubRepo {
    id: number;
    name: string;
    description: string;
    html_url: string;
    stargazers_count: number;
    language: string;
    updated_at: string;
}

export interface GitHubEventRepo {
    id: number;
    name: string;
    url: string;
}

interface PushPayload {
    commits: { sha: string; message: string; author: { name: string } }[];
    size: number;
    distinct_size: number;
}

interface PullRequestPayload {
    action: string;
}

interface IssuesPayload {
    action: string;
}

interface IssueCommentPayload {
    action: string;
}

interface WatchPayload {
    action: string;
}

interface ForkPayload {
    forkee: { full_name: string };
}

type GitHubEventPayload =
    | ({ type: "PushEvent" } & PushPayload)
    | ({ type: "PullRequestEvent" } & PullRequestPayload)
    | ({ type: "IssuesEvent" } & IssuesPayload)
    | ({ type: "IssueCommentEvent" } & IssueCommentPayload)
    | ({ type: "WatchEvent" } & WatchPayload)
    | ({ type: "ForkEvent" } & ForkPayload);

export interface GitHubEvent {
    id: string;
    type: string;
    repo: GitHubEventRepo;
    payload: GitHubEventPayload;
    created_at: string;
}