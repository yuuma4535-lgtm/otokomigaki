import type { ResultTypeId } from "@/types/diagnosis";

export type TypeVisualMeta = {
  id: ResultTypeId;
  /** ヘッダー近くに出す短いキャッチ */
  catchphrase: string;
  /** メインアクセント（黒背景で映える上品な色） */
  accent: string;
  /** 柔らかいハイライト */
  accentSoft: string;
  /** グロー用 rgba */
  accentGlow: string;
  /** 象徴シンボル画像 */
  symbolSrc: string;
  /** アクセシビリティ用の短い説明 */
  symbolAlt: string;
};

/** タイプ画像の公開ディレクトリ（`public/images/types/`） */
export const TYPE_IMAGES_DIR = "/images/types";

/** 画像未配置時の共通プレースホルダー */
export const DEFAULT_TYPE_SYMBOL = `${TYPE_IMAGES_DIR}/_default.svg`;

/** 装飾枠（WebP） */
export const EMBLEM_FRAME_SRC = `${TYPE_IMAGES_DIR}/emblem-frame.webp`;

/** タイプID → エンブレム画像パス（軽量 WebP） */
export function getTypePngSrc(typeId: ResultTypeId): string {
  return `${TYPE_IMAGES_DIR}/${typeId}.webp`;
}

/** タイプID → 線画 SVG（暫定フォールバック） */
export function getTypeSvgSrc(typeId: ResultTypeId): string {
  return `${TYPE_IMAGES_DIR}/${typeId}.svg`;
}

/**
 * 16タイプのビジュアルメタデータ。
 * 中央アイコンは `{typeId}.webp` を優先読み込み（なければ SVG / _default）。
 */
