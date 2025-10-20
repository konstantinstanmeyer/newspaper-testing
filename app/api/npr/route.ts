import { NextResponse } from "next/server";
import Parser from "rss-parser";
import * as cheerio from "cheerio"

type FeedItem = {
    title: string;
    description: string;
    link: string;
    published: string;
    author: string;
    image: string;
};

// breaking news section
const RSS_URL = "https://feeds.npr.org/1001/rss.xml"

// hot-fix for image extraction bug **** FIX
function extractFirstImage(htmlContent: string): string {
    const $ = cheerio.load(htmlContent);
    const imgSrc = $("img").first().attr("src");
    return imgSrc || "N/A";
}

export async function GET(){
    try {
        const parser = new Parser();
        const feed = await parser.parseURL(RSS_URL);

        const data: FeedItem[] = feed.items.map((entry) => {
            // current functional fields needed for basic synopses
            const contentHtml = (entry["content:encoded"] as string) || entry.content || entry.summary || "";

            return {
                title: entry.title || "N/A",
                description: entry.contentSnippet || "N/A",
                link: entry.link || "N/A",
                published: entry.pubDate || "N/A",
                author: entry.creator || entry.author || "N/A",
                image: extractFirstImage(contentHtml),
            };
        });

        // returning the first 10 results from the breaking news section
        const top10 = data.slice(0, 10);

        return NextResponse.json(top10, { status: 200 });
    } catch(e){
        return NextResponse.json(
            { error: "failed to fetch data" },
            { status: 500 }
        )
    }
}