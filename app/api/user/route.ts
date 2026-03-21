import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username");

    if (!username) {
        return NextResponse.json({ error: "Missing username" }, { status: 400 });
    }

    const res = await fetch(`https://api.github.com/users/${username}`, {
        headers: {
            Authorization: `token ${process.env.GITHUB_TOKEN}`,
        },
    });

    const data = await res.json();

    return NextResponse.json(data);
}