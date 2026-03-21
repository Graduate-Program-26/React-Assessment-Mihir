import { GitHubUserSearchResponse } from "@/types/github";

export async function searchUsers(query: string): Promise<GitHubUserSearchResponse> {
    const res = await fetch(`/api/search?q=${query}`);

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to fetch users");
    }

    return res.json();
}