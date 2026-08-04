import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import type { ContentItem } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET() {
  const rows = await sql`
    select * from content_items
    where type = 'video'
    order by view_count desc
    limit 12
  `;

  const items: ContentItem[] = rows.map((r) => ({
    videoId: String(r.video_id),
    type: r.type,
    title: String(r.title),
    thumbnailUrl: String(r.thumbnail_url),
    publishedAt: r.published_at ? new Date(r.published_at).toISOString() : new Date().toISOString(),
    viewCount: Number(r.view_count ?? 0),
    durationSeconds: r.duration_seconds != null ? Number(r.duration_seconds) : null,
    url: String(r.url),
  }));

  return NextResponse.json(items, {
    headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=120" },
  });
}
