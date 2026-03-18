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