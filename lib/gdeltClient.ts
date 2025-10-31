
import { GdeltStory, GdeltQueryOptions, GdeltResponse } from "@/lib/types/types";

// DOC API endpoint for article-list / full-text search
const GDELT_DOC_BASE = "https://api.gdeltproject.org/api/v2/doc/doc";

/**
 * Build a DOC API URL with filters like country, theme, count, timespan
 */
function buildGdeltDocUrl(options: GdeltQueryOptions): string {
  const queryParts: string[] = [];

  if (options?.theme) {
    queryParts.push(`theme:${options.theme}`);
  }
  if (options?.country) {
    queryParts.push(`sourcecountry:${options.country}`);
  }

  // Build the query manually (do not encode colon)
  const query = queryParts.length ? queryParts.join(" AND ") : "";

  let url = `${GDELT_DOC_BASE}?query=${query}&mode=artlist&format=json`;

  if (options?.count) {
    url += `&maxrecords=${options.count}`;
  }

  url += `&timespan=${options?.timespan ?? "1d"}`;

  console.log(url);
  return url;
}

/**
 * Normalize raw DOC API article list into our story shape
 */
function normalizeGdeltDocData(raw: { articles: Array<GdeltStory>}): GdeltStory[] {
  if (!raw?.articles) {
    return [];
  }
  return raw.articles.map((a: GdeltStory) => ({
    title: a.title,
    url: a.url,
    sourcecountry: a.sourcecountry,
    language: a.language,
    date: a.seendate ?? a.date ?? "",
    themes: a.themes ? (a.themes).split(";").filter(t => !!t) : [],
  }));
}

/**
 * Fetch stories via GDELT DOC API
 */
export async function fetchGdeltStories(
  options: GdeltQueryOptions
): Promise<GdeltStory[]> {
  const url = buildGdeltDocUrl(options);
  const resp = await fetch(url);
  if (!resp.ok) {
    throw new Error(`GDELT DOC API request failed: ${resp.status} ${resp.statusText}`);
  }
  const data = await resp.json()
  return normalizeGdeltDocData(data);
}