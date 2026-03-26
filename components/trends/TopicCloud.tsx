import { TopicStat } from "@/app/lib/trendingStats";
import { Card } from "@/components/ui/card";

export function TopicCloud({ topics }: { topics: TopicStat[] }) {
    if (topics.length === 0) return null;

    const max = topics[0].count;
    const min = topics[topics.length - 1].count;

    function getSize(count: number) {
        if (max === min) return 1;
        const normalized = (count - min) / (max - min);
        return 0.75 + normalized * 0.6;
    }

    function getOpacity(count: number) {
        if (max === min) return 1;
        const normalized = (count - min) / (max - min);
        return 0.5 + normalized * 0.5;
    }

    return (
        <Card className="p-5 flex flex-col gap-4">
            <div>
                <p className="text-sm font-semibold text-foreground">Trending Topics</p>
                <p className="text-xs text-muted-foreground mt-0.5">Most common tags across trending repos</p>
            </div>
            <div className="flex flex-wrap gap-2 items-center">
                {topics.map(({ topic, count }) => (
                    <span
                        key={topic}
                        title={`${count} repo${count !== 1 ? "s" : ""}`}
                        className="px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium transition-colors hover:bg-primary/20 cursor-default"
                        style={{
                            fontSize: `${getSize(count)}rem`,
                            opacity: getOpacity(count),
                        }}
                    >
                        {topic}
                    </span>
                ))}
            </div>
        </Card>
    );
}