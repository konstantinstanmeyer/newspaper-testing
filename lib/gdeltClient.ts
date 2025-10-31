import { NextResponse } from "next/server";

interface Filters {
    publication?: string;
}

const FORMAT_STRING = "mode=artlist&format=json"
const STANDARD_RESPONSE = "timespan=1d&maxrecords=100"

const regexNPR = /^https:\/\/www\.npr\.org\/2025\//;

export async function getGdeltArticles(filters: Filters){
    // fix this later to not default to npr and instead to default to any publications (not actually any but from our pool of scrapable sites, any)
    const publication = "domain:npr.org";

    console.log("pre try")
    try {
        const res = await fetch(process.env.GDELT_BASE_URL + "sourcelang:english%20AND%20sourcecountry:US" + (publication ? `%20AND%20${publication}` : "") + "&" + FORMAT_STRING + "&" + STANDARD_RESPONSE);
        const data = await res.json();
        const length = data.articles.length;

        const links: string[] = [];
        let count = 0;
        let i = 0;
        while(count < 10 && i < length){
            console.log("looping!")
            if(regexNPR.test(data.articles[i]?.url)) {
                links.push(data.articles[i]?.url)
                count++
            }
            i++
        }

        return links;
    } catch(err){
        return [];
    }
}