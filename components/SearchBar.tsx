"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useSearchUsers } from "@/hooks/useSearchUsers";
import { useDebounce } from "@/hooks/useDebounce";
import { UserGrid } from "./UserGrid";
import { UserGridSkeleton } from "./UserGridSkeleton";

export function SearchBar() {
    const [query, setQuery] = useState("");
    const debouncedQuery = useDebounce(query, 500);
    const { data, isLoading, isError, error } = useSearchUsers(debouncedQuery);

    return (
        <div>
            <Field orientation="horizontal">
                <Input
                    type="search"
                    placeholder="Search..."
                    className="w-full sm:w-80 md:w-96 lg:w-125 xl:w-150"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <Button>Search</Button>
            </Field>

            {isLoading && <UserGridSkeleton />}

            {isError && (
                <p className="mt-2 text-red-500">
                    {(error as Error).message}
                </p>
            )}

            {!isLoading && data && <UserGrid users={data.items} />}
        </div>
    );
}