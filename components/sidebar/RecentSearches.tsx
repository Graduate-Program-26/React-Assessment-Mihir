"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";

interface RecentUser {
    login: string;
    avatar_url: string;
}

const STORAGE_KEY = "recent_searches";

export function RecentSearches() {
    const [users, setUsers] = useState<RecentUser[]>([]);
    const loaded = useRef(false);

    useEffect(() => {
        if (loaded.current) return;
        loaded.current = true;
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored) as RecentUser[];
                setTimeout(() => setUsers(parsed), 0);
            }
        } catch {
            // do nothing
        }
    }, []);

    function removeUser(login: string) {
        const updated = users.filter((u) => u.login !== login);
        setUsers(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }

    if (users.length === 0) {
        return (
            <p className="text-xs text-muted-foreground px-3">
                No recent searches
            </p>
        );
    }

    return (
        <div className="mx-1 rounded-lg border border-border bg-muted/40 divide-y divide-border">
            {users.map((user) => (
                <div
                    key={user.login}
                    className="group flex items-center justify-between px-3 py-2 rounded-md transition hover:bg-muted/60"
                >
                    <Link
                        href={`/users/${user.login}`}
                        className="flex items-center gap-2 min-w-0 flex-1"
                    >
                        <Image
                            src={user.avatar_url}
                            alt={user.login}
                            width={24}
                            height={24}
                            className="rounded-full"
                        />
                        <span className="text-sm truncate">{user.login}</span>
                    </Link>

                    <button
                        onClick={() => removeUser(user.login)}
                        className="p-1 rounded opacity-0 group-hover:opacity-100 transition"
                    >
                        <X className="w-3 h-3 hover:text-red-600" />
                    </button>
                </div>
            ))}
        </div>
    );
}