import { PLATFORM_LINKS } from "./platforms";

// Reuses the same URLs already defined in platforms.ts as the single
// source of truth — if a link ever changes there, it stays correct here
// automatically, rather than becoming a second place to remember to update.
function urlFor(label: string): string {
  return PLATFORM_LINKS.find((p) => p.label === label)?.url ?? "#";
}

export type CloseCircleIcon = "gmail" | "facebook" | "discord" | "youtube-main" | "youtube-en" | "tiktok";

export type CloseCirclePerson = {
  kind: "person";
  key: string;
  name: string;
  title: string;
  /** Real photo, once provided. Falls back to an initial-letter placeholder until then. */
  photoSrc?: string;
};

export type CloseCircleLink = {
  kind: "link";
  key: string;
  label: string;
  href: string;
  icon: CloseCircleIcon;
};

export type CloseCircleEntry = CloseCirclePerson | CloseCircleLink;

// Titles marked "placeholder" below are unconfirmed as of when this was
// written — swap the text, the label stays the same either way.
export const CLOSE_CIRCLE: CloseCircleEntry[] = [
  { kind: "person", key: "aqua", name: "aqua", title: "The Eternal Friend" },
  { kind: "person", key: "amal", name: "amal", title: "The F Eternal Friend" },
  { kind: "person", key: "akuroii", name: "Akuroii", title: "Technical Director" },
  { kind: "person", key: "snow", name: "Snow", title: "The Assistant" },
  { kind: "person", key: "shadow", name: "Shadow", title: "The Assistant" },
  { kind: "person", key: "getthemoon", name: "GetTheMoon", title: "Rem Lover" }, // placeholder, per "maybe"
  { kind: "link", key: "gmail", label: "Email", href: "mailto:ahmedalaa201573.aa@gmail.com", icon: "gmail" },
  { kind: "link", key: "facebook", label: "Facebook", href: urlFor("Facebook"), icon: "facebook" },
  { kind: "link", key: "discord", label: "Discord", href: urlFor("Discord"), icon: "discord" },
  { kind: "link", key: "youtube-main", label: "YouTube", href: urlFor("Main Channel"), icon: "youtube-main" },
  { kind: "link", key: "youtube-en", label: "YouTube EN", href: urlFor("EN Channel"), icon: "youtube-en" },
  { kind: "link", key: "tiktok", label: "TikTok", href: urlFor("TikTok"), icon: "tiktok" },
];
