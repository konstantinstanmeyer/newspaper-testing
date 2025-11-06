import * as cheerio from 'cheerio';
import { NPRStory } from './types/types';

interface Options {
    theme?: string;
    domain?: string;
    timespan?: string;
    sourceLang?: string;
    sourceCountry?: string;
}

function cleanText(str: string) {
  return str
    .replace(/\\+/g, "")  // removes backslashes
    .replace(/\s+/g, " ") // collapses whitespace
    .replace(/\n+/g, " ") // removes newlines
    .trim();
}

export async function getNprArticle({}: Options, articleList: Array<string>){
  const storiesPromises = articleList.map(async (url) => {
    try {
      // const url = "https://www.npr.org/2025/10/28/nx-s1-5589180/trump-tariffs-senate-vote";
      const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
      if (!res.ok) throw new Error(`Failed to fetch NPR page: ${res.status}`);
  
      const html = await res.text();
      const $ = cheerio.load(html);
  
      const title = $("meta[property='og:title']").attr("content") || $("h1").first().text();
      const publication = "NPR";
      const date = $("meta[name='date']").attr("content") || $("time").attr("datetime") || "";
      let image = $("meta[property='og:image']").attr("content") || "";

      // check if stock image is being use
      if (image.includes("https://media.npr.org/include/images/facebook-default")) image = "";
      const imageAlt = $("meta[property='og:image:alt']").attr("content") || "";

      console.log(imageAlt)

      const authors = Array.from(
        new Set(
          $('[data-testid="byline-name"], .byline__name, [rel="author"]')
            .map((_, el) => cleanText($(el).text()))
            .get()
            .filter(Boolean)
        )
      );
      const author = authors.join(", ");
  
      // getting all of the article's paragraphs
      const article = $("article").first();
      const content: string[] = [];
      
      article.find("p").each((_, el) => {
        const p = cleanText($(el).text());
        // ai generated mumbo jumbo but it works, kinda...
        if (
          p &&
          p.length > 1 &&                        // skip empty or single-char paragraphs
          !/^by\b/i.test(p) &&                   // skip bylines
          !/hide caption/i.test(p) &&            // skip captions
          !/getty images/i.test(p) &&            // skip photo credits
          !authors.includes(p)                   // skip author lines
        ) {
          content.push(p.replace(/\s*:.*/, "")); // remove everything from the first colon onward, "\s*:" skips any possible spaces before the colon as well
        }
      });
      
      return {
        title: cleanText(title),
        date,
        author,
        publication,
        image,
        url,
        paragraphCount: content.length,
        content,
        imageAlt
      };
    } catch (err) {
      console.error(`Error fetching/parsing ${url}:`, err);
      return null;
    }
  })  

  const storiesList = (await Promise.all(storiesPromises)).filter(Boolean);
  return storiesList;
}

export async function fetchArticles(): Promise<NPRStory[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/daily-articles`, {
      // ensure this fetch is server-side only
      cache: "no-store",
    });

    if (!res.ok) {
      console.warn("API returned non-OK status:", res.status);
      return [];
    }

    const data = await res.json();

    return data.articles;
  } catch (err) {
    console.error("Failed to fetch NPR articles:", err);
    return [];
  }
}