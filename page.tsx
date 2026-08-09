import { getChannelStats, getTimelineItems, getFanFavorites } from "@/lib/data";
import { LiveStatsSync } from "@/components/data/LiveStatsSync";
import { Hero } from "@/components/hero/Hero";
import { MilestoneJourney } from "@/components/milestone/MilestoneJourney";
import { ContentTimeline } from "@/components/timeline/ContentTimeline";
import { StatsRow } from "@/components/stats/StatsRow";
import { RecentUploads } from "@/components/content/RecentUploads";
import { FanFavorites } from "@/components/content/FanFavorites";
import { MILESTONE_CONFIG, nextMilestone } from "@/lib/milestones";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [stats, timelineItems, fanItems] = await Promise.all([
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
      <ContentTimeline items={timelineItems} />
      <RecentUploads items={timelineItems} />
      <FanFavorites items={fanItems} />
      <p className="sr-only">Tracking {MILESTONE_CONFIG.chapterStart.toLocaleString()} to {MILESTONE_CONFIG.chapterGoal.toLocaleString()}</p>
    </main>
  );
}
