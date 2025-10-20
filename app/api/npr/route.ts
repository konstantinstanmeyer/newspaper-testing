import { NextResponse } from "next/server";
import Parser from "rss-parser";
import * as cheerio from "cheerio"

export async function GET(){
    try {
        return NextResponse.json({ message: "hello world"})
    } catch(e){
        return NextResponse.json(
            { error: "failed to fetch data" },
            { status: 500 }
        )
    }
}