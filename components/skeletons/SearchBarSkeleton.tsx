import { Skeleton } from "@/components/ui/skeleton";

export function SearchBarSkeleton() {
    return (
        <div className="flex flex-col items-center w-full gap-4">
            <div className="w-72 sm:w-80 md:w-96 shrink-0">
                <div className="flex gap-2">
                    <Skeleton className="h-9 w-full" />
                    <Skeleton className="h-9 w-16" />
                </div>
            </div>
        </div>
    );
}