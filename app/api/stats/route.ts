...
  const stats: ChannelStats = {
    subscriberCount: Number(row.subscriber_count),
    totalViews: Number(row.total_views),
    videoCount: Number(row.video_count),
    avatarUrlYoutube: row.avatar_url_youtube,
    updatedAt: row.updated_at?.toISOString ? row.updated_at.toISOString() : String(row.updated_at),
  };
...
