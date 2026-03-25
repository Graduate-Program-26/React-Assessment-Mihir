import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface RecentUser {
  login: string;
  avatar_url: string;
}

export function saveRecentUser(user: RecentUser) {
  const STORAGE_KEY = "recent_searches";
  const MAX_ITEMS = 5;

  const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]") as RecentUser[];
  const filtered = stored.filter((u: RecentUser) => u.login !== user.login);
  const updated = [user, ...filtered].slice(0, MAX_ITEMS);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}