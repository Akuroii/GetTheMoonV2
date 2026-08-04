import { getChannelStats, getTimelineItems, getFanFavorites } from "@/lib/data";
...
export default async function HomePage() {
  const [stats, timelineItems, fanFavorites] = await Promise.all([
    getChannelStats(),
    getTimelineItems(),
    getFanFavorites(),
  ]);

  return (
    <main>
      <LiveStatsSync initialStats={stats} />
      <Hero initialStats={stats} />
      <MilestoneJourney initialStats={stats} />
      <StatsRow totalViews={stats.totalViews} contentCount={timelineItems.length} nextMilestone={nextMilestone(stats.subscriberCount)} />
      <SocialLinks />
      <ContentTimeline items={timelineItems} />
      <RecentUploads items={timelineItems} />
      <FanFavorites items={fanFavorites} />
      ...
    </main>
  );
}
