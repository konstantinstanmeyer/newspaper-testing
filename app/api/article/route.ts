import { NextRequest, NextResponse } from "next/server";
import { getNprArticle } from "@/lib/nprClient";

export async function GET(req: NextRequest) {
    try {
        const options = {}
        const articles = await getNprArticle(options);
        return NextResponse.json(articles);
    } catch (err: any) {
        return NextResponse.json(
            { error: "bad" },
            { status: 404 }
        )
    }
}