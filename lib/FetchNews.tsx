// /lib/newsClient.ts

import { NewsApiResponse, TopStory, NewsApiArticle } from './types/types';

const NEWS_API_BASE = 'https://newsapi.org/v2';
const TOP_HEADLINES_ENDPOINT = '/top-headlines';

export async function fetchTopHeadlines(
  apiKey: string,
  options?: {
    country?: string;
    category?: string;
    pageSize?: number;
    page?: number;
  }
): Promise<TopStory[]> {
  const params = new URLSearchParams({
    apiKey,
    country: options?.country ?? 'us',
    category: options?.category ?? 'general',
    pageSize: String(options?.pageSize ?? 10),
    page: String(options?.page ?? 1),
  });

  const url = `${NEWS_API_BASE}${TOP_HEADLINES_ENDPOINT}?${params.toString()}`;
  const resp = await fetch(url);

  if (!resp.ok) {
    throw new Error(`NewsAPI request failed: ${resp.status} ${resp.statusText}`);
  }

  const data: NewsApiResponse = await resp.json();

  if (data.status !== 'ok') {
    const errMsg = data.message ?? 'Unknown error from NewsAPI';
    throw new Error(`NewsAPI returned error: ${errMsg}`);
  }

  const stories: TopStory[] = data.articles.map((a: NewsApiArticle) => ({
    sourceName: a.source.name,
    author: a.author,
    title: a.title,
    description: a.description,
    url: a.url,
    urlToImage: a.urlToImage,
    publishedAt: a.publishedAt,
    content: a.content,
  }));

  return stories;
}