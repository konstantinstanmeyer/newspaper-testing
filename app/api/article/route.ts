import { NextRequest, NextResponse } from "next/server";
import { getNprArticle } from "@/lib/nprClient";

export async function GET(req: NextRequest) {
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
        console.log("aosidjhasd")
        console.log(articles)
        return NextResponse.json(articles);
    } catch (err) {
        return NextResponse.json(
            { error: "bad" },
            { status: 404 }
        )
    }
}