import type { ResultTypeId } from "@/types/diagnosis";

export type OgTheme = {
  bgStart: string;
  bgEnd: string;
  accent: string;
  accentSoft: string;
  radarFill: string;
  radarStroke: string;
  gridStroke: string;
  textPrimary: string;
  textMuted: string;
  /** 背景テクスチャ */
  pattern: "luxury" | "rugged" | "ember" | "steel" | "velvet" | "slate" | "crimson";
};

const SUPREME: OgTheme = {
  bgStart: "#1a1408",
  bgEnd: "#3d2e0f",
  accent: "#e8c96a",
  accentSoft: "#f5e6b8",
  radarFill: "rgba(232, 201, 106, 0.35)",
  radarStroke: "#e8c96a",
  gridStroke: "rgba(232, 201, 106, 0.22)",
  textPrimary: "#faf6eb",
  textMuted: "#c9b87a",
  pattern: "luxury",
};

const PROTOTYPE: OgTheme = {
  bgStart: "#0a0a0a",
  bgEnd: "#1c1c1c",
  accent: "#8a857c",
  accentSoft: "#c9c3b8",
  radarFill: "rgba(138, 133, 124, 0.25)",
  radarStroke: "#6b6660",
  gridStroke: "rgba(255, 255, 255, 0.08)",
  textPrimary: "#e8e4dc",
  textMuted: "#7a756c",
  pattern: "rugged",
};

/** Rank B：タイプごとにアクセントを変える */
const RANK_B_THEMES: Record<
  Exclude<ResultTypeId, "supreme" | "prototype">,
  OgTheme
> = {
  steel_embodiment: {
    bgStart: "#12141a",
    bgEnd: "#252a35",
    accent: "#9eb4d4",
    accentSoft: "#c8d8ef",
    radarFill: "rgba(158, 180, 212, 0.3)",
    radarStroke: "#9eb4d4",
    gridStroke: "rgba(158, 180, 212, 0.2)",
    textPrimary: "#eef2f8",
    textMuted: "#8a9ab0",
    pattern: "steel",
  },
  pioneering_frontier: {
    bgStart: "#140f1a",
    bgEnd: "#2a1f3d",
    accent: "#c49bff",
    accentSoft: "#e0c8ff",
    radarFill: "rgba(196, 155, 255, 0.28)",
    radarStroke: "#c49bff",
    gridStroke: "rgba(196, 155, 255, 0.18)",
    textPrimary: "#f5f0ff",
    textMuted: "#a894c4",
    pattern: "velvet",
  },
  refined_warrior: {
    bgStart: "#1a1214",
    bgEnd: "#3d1f28",
    accent: "#d46a7a",
    accentSoft: "#f0b8c0",
    radarFill: "rgba(212, 106, 122, 0.32)",
    radarStroke: "#d46a7a",
    gridStroke: "rgba(212, 106, 122, 0.2)",
    textPrimary: "#faf0f2",
    textMuted: "#b88a94",
    pattern: "crimson",
  },
  solitary_aesthetic: {
    bgStart: "#0f1218",
    bgEnd: "#1e2430",
    accent: "#7eb8d4",
    accentSoft: "#b8dce8",
    radarFill: "rgba(126, 184, 212, 0.28)",
    radarStroke: "#7eb8d4",
    gridStroke: "rgba(126, 184, 212, 0.18)",
    textPrimary: "#eef6fa",
    textMuted: "#7a98a8",
    pattern: "slate",
  },
  flawless_routiner: {
    bgStart: "#101410",
    bgEnd: "#1f2a1f",
    accent: "#7ec47e",
    accentSoft: "#b8e0b8",
    radarFill: "rgba(126, 196, 126, 0.28)",
    radarStroke: "#7ec47e",
    gridStroke: "rgba(126, 196, 126, 0.18)",
    textPrimary: "#f0faf0",
    textMuted: "#7a9a7a",
    pattern: "steel",
  },
  silent_strategist: {
    bgStart: "#101218",
    bgEnd: "#1c2030",
    accent: "#8898c8",
    accentSoft: "#b8c4e8",
    radarFill: "rgba(136, 152, 200, 0.28)",
    radarStroke: "#8898c8",
    gridStroke: "rgba(136, 152, 200, 0.18)",
    textPrimary: "#eef0f8",
    textMuted: "#7888a8",
    pattern: "slate",
  },
  evolution_seeker: {
    bgStart: "#14101a",
    bgEnd: "#281f38",
    accent: "#b894e8",
    accentSoft: "#dcc8f8",
    radarFill: "rgba(184, 148, 232, 0.28)",
    radarStroke: "#b894e8",
    gridStroke: "rgba(184, 148, 232, 0.18)",
    textPrimary: "#f5f0ff",
    textMuted: "#9888b8",
    pattern: "velvet",
  },
  intellectual_builder: {
    bgStart: "#10141a",
    bgEnd: "#1a2430",
    accent: "#6ab0d4",
    accentSoft: "#a8d4f0",
    radarFill: "rgba(106, 176, 212, 0.28)",
    radarStroke: "#6ab0d4",
    gridStroke: "rgba(106, 176, 212, 0.18)",
    textPrimary: "#eef6fa",
    textMuted: "#6890a8",
    pattern: "slate",
  },
  unyielding_hardworker: {
    bgStart: "#181410",
    bgEnd: "#302418",
    accent: "#d4a04a",
    accentSoft: "#f0d090",
    radarFill: "rgba(212, 160, 74, 0.3)",
    radarStroke: "#d4a04a",
    gridStroke: "rgba(212, 160, 74, 0.2)",
    textPrimary: "#faf6ee",
    textMuted: "#a89068",
    pattern: "ember",
  },
  charismatic_innovator: {
    bgStart: "#1a1018",
    bgEnd: "#381828",
    accent: "#e87898",
    accentSoft: "#f8b8c8",
    radarFill: "rgba(232, 120, 152, 0.3)",
    radarStroke: "#e87898",
    gridStroke: "rgba(232, 120, 152, 0.2)",
    textPrimary: "#fff0f4",
    textMuted: "#b88898",
    pattern: "crimson",
  },
  ironclad_logical: {
    bgStart: "#0e1014",
    bgEnd: "#1c2028",
    accent: "#7888a0",
    accentSoft: "#a8b4c8",
    radarFill: "rgba(120, 136, 160, 0.28)",
    radarStroke: "#7888a0",
    gridStroke: "rgba(120, 136, 160, 0.18)",
    textPrimary: "#eceef4",
    textMuted: "#687888",
    pattern: "steel",
  },
  refined_philosopher: {
    bgStart: "#12101a",
    bgEnd: "#241e30",
    accent: "#a894d4",
    accentSoft: "#d4c8f0",
    radarFill: "rgba(168, 148, 212, 0.28)",
    radarStroke: "#a894d4",
    gridStroke: "rgba(168, 148, 212, 0.18)",
    textPrimary: "#f4f0fa",
    textMuted: "#9088a8",
    pattern: "velvet",
  },
  passionate_artist: {
    bgStart: "#1a100c",
    bgEnd: "#382018",
    accent: "#e88858",
    accentSoft: "#f8c8a8",
    radarFill: "rgba(232, 136, 88, 0.3)",
    radarStroke: "#e88858",
    gridStroke: "rgba(232, 136, 88, 0.2)",
    textPrimary: "#faf4ee",
    textMuted: "#b89878",
    pattern: "ember",
  },
  disciplined_tank: {
    bgStart: "#101210",
    bgEnd: "#242820",
    accent: "#88a878",
    accentSoft: "#b8d0a8",
    radarFill: "rgba(136, 168, 120, 0.28)",
    radarStroke: "#88a878",
    gridStroke: "rgba(136, 168, 120, 0.18)",
    textPrimary: "#f0f4ee",
    textMuted: "#788870",
    pattern: "steel",
  },
};

export function getOgTheme(typeId: ResultTypeId): OgTheme {
  if (typeId === "supreme") return SUPREME;
  if (typeId === "prototype") return PROTOTYPE;
  return RANK_B_THEMES[typeId];
}
