import { NextResponse } from "next/server";
import { getNprArticle } from "@/lib/nprClient";
import mongoDBConnection from "@/lib/mongodb/connection";

export async function GET() {
    await mongoDBConnection();

    const urls = [
        "https://www.npr.org/2025/10/29/nx-s1-5585292/word-of-week-neurodivergent", 
        "https://www.npr.org/sections/goats-and-soda/2025/10/30/g-s1-95543/halloween-trick-or-treat-candy-unicef-heidi-klum",
        "https://www.npr.org/2025/10/30/g-s1-95725/trump-testing-nuclear-weapons",
        "https://www.npr.org/2023/03/20/1163988915/tye-tribbett-tiny-desk-concert",
        "https://www.npr.org/transcripts/nx-s1-5564025"
    ]

    try {
        const options = {}
        const articles = await getNprArticle(options, urls);
        return NextResponse.json(articles);
    } catch (err) {
        return NextResponse.json(
            { error: (err as Error).message },
            { status: 404 }
        )
    }
}