"use client";

import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";
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

interface LanguageData extends LanguageStat {
    fill: string;
}

export function LanguageBreakdownChart({ languages }: { languages: LanguageStat[] }) {
    const data: LanguageData[] = languages.map((entry, i) => ({
        ...entry,
        fill: CHART_COLORS[i % CHART_COLORS.length],
    }));

    return (
        <Card className="p-5 flex flex-col gap-3">
            <p className="text-sm font-semibold text-foreground">Language Breakdown</p>
            <p className="text-xs text-muted-foreground -mt-2">
                Share of trending repos by language
            </p>

            <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="count"
                        nameKey="language"
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={85}
                        paddingAngle={3}
                        label={({ name, percent }) =>
                            `${name} (${(percent! * 100).toFixed(0)}%)`
                        }
                    />
                </PieChart>
            </ResponsiveContainer>
        </Card>
    );
}