import { NextResponse } from "next/server";
import Parser from "rss-parser";
import * as cheerio from "cheerio"
import { FeedItem } from "@/types/types";

// breaking news section
const RSS_URL = "https://feeds.npr.org/1001/rss.xml"

// hot-fix for image extraction bug **** FIX
function extractFirstImage(htmlContent: string): string {
    const $ = cheerio.load(htmlContent);
    const imgSrc = $("img").first().attr("src");
    return imgSrc || "N/A";
}

async function fetchMetadataFromPage(url: string) {
    try {
        const res = await fetch(url);
        const html = await res.text();
        const $ = cheerio.load(html);

        const meta = {
            title: $('meta[property="og:title"]').attr("content") || $("title").text() || "N/A",
            description:
            $('meta[property="og:description"]').attr("content") ||
            $('meta[name="description"]').attr("content") ||
            "N/A",
            image: $('meta[property="og:image"]').attr("content") || "N/A",
        };

        return meta;
    } catch (e) {
        console.error("Failed to fetch metadata", e);
        return null;
    }
}

export async function GET(){
    console.log("hello");
    try {
        const parser = new Parser();
        const feed = await parser.parseURL(RSS_URL);

        const data: FeedItem[] = await Promise.all(feed.items.map(async (entry) => {
            console.log(entry);
            // current functional fields needed for basic synopses
            const contentHtml = (entry["content:encoded"] as string) || entry.content || entry.summary || "";
            const meta = await fetchMetadataFromPage(entry.link || "");

            return {
                title: entry.title || "N/A",
                description: meta?.description || entry.contentSnippet || "N/A",
                link: entry.link || "N/A",
                published: entry.pubDate || "N/A",
                author: entry.creator || entry.author || "N/A",
                image: meta?.image || extractFirstImage(contentHtml),
            };
        }));

        // returning the first 10 results from the breaking news section
        const topTen = data.slice(0, 10);

        return NextResponse.json(topTen, { status: 200 });
    } catch(e){
        return NextResponse.json(
            { error: "failed to fetch data" },
            { status: 500 }
        )
    }
}