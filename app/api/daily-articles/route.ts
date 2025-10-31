import { NextResponse } from "next/server";

export async function GET(){
    // check the database to see if daily-articles array is length < 0 or the articles are older than 5AM EST (same-day as request)
    // if we pass both tests then we return the array of valid articles from the day of


    // if we do not pass the previous test we must implement gdelt and webscrape the returned webpages
    // first we fetch the array of article urls we'd like to use with gdelt


    // after we have the array of urls, we can pass them into different handlers, of which only the npr.org scraper is fully functional
    // we get the array of formatted stories as a javascript variable, which will then get iterated over on the front-end

    try {

    } catch (err) {
        return NextResponse.json({ error: "error"}, { status: 500 })
    }
}