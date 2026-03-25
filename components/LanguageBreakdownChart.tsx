import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { LanguageStat } from "@/app/lib/trendingStats";
import { Card } from "@/components/ui/card";

export function LanguageBreakdownChart({ languages }: { languages: LanguageStat[] }) {
    return (
        <Card className="p-5 flex flex-col gap-3">
            <p className="text-sm font-semibold text-foreground">Language Breakdown</p>
            <p className="text-xs text-muted-foreground -mt-2">Share of trending repos by language</p>
            <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                    <Pie
                        data={languages}
                        dataKey="count"
                        nameKey="language"
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={85}
                        paddingAngle={3}
                    >
                        {languages.map((entry) => (
                            <Cell key={entry.language} fill={entry.color} />
                        ))}
                    </Pie>
                    <Legend
                        iconType="circle"
                        iconSize={8}
                        formatter={(value) => (
                            <span style={{ fontSize: "11px", color: "hsl(var(--muted-foreground))" }}>
                                {value}
                            </span>
                        )}
                    />
                </PieChart>
            </ResponsiveContainer>
        </Card>
    );
}