import { getGdeltArticles } from "@/lib/gdeltClient";
import mongoDBConnection from "@/lib/mongodb/connection";
import DailyArticle from "@/lib/mongodb/models/DailyArticle";
import { getNprArticle } from "@/lib/nprClient";
import { NextResponse } from "next/server";

const DAILY_ARTICLES_GDELT_URL = "domain:npr.org%20AND%20sourcelang:english%20AND%20sourcecountry:US&mode=artlist&format=json&timespan=1d&maxrecords=100"

export async function GET(){
    try {
        // check the database to see if daily-articles array is length < 0 or the articles are older than 5AM EST (same-day as request)
        // if we pass both tests then we return the array of valid articles from the day of
        await mongoDBConnection();
        const existingArticles = await DailyArticle.find({});

        // temporary if statement for before the database is populated
        if (existingArticles.length > 0) return NextResponse.json({ articles: existingArticles }, { status: 200 });

        // if we do not pass the previous test we must implement gdelt and webscrape the returned webpages
        // first we fetch the array of article urls we'd like to use with gdelt

        // this is the testing default for npr stories within the last 24hrs, pooled from a list of 100 articles, all published in the US and in English
        const links = await getGdeltArticles({});

        // after we have the array of urls, we can pass them into different handlers, of which only the npr.org scraper is fully functional
        // we get the array of formatted stories as a javascript variable, which will then get iterated over on the front-end

        const options = {};
        const articles = await getNprArticle(options, links);

        return NextResponse.json({ articles: articles }, { status: 500 })
    } catch (err) {
        return NextResponse.json({ error: "error"}, { status: 500 })
    }
}