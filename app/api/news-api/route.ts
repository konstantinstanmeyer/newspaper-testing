import { NextRequest, NextResponse } from 'next/server'
import { fetchTopHeadlines } from '@/lib/FetchNews'
import type { TopStory } from '@/lib/types/types'

const NEWS_API_KEY = process.env.NEWS_API_KEY;

if (!NEWS_API_KEY) {
    throw new Error('Missing NEWS_API_KEY environment variable')
}

export async function GET(
  req: NextRequest
): Promise<NextResponse> {
  try {
    // later handling to allow for filters
    const url = new URL(req.url);
    const country = url.searchParams.get('country') ?? 'us'
    const category = url.searchParams.get('category') ?? 'general'
    const pageSize = Number(url.searchParams.get('pageSize') ?? 10)

    const stories: TopStory[] = await fetchTopHeadlines(
      NEWS_API_KEY as string,
      { country, category, pageSize }
    );

    return NextResponse.json({ stories })
  } catch (error: any) {
    console.error('Error fetching news:', error)
    return NextResponse.json(
      { error: error.message ?? 'Unknown error' },
      { status: 500 }
    );
  }
}