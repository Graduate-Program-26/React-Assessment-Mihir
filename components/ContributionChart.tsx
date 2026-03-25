"use client";

import { GitHubCalendar } from "react-github-calendar";
import { useTheme } from "next-themes";

export function ContributionChart({ username }: { username: string }) {
    const { resolvedTheme } = useTheme();

    return (
        <GitHubCalendar
            username={username}
            colorScheme={resolvedTheme === "dark" ? "dark" : "light"}
            blockSize={12}
            blockMargin={4}
            fontSize={12}
        />
    );
}