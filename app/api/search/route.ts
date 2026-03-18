import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");

    if (!query) {
        return NextResponse.json({ error: "Missing query" }, { status: 400 });
    }

    const res = await fetch(
        `https://api.github.com/search/users?q=${query}`,
        {
            headers: {
                Authorization: `token ${process.env.GITHUB_TOKEN}`,
                "X-GitHub-Api-Version": "2026-03-10",
            }
        }
    );
    const data = await res.json();
    return NextResponse.json(data);
}