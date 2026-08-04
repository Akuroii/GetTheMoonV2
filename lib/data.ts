import { sql } from "./db";
import { MILESTONE_CONFIG } from "./milestones";
import type { ChannelStats, ContentItem } from "./types";

export async function getChannelStats(): Promise<ChannelStats> {
  const rows = await sql`select * from channel_stats where id = 1`;
  const row = rows[0];

  if (!row) {
    return {
      subscriberCount: MILESTONE_CONFIG.chapterStart,
      totalViews: 0,
      videoCount: 0,
      avatarUrlYoutube: null,
      updatedAt: new Date().toISOString(),
    };
  }

  return {
    subscriberCount: Number(row.subscriber_count),
    totalViews: Number(row.total_views), // FIX: was string from bigint
    videoCount: Number(row.video_count),
    avatarUrlYoutube: row.avatar_url_youtube,
    updatedAt: row.updated_at?.toISOString ? row.updated_at.toISOString() : String(row.updated_at),
  };
}

// For timeline + recent uploads (since 100K)
export async function getTimelineItems(): Promise<ContentItem[]> {
  const rows = await sql`
    select * from content_items
    where published_at >= ${MILESTONE_CONFIG.chapterStartDate}
    order by published_at desc
    limit 100
  `;
  return rows.map((r) => ({
    videoId: r.video_id,
    type: r.type,
    title: r.title,
    thumbnailUrl: r.thumbnail_url,
    publishedAt: r.published_at?.toISOString ? r.published_at.toISOString() : String(r.published_at),
    viewCount: Number(r.view_count),
    durationSeconds: r.duration_seconds != null ? Number(r.duration_seconds) : null,
    url: r.url,
  }));
}

// For fan favorites (all-time top videos, no date filter)
export async function getFanFavorites(): Promise<ContentItem[]> {
  const rows = await sql`
    select * from content_items
    where type = 'video'
    order by view_count desc
    limit 12
  `;
  return rows.map((r) => ({
    videoId: r.video_id,
    type: r.type,
    title: r.title,
    thumbnailUrl: r.thumbnail_url,
    publishedAt: r.published_at?.toISOString ? r.published_at.toISOString() : String(r.published_at),
    viewCount: Number(r.view_count),
    durationSeconds: r.duration_seconds != null ? Number(r.duration_seconds) : null,
    url: r.url,
  }));
}

// Keep backward compat
export const getContentItems = getTimelineItems;
