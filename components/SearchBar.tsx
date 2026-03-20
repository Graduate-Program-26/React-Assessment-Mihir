"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useSearchUsers } from "@/hooks/useSearchUsers";
import { useDebounce } from "@/hooks/useDebounce";
import { UserGrid } from "./UserGrid";
import { UserGridSkeleton } from "./UserGridSkeleton";

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
                <Field orientation="horizontal">
                    <Input
                        type="search"
                        placeholder="Search GitHub users..."
                        className="w-full"
                        value={query}
                        onChange={handleChange}
                    />
                    <Button>Search</Button>
                </Field>
            </div>

            {isLoading && <UserGridSkeleton />}

            {isError && (
                <p className="text-red-500">
                    {(error as Error).message}
                </p>
            )}

            {!isLoading && data && <UserGrid users={data.items} />}
        </div>
    );
}