import { useQuery } from "@tanstack/react-query";

export function useSearchUsers(query: string) {
    return useQuery({
        queryKey: ["users", query],
        queryFn: async () => {
            const res = await fetch(`/api/search?q=${query}`);
            if (!res.ok) throw new Error("Failed to fetch users");
            return res.json();
        },
        enabled: !!query,
        staleTime: 1000 * 60 * 5,
    });
}