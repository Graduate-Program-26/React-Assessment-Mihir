"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useSearchUsers } from "@/hooks/useSearchUsers";
import { useDebounce } from "@/hooks/useDebounce";

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

            {isLoading && <p className="mt-2">Loading...</p>}

            {isError && (
                <p className="mt-2 text-red-500">
                    {(error as Error).message}
                </p>
            )}
            {/* for now just fetching and displaying users from search bar */}
            {data && (
                <pre className="mt-2 text-xs">
                    {JSON.stringify(data.items?.slice(0, 3), null, 2)}
                </pre>
            )}
        </div>
    );
}