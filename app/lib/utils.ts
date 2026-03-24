import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function saveRecentUser(user: { login: string; avatar_url: string }) {
  const STORAGE_KEY = "recent_searches";
  const MAX_ITEMS = 5;

  const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

  // remove duplicates
  const filtered = stored.filter((u: any) => u.login !== user.login);

  const updated = [user, ...filtered].slice(0, MAX_ITEMS);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}