import { Container, SectionHeading } from "@/components/ui";
import { UploadCard } from "@/components/content/UploadCard";
import type { ContentItem } from "@/lib/types";

export function FanFavorites({ items }: { items: ContentItem[] }) {
  const favorites = items
    .filter((item) => item.type === "video")
    .sort((a, b) => b.viewCount - a.viewCount)
    .slice(0, 12);

  if (favorites.length === 0) {
    return (
      <section className="pb-[var(--space-section)]">
        <Container size="wide">
          <SectionHeading>Fan Favorites</SectionHeading>
          <div className="rounded-xl border border-dashed border-[var(--line)] p-8 text-center">
            <p className="text-sm text-[var(--text-dim)]">
              No favorite videos yet. Ingestion will populate top videos by views.
            </p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="pb-[var(--space-section)]">
      <Container size="wide">
        <SectionHeading>Fan Favorites</SectionHeading>
        <div className="flex gap-4 overflow-x-auto pb-2" style={{ scrollSnapType: "x proximity", overscrollBehaviorX: "contain" }}>
          {favorites.map((item) => (
            <UploadCard key={item.videoId} item={item} />
          ))}
        </div>
      </Container>
    </section>
  );
}
