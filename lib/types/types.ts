export type FeedItem = {
  title: string;
  description: string;
  link: string;
  published: string;
  author: string;
  image: string | undefined;
}

export interface TopStory {
  sourceName: string;
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export interface NewsApiArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export interface NewsApiResponse {
  status: 'ok' | 'error';
  totalResults: number;
  articles: NewsApiArticle[];
  code?: string;
  message?: string;
}

export interface GdeltQueryOptions {
  country?: string;   // country code, i.e. US or IDN (united states or indonesia)
  theme?: string; // keyword for kind of story
  count?: number; // # of results
   timespan?: string;
}

export interface GdeltStory {
  title: string;
  url: string;
  sourceCountry: string | null;
  language: string | null;
  date: string;
  themes: string[];
  tone: number | null;
}