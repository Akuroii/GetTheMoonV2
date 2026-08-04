import { Container, SectionHeading } from "@/components/ui";
import { UploadCard } from "@/components/content/UploadCard";
import type { ContentItem } from "@/lib/types";

export function RecentUploads({ items }: { items: ContentItem[] }) {
  const recent = [...items]
    .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt))
    .slice(0, 12);

  if (recent.length === 0) {
    return (
      <section className="pb-[var(--space-section)]">
        <Container size="wide">
          <SectionHeading>Recent Uploads</SectionHeading>
          <div className="rounded-xl border border-dashed border-[var(--line)] p-8 text-center">
            <p className="text-sm text-[var(--text-dim)]">
              No videos yet since the 100K milestone. Run ingestion to populate.
            </p>
            <p className="mt-2 font-[var(--font-data)] text-xs text-[var(--text-dim)]">
              POST /api/ingest with Authorization: Bearer &lt;INGEST_SECRET&gt;
            </p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="pb-[var(--space-section)]">
      <Container size="wide">
        <SectionHeading>Recent Uploads</SectionHeading>
        <div className="flex gap-4 overflow-x-auto pb-2" style={{ scrollSnapType: "x proximity", overscrollBehaviorX: "contain" }}>
          {recent.map((item) => (
            <UploadCard key={item.videoId} item={item} />
          ))}
        </div>
      </Container>
    </section>
  );
}
