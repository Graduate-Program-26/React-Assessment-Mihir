import { useQuery } from "@tanstack/react-query";
import { searchUsers } from "@/app/lib/api/github";

export function useSearchUsers(query: string) {
    return useQuery({
        queryKey: ["users", query],
        queryFn: () => searchUsers(query),
        enabled: !!query,
        staleTime: 1000 * 60 * 5,
    });
}