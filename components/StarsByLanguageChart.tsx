"use client";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { Card } from "@/components/ui/card";
import { LanguageStat } from "@/app/lib/trendingStats";

const CHART_COLORS = [
    "#6366F1",
    "#22C55E",
    "#F59E0B",
    "#EF4444",
    "#3B82F6",
    "#A855F7",
    "#14B8A6",
    "#F43F5E",
];

function fmtStars(n: number) {
    return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);
}

// Properly typed custom tooltip
interface TooltipProps {
    active?: boolean;
    payload?: Array<{ payload: LanguageStat & { fill: string } }>;
}

const CustomTooltip = ({ active, payload }: TooltipProps) => {
    if (active && payload && payload.length) {
        const { language, stars } = payload[0].payload;
        return (
            <div className="bg-card border border-border rounded-md p-2 shadow-lg text-sm">
                <p className="font-semibold">{language}</p>
                <p>{stars} stars</p>
            </div>
        );
    }
    return null;
};

export function StarsByLanguageChart({ languages }: { languages: LanguageStat[] }) {
    const sorted = [...languages]
        .sort((a, b) => b.stars - a.stars)
        .map((entry, i) => ({ ...entry, fill: CHART_COLORS[i % CHART_COLORS.length] }));

    const tickColor =
        getComputedStyle(document.documentElement).getPropertyValue("--muted-foreground") || "#9ca3af";

    return (
        <Card className="p-5 flex flex-col gap-3">
            <p className="text-sm font-semibold text-foreground">Stars by Language</p>
            <p className="text-xs text-muted-foreground -mt-2">Total stars across trending repos</p>

            <ResponsiveContainer width="100%" height={220}>
                <BarChart data={sorted} layout="vertical" margin={{ left: 16, right: 16 }}>
                    <XAxis
                        type="number"
                        tickFormatter={fmtStars}
                        tick={{ fontSize: 11, fill: tickColor }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <YAxis
                        type="category"
                        dataKey="language"
                        width={72}
                        tick={{ fontSize: 11, fill: tickColor }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="stars" radius={[0, 4, 4, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </Card>
    );
}