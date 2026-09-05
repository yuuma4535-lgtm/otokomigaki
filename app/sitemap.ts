import type { MetadataRoute } from "next";

const BASE_URL = "https://otokomigaki-delta.vercel.app";

/** 静的ページ一覧 */
const ROUTES = [
  { path: "/", changeFrequency: "weekly" as const, priority: 1 },
  { path: "/diagnose", changeFrequency: "monthly" as const, priority: 0.9 },
  { path: "/result", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/terms", changeFrequency: "yearly" as const, priority: 0.3 },
  { path: "/privacy", changeFrequency: "yearly" as const, priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: `${BASE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
