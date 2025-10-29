
import { GdeltStory, GdeltQueryOptions } from "@/lib/types/types";

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
function normalizeGdeltDocData(raw: any): GdeltStory[] {
  if (!raw?.articles) {
    return [];
  }
  return raw.articles.map((a: any) => ({
    title: a.title,
    url: a.url,
    sourceCountry: a.sourcecountry ?? null,
    language: a.language ?? null,
    date: a.seendate ?? a.date ?? "",
    themes: a.themes ? (a.themes as string).split(";").filter(t => !!t) : [],
    tone: a.tone ? parseFloat(a.tone) : null,
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
  const test = await resp.json();
  console.log(test)
  if (!resp.ok) {
    throw new Error(`GDELT DOC API request failed: ${resp.status} ${resp.statusText}`);
  }
  const data = resp
  return normalizeGdeltDocData(data);
}