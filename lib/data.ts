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
    totalViews: Number(row.total_views),
    videoCount: Number(row.video_count),
    avatarUrlYoutube: row.avatar_url_youtube,
    updatedAt: row.updated_at ? new Date(row.updated_at).toISOString() : new Date().toISOString(),
  };
}

export async function getTimelineItems(): Promise<ContentItem[]> {
  const rows = await sql`
    select * from content_items
    where published_at >= ${MILESTONE_CONFIG.chapterStartDate}
    order by published_at desc
    limit 100
  `;

  return rows.map((r) => ({
    videoId: String(r.video_id),
    type: r.type,
    title: String(r.title),
    thumbnailUrl: String(r.thumbnail_url),
    publishedAt: r.published_at ? new Date(r.published_at).toISOString() : new Date().toISOString(),
    viewCount: Number(r.view_count ?? 0),
    durationSeconds: r.duration_seconds != null ? Number(r.duration_seconds) : null,
    url: String(r.url),
  }));
}

export async function getFanFavorites(): Promise<ContentItem[]> {
  const rows = await sql`
    select * from content_items
    where type = 'video'
    order by view_count desc
    limit 12
  `;

  return rows.map((r) => ({
    videoId: String(r.video_id),
    type: r.type,
    title: String(r.title),
    thumbnailUrl: String(r.thumbnail_url),
    publishedAt: r.published_at ? new Date(r.published_at).toISOString() : new Date().toISOString(),
    viewCount: Number(r.view_count ?? 0),
    durationSeconds: r.duration_seconds != null ? Number(r.duration_seconds) : null,
    url: String(r.url),
  }));
}

// Keep old name working
export const getContentItems = getTimelineItems;
