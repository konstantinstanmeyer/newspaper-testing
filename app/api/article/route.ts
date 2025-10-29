import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";
import { getNprArticles } from "@/lib/nprClient";

// Helper to clean text
function cleanText(str: string) {
  return str
    .replace(/\\+/g, "")          // remove backslashes
    .replace(/\s+/g, " ")         // collapse whitespace
    .replace(/\n+/g, " ")         // remove newlines
    .trim();
}

export async function GET(req: NextRequest) {
    try {
        const options = {}
        const articles = await getNprArticles(options);
        return NextResponse.json(articles);
    } catch (err: any) {
        return NextResponse.json(
            { error: "bad" },
            { status: 404 }
        )
    }
}