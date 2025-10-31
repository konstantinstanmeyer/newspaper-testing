import { NextRequest, NextResponse } from "next/server";
import { fetchGdeltStories } from "@/lib/gdeltClient";
import type { GdeltQueryOptions } from "@/lib/types/types";


// GET /api/gdelt
// ex: /api/gdelt?country=US&theme=technology&count=25

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const country = url.searchParams.get("country") ?? undefined;
    const theme = url.searchParams.get("theme") ?? undefined;
    const count = url.searchParams.get("count") ? Number(url.searchParams.get("count")) : undefined;
    const timespan = url.searchParams.get("timespan") ?? undefined;

    console.log("hello")

    const searchBy: GdeltQueryOptions = { 
      ...(country !== undefined && { country: country }),
      ...(theme !== undefined && { theme: theme }),
      ...(count !== undefined && { count: count }),
      ...(timespan !== undefined && { timespan: timespan }),
    };
    const stories = await fetchGdeltStories(searchBy);

    return NextResponse.json({ stories });
  } catch (err) {
    console.error("GDELT API error:", err);
    return NextResponse.json({ error: (err as Error).message ?? "Unknown error" }, { status: 500 });
  }
}