import { Skeleton } from "@/components/ui/skeleton";

export default function UserProfileLoading() {
    return (
        <div className="flex justify-center p-6">
            <div className="w-full max-w-2xl space-y-6">

                <div className="border rounded-xl p-6 shadow-sm text-center space-y-4">
                    <Skeleton className="w-32 h-32 rounded-full mx-auto" />
                    <Skeleton className="h-7 w-40 mx-auto" />
                    <Skeleton className="h-4 w-24 mx-auto" />
                    <Skeleton className="h-4 w-64 mx-auto" />
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="space-y-2">
                                <Skeleton className="h-5 w-8 mx-auto" />
                                <Skeleton className="h-3 w-14 mx-auto" />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-3">
                    <Skeleton className="h-7 w-36" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="border rounded-xl p-4 space-y-3">
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-3 w-full" />
                                <Skeleton className="h-3 w-3/4" />
                                <div className="flex gap-4 pt-1">
                                    <Skeleton className="h-3 w-16" />
                                    <Skeleton className="h-3 w-8" />
                                    <Skeleton className="h-3 w-20 ml-auto" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-3">
                    <Skeleton className="h-7 w-36" />
                    <div className="border rounded-xl p-4">
                        <Skeleton className="h-32 w-full" />
                    </div>
                </div>

                <div className="space-y-3">
                    <Skeleton className="h-7 w-36" />
                    <div className="border rounded-xl divide-y">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="flex items-center gap-3 px-4 py-3">
                                <Skeleton className="h-4 w-4 rounded-full shrink-0" />
                                <Skeleton className="h-3 flex-1" />
                                <Skeleton className="h-3 w-20 shrink-0" />
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}