export const TYPE_VISUALS: Record<ResultTypeId, TypeVisualMeta> = {
  supreme: {
    id: "supreme",
    catchphrase: "頂点は、次の誰かを照らすために在る。",
    accent: "#e2c56a",
    accentSoft: "#f0dc9a",
    accentGlow: "rgba(226, 197, 106, 0.42)",
    symbolSrc: getTypePngSrc("supreme"),
    symbolAlt: "至高を象徴する冠",
  },
  prototype: {
    id: "prototype",
    catchphrase: "原石の輝きは、最初の一手から始まる。",
    accent: "#a85d6c",
    accentSoft: "#c48a96",
    accentGlow: "rgba(168, 93, 108, 0.4)",
    symbolSrc: getTypePngSrc("prototype"),
    symbolAlt: "原石を象徴する結晶",
  },
  steel_embodiment: {
    id: "steel_embodiment",
    catchphrase: "身体が語る説得力。鋼の存在。",
    accent: "#c5c8ce",
    accentSoft: "#e4e6ea",
    accentGlow: "rgba(197, 200, 206, 0.35)",
    symbolSrc: getTypePngSrc("steel_embodiment"),
    symbolAlt: "鋼を象徴する盾",
  },
  pioneering_frontier: {
    id: "pioneering_frontier",
    catchphrase: "未踏へ踏み出す、動ける知性。",
    accent: "#c9a45a",
    accentSoft: "#e0c48a",
    accentGlow: "rgba(201, 164, 90, 0.38)",
    symbolSrc: getTypePngSrc("pioneering_frontier"),
    symbolAlt: "開拓を象徴する羅針盤",
  },
  refined_warrior: {
    id: "refined_warrior",
    catchphrase: "洗練の刃に、肉体の根拠を。",
    accent: "#d4b56a",
    accentSoft: "#e8d29a",
    accentGlow: "rgba(212, 181, 106, 0.38)",
    symbolSrc: getTypePngSrc("refined_warrior"),
    symbolAlt: "戦士を象徴する刃",
  },
  solitary_aesthetic: {
    id: "solitary_aesthetic",
    catchphrase: "孤高の美意識を、日々の型で守る。",
    accent: "#d2c2a4",
    accentSoft: "#ebe0cc",
    accentGlow: "rgba(210, 194, 164, 0.36)",
    symbolSrc: getTypePngSrc("solitary_aesthetic"),
    symbolAlt: "美学を象徴する月",
  },
  flawless_routiner: {
    id: "flawless_routiner",
    catchphrase: "崩さない設計が、成果を連れてくる。",
    accent: "#b8a878",
    accentSoft: "#d4c8a0",
    accentGlow: "rgba(184, 168, 120, 0.36)",
    symbolSrc: getTypePngSrc("flawless_routiner"),
    symbolAlt: "規律を象徴する六角形",
  },
  silent_strategist: {
    id: "silent_strategist",
    catchphrase: "静かに整え、静かに勝つ。",
    accent: "#b0aea8",
    accentSoft: "#d2d0ca",
    accentGlow: "rgba(176, 174, 168, 0.34)",
    symbolSrc: getTypePngSrc("silent_strategist"),
    symbolAlt: "戦略を象徴する円環",
  },
  evolution_seeker: {
    id: "evolution_seeker",
    catchphrase: "考えながら、進化し続ける。",
    accent: "#c9a04c",
    accentSoft: "#e0c07a",
    accentGlow: "rgba(201, 160, 76, 0.38)",
    symbolSrc: getTypePngSrc("evolution_seeker"),
    symbolAlt: "進化を象徴する螺旋",
  },
  intellectual_builder: {
    id: "intellectual_builder",
    catchphrase: "思想と型で、人生を組み立てる。",
    accent: "#b4a890",
    accentSoft: "#d2c8b0",
    accentGlow: "rgba(180, 168, 144, 0.36)",
    symbolSrc: getTypePngSrc("intellectual_builder"),
    symbolAlt: "構築を象徴する柱",
  },
  unyielding_hardworker: {
    id: "unyielding_hardworker",
    catchphrase: "止まらない努力が、結果を呼ぶ。",
    accent: "#a89878",
    accentSoft: "#c8ba9a",
    accentGlow: "rgba(168, 152, 120, 0.36)",
    symbolSrc: getTypePngSrc("unyielding_hardworker"),
    symbolAlt: "不屈を象徴する山",
  },
  charismatic_innovator: {
    id: "charismatic_innovator",
    catchphrase: "感性と思想で、人を動かす。",
    accent: "#c9a090",
    accentSoft: "#e0c4b8",
    accentGlow: "rgba(201, 160, 144, 0.38)",
    symbolSrc: getTypePngSrc("charismatic_innovator"),
    symbolAlt: "革新を象徴する火花",
  },
  ironclad_logical: {
    id: "ironclad_logical",
    catchphrase: "論理と型で、崩れない。",
    accent: "#9aa4b0",
    accentSoft: "#c0c8d0",
    accentGlow: "rgba(154, 164, 176, 0.36)",
    symbolSrc: getTypePngSrc("ironclad_logical"),
    symbolAlt: "論理を象徴する格子",
  },
  refined_philosopher: {
    id: "refined_philosopher",
    catchphrase: "言葉と装いに、品を宿す。",
    accent: "#b8943d",
    accentSoft: "#d4b56a",
    accentGlow: "rgba(184, 148, 61, 0.4)",
    symbolSrc: getTypePngSrc("refined_philosopher"),
    symbolAlt: "哲学を象徴する書",
  },
  passionate_artist: {
    id: "passionate_artist",
    catchphrase: "身体に宿る情熱を、表現へ。",
    accent: "#c47a5a",
    accentSoft: "#e0a488",
    accentGlow: "rgba(196, 122, 90, 0.4)",
    symbolSrc: getTypePngSrc("passionate_artist"),
    symbolAlt: "情熱を象徴する炎",
  },
  disciplined_tank: {
    id: "disciplined_tank",
    catchphrase: "規律の推進力で、押し切る。",
    accent: "#a89070",
    accentSoft: "#c8b498",
    accentGlow: "rgba(168, 144, 112, 0.36)",
    symbolSrc: getTypePngSrc("disciplined_tank"),
    symbolAlt: "重戦車を象徴する紋章",
  },
};

export function getTypeVisual(typeId: ResultTypeId): TypeVisualMeta {
  return TYPE_VISUALS[typeId] ?? TYPE_VISUALS.intellectual_builder;
}
