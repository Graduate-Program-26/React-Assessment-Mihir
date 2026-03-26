import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function UserCardSkeleton() {
    return (
        <Card className="animate-pulse">
            <CardHeader className="flex justify-center">
                <div className="relative w-24 h-24">
                    <Skeleton className="w-full h-full rounded-full" />
                </div>
            </CardHeader>

            <CardContent className="flex justify-center">
                <Skeleton className="h-4 w-20" />
            </CardContent>
        </Card>
    );
}