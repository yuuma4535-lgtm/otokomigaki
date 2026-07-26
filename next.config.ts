import type { NextConfig } from "next";

/**
 * スマホ実機から LAN IP で dev にアクセスすると、
 * Next.js 16 は _next/* をブロックする（hydration 不能 → ボタン無反応・文字非表示）。
 * プライベート IP 帯を広く許可する。
 *
 * 追加: ALLOWED_DEV_ORIGINS=hostname,other-ip
 */
const extraDevOrigins =
  process.env.ALLOWED_DEV_ORIGINS?.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean) ?? [];

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    // 現在の実機アクセス（ログに出ていたホスト）
    "172.20.10.7",
    "172.20.10.*",
    // 一般的なプライベート網
    "192.168.*.*",
    "192.168.*",
    "10.*.*.*",
    "172.*.*.*",
    ...extraDevOrigins,
  ],
};

export default nextConfig;
