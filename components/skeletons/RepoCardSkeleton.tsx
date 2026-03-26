export default function RepoCardSkeleton() {
    return (
        <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-5 animate-pulse">
            <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-muted" />
                <div className="h-3 w-20 rounded bg-muted" />
            </div>
            <div className="h-4 w-3/4 rounded bg-muted" />
            <div className="space-y-1.5">
                <div className="h-3 w-full rounded bg-muted" />
                <div className="h-3 w-5/6 rounded bg-muted" />
            </div>
            <div className="flex gap-2 mt-auto pt-2 border-t border-border">
                <div className="h-3 w-12 rounded bg-muted" />
                <div className="h-3 w-10 rounded bg-muted ml-auto" />
                <div className="h-3 w-10 rounded bg-muted" />
            </div>
        </div>
    );
}