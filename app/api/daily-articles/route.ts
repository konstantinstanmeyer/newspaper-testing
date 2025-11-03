import { getGdeltArticles } from "@/lib/gdeltClient";
import mongoDBConnection from "@/lib/mongodb/connection";
import DailyArticle from "@/lib/mongodb/models/DailyArticle";
import { getNprArticle } from "@/lib/nprClient";
import { NextResponse } from "next/server";

const DAILY_ARTICLES_GDELT_URL = "domain:npr.org%20AND%20sourcelang:english%20AND%20sourcecountry:US&mode=artlist&format=json&timespan=1d&maxrecords=100"

// Optional delay to slow down inserts
function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// add the logic to send text styling constants here, and randomise them along with the images, separately, then append them to each article's object, only on the frontend


export async function GET(){
    await mongoDBConnection();
    
    try {
        // check the database to see if daily-articles array is length < 0 or the articles are older than 5AM EST (same-day as request)
        // if we pass both tests then we return the array of valid articles from the day of
        const existingArticles = await DailyArticle.find({});

        console.log("first check")
        console.log(existingArticles)

        // temporary if statement for before the database is populated
        if (existingArticles.length > 0){
            console.log("skipped steps!!")
            return NextResponse.json({ articles: existingArticles }, { status: 200 })
        };

        // if we do not pass the previous test we must implement gdelt and webscrape the returned webpages
        // first we fetch the array of article urls we'd like to use with gdelt

        // this is the testing default for npr stories within the last 24hrs, pooled from a list of 100 articles, all published in the US and in English
        const links = await getGdeltArticles({});
        if (!links.length) {
            console.warn("no GDELT links returned");
            return NextResponse.json({ articles: [] }, { status: 200 });
        }

        // after we have the array of urls, we can pass them into different handlers, of which only the npr.org scraper is fully functional
        // we get the array of formatted stories as a javascript variable, which will then get iterated over on the front-end

        const options = {};
        const articles = await getNprArticle(options, links);

        const validatedArticles = articles.filter((article) => 
            article?.url && 
            article.title && 
            article.publication && 
            article.date && 
            Array.isArray(article.content) && article.content.length > 0
            );

        if (validatedArticles.length > 0) {
            // const savedArticles = [];
            // for (const article of articles) {
            // try {
            //     const doc = new DailyArticle(article);
            //     const saved = await doc.save();
            //     savedArticles.push(saved);
            //     console.log(`Saved article: ${saved.title}`);
            //     await delay(50); // optional small delay to avoid overloading DB
            // } catch (err) {
            //     console.error("Failed to save article:", article?.title, err);
            // }
            // }
            const saved = await DailyArticle.insertMany(validatedArticles, { ordered: false });
            return NextResponse.json({ articles: saved }, { status: 200 })
        }
    } catch (err) {
        console.log("error reached")
        return NextResponse.json({ error: "error"}, { status: 500 })
    }
}
