import { getTypePngSrc, getTypeVisual } from "@/lib/diagnosis/type-visuals";
import { RELATIVE_TYPES } from "@/lib/diagnosis/relative-types";
import type { ResultTypeId } from "@/types/diagnosis";

/** サイト共通 OGP（タイプ未指定時） */
export const OGP_IMAGE_PATH = "/ogp.png";
export const OGP_IMAGE_ALT = "男磨き診断";
export const OGP_IMAGE_WIDTH = 1024;
export const OGP_IMAGE_HEIGHT = 538;

/** タイプ別エンブレム OGP の表示サイズ（実ファイルに合わせる） */
export const TYPE_OGP_IMAGE_WIDTH = 960;
export const TYPE_OGP_IMAGE_HEIGHT = 524;

const DEFAULT_SITE_URL = "http://localhost:3000";

/** metadataBase / 絶対URL用 */
export function getSiteOrigin(): string {
  const fromEnv =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "");
  return (fromEnv || DEFAULT_SITE_URL).replace(/\/$/, "");
}

const SPECIAL_TYPE_NAMES: Record<"supreme" | "prototype", string> = {
  supreme: "至高の支配者",
  prototype: "原石のプロトタイプ",
};

/** タイプ別・SNS向け紹介文（og:description / シェア本文の核） */
const TYPE_SHARE_DESCRIPTIONS: Record<ResultTypeId, string> = {
  supreme:
    "四軸すべてが頂点に達した稀有な存在。男磨きの極致『至高の支配者』——その現在地を、あなたも測ってみませんか。",
  prototype:
    "すべてが始まる原石段階。完璧は不要、一歩が景色を変える『原石のプロトタイプ』。今夜の一手から、輝きは始まります。",
  steel_embodiment:
    "身体そのものが説得力になる『鋼の体現者』。見た目と習慣が支える、隙のないフィジカルの象徴です。",
  pioneering_frontier:
    "動ける知性で未知を切り拓く『開拓する先駆者』。挑戦の先頭に立つ男の、現在地がここにあります。",
  refined_warrior:
    "洗練の刃に肉体の根拠が伴う『洗練された戦士』。美意識と強度が同居する、静かな強さです。",
  solitary_aesthetic:
    "美意識を日々の型で守り抜く『孤高の美学主義者』。選ばれた少数のための、孤高の現在地です。",
  flawless_routiner:
    "崩さない生活設計が武器の『無欠のルーティナー』。継続が成果を連れてくる、静かな王道です。",
  silent_strategist:
    "静かに整え、静かに勝つ『静寂の戦略家』。表に出さない強みが、勝機を設計します。",
  evolution_seeker:
    "考えながら進化し続ける『進化の探求者』。学びが行動に落ちる、知的な成長エンジンです。",
  intellectual_builder:
    "思想と型で人生を組み立てる『知的な構築者』。設計力こそが、男磨きの骨格になります。",
  unyielding_hardworker:
    "止まらない努力で結果を出す『不屈のハードワーカー』。量と継続が、景色を変える証明です。",
  charismatic_innovator:
    "感性と思想で人を動かす『カリスマ・イノベーター』。魅力が伝播する、発信力の頂点です。",
  ironclad_logical:
    "論理と型で崩れない『鉄壁のロジカルマン』。冷静な設計が、あらゆる局面を支えます。",
  refined_philosopher:
    "言葉と装いに品を宿す『洗練された哲学士』。知性と美意識が、静かな威厳をつくります。",
  passionate_artist:
    "身体に宿る情熱を表現へつなぐ『情熱のアーティスト』。熱量が、存在そのものを語ります。",
  disciplined_tank:
    "止まらず押し切る『規律の重戦車』。推進力と型が、結果までを一気に運びます。",
};

const ALL_TYPE_IDS = Object.keys(TYPE_SHARE_DESCRIPTIONS) as ResultTypeId[];

export function isResultTypeId(value: unknown): value is ResultTypeId {
  return typeof value === "string" && ALL_TYPE_IDS.includes(value as ResultTypeId);
}

export function parseResultTypeId(
  value: string | string[] | undefined,
): ResultTypeId | null {
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw) return null;
  return isResultTypeId(raw) ? raw : null;
}

export function getTypeNameForShare(typeId: ResultTypeId): string {
  if (typeId === "supreme" || typeId === "prototype") {
    return SPECIAL_TYPE_NAMES[typeId];
  }
  return RELATIVE_TYPES[typeId]?.typeName ?? typeId;
}

/** リンクプレビュー用の紹介文 */
export function getOgDescriptionForType(typeId: ResultTypeId): string {
  return TYPE_SHARE_DESCRIPTIONS[typeId];
}

/** デフォルト（タイプ未指定）の説明文 */
export const DEFAULT_OG_DESCRIPTION =
  "独自の分析アルゴリズムによる16タイプ診断。全70問の深層分析で、男磨きの現在地と次の一手を明らかにします。";

export function buildShareResultUrl(origin: string, typeId: ResultTypeId): string {
  const base = origin.replace(/\/$/, "");
  return `${base}/result?type=${encodeURIComponent(typeId)}`;
}

/** Web Share 用本文（URLは navigator.share の url に任せ、重複を避ける） */
export function buildTypeShareMessage(typeId: ResultTypeId): string {
  const typeName = getTypeNameForShare(typeId);
  const catchphrase = getTypeVisual(typeId).catchphrase;
  const pitch = getOgDescriptionForType(typeId);
  return `私の男磨きタイプは『${typeName}』でした。\n${catchphrase}\n\n${pitch}\n#男磨き診断`;
}

/** openGraph / twitter 用の共通画像設定 */
export function getCommonOgImages() {
  return [
    {
      url: OGP_IMAGE_PATH,
      width: OGP_IMAGE_WIDTH,
      height: OGP_IMAGE_HEIGHT,
      alt: OGP_IMAGE_ALT,
    },
  ];
}

/** タイプ別エンブレムを og:image に使う */
export function getTypeOgImages(typeId: ResultTypeId) {
  const typeName = getTypeNameForShare(typeId);
  return [
    {
      url: getTypePngSrc(typeId),
      width: TYPE_OGP_IMAGE_WIDTH,
      height: TYPE_OGP_IMAGE_HEIGHT,
      alt: `男磨き診断『${typeName}』`,
    },
  ];
}
