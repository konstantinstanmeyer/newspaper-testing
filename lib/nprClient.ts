import * as cheerio from 'cheerio';

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

export async function getNprArticle({}: Options){
    try {
        const url = "https://www.npr.org/2025/10/28/nx-s1-5589180/trump-tariffs-senate-vote";
    
        const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
        if (!res.ok) throw new Error(`Failed to fetch NPR page: ${res.status}`);
    
        const html = await res.text();
        const $ = cheerio.load(html);
    
        const title = $("meta[property='og:title']").attr("content") || $("h1").first().text();
        const publication = "NPR";
        const date = $("meta[name='date']").attr("content") || $("time").attr("datetime") || "";
        const image = $("meta[property='og:image']").attr("content") || "";

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
            content.push(p);
          }
        });
    
        const storyData = {
          title: cleanText(title),
          date,
          author,
          publication,
          image,
          url,
          paragraphCount: content.length,
          content,
        };
    
        // console.log(storyData)
    
        return storyData;
      } catch (err: any) {
        return { error: err.message || "Error fetching or parsing NPR story" }
      }
}