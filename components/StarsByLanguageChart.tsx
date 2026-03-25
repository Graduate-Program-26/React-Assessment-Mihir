import {
    BarChart, Bar, XAxis, YAxis, Tooltip,
    ResponsiveContainer, Cell
} from "recharts";
import { LanguageStat } from "@/app/lib/trendingStats";
import { Card } from "@/components/ui/card";

function fmtStars(n: number) {
    return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);
}

export function StarsByLanguageChart({ languages }: { languages: LanguageStat[] }) {
    const sorted = [...languages].sort((a, b) => b.stars - a.stars);

    return (
        <Card className="p-5 flex flex-col gap-3">
            <p className="text-sm font-semibold text-foreground">Stars by Language</p>
            <p className="text-xs text-muted-foreground -mt-2">Total stars earned across trending repos</p>
            <ResponsiveContainer width="100%" height={220}>
                <BarChart data={sorted} layout="vertical" margin={{ left: 16, right: 16 }}>
                    <XAxis
                        type="number"
                        tickFormatter={fmtStars}
                        tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <YAxis
                        type="category"
                        dataKey="language"
                        width={72}
                        tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <Bar dataKey="stars" radius={[0, 4, 4, 0]}>
                        {sorted.map((entry) => (
                            <Cell key={entry.language} fill={entry.color} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </Card>
    );
}