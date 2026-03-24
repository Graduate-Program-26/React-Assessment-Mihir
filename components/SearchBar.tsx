"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useSearchUsers } from "@/hooks/useSearchUsers";
import { useDebounce } from "@/hooks/useDebounce";
import { UserGrid } from "./UserGrid";
import { UserGridSkeleton } from "./UserGridSkeleton";
import { Search } from "lucide-react";
import Image from "next/image";

export function SearchBar() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const query = searchParams.get("q") ?? "";
    const debouncedQuery = useDebounce(query, 500);
    const { data, isLoading, isError, error } = useSearchUsers(debouncedQuery);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set("q", value);
        } else {
            params.delete("q");
        }
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    };

    return (
        <div className="flex flex-col items-center w-full gap-4">
            <div className="w-72 sm:w-80 md:w-96 shrink-0">
                <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                    <Input
                        type="search"
                        placeholder="Search GitHub users..."
                        className="w-full pl-9"
                        value={query}
                        onChange={handleChange}
                    />
                </div>
            </div>

            {!query && (
                <div className="flex flex-col items-center gap-3 mt-6">
                    <Image
                        src="/illustrations/Search-engines-bro.svg"
                        alt="Search for a user"
                        width={320}
                        height={320}
                    />
                    <p className="text-lg font-semibold text-foreground">Find any GitHub user</p>
                    <p className="text-sm text-muted-foreground max-w-xs text-center">
                        Search by username to explore their repositories, contributions, and activity.
                    </p>
                </div>
            )}

            {isLoading && <UserGridSkeleton />}

            {isError && (
                <p className="text-red-500">
                    {(error as Error).message}
                </p>
            )}

            {!isLoading && data && data.items.length === 0 && (
                <div className="flex flex-col items-center gap-3 mt-6">
                    <Image
                        src="/illustrations/undraw_page-eaten_b2rt.svg"
                        alt="User not found"
                        width={320}
                        height={320}
                    />
                    <p className="text-lg font-semibold text-foreground">No users found</p>
                    <p className="text-sm text-muted-foreground max-w-xs text-center">
                        We couldn't find anyone matching <span className="font-medium text-foreground">&quot;{query}&quot;</span>. Try checking the spelling or searching for a different username.
                    </p>
                </div>
            )}

            {!isLoading && data && data.items.length > 0 && <UserGrid users={data.items} />}
        </div>
    );
}