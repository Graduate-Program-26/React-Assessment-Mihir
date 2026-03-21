import { Suspense } from "react";
import { SearchBar } from "@/components/SearchBar";
import { SearchBarSkeleton } from "@/components/SearchBarSkeleton";

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full pt-6">
      <Suspense fallback={<SearchBarSkeleton />}>
        <SearchBar />
      </Suspense>
    </div>
  );
}
