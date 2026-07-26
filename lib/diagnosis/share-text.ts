import {
  buildShareResultUrl,
  buildTypeShareMessage,
  getOgDescriptionForType,
  getTypeNameForShare,
} from "@/lib/diagnosis/share-og";
import type { DiagnosisResult } from "@/types/diagnosis";

/** Web Share API 用テキスト（タイプ固有の紹介文） */
export function buildShareText(
  result: Pick<DiagnosisResult, "typeId" | "typeName">,
  siteOrigin: string,
): string {
  const shareUrl = buildShareResultUrl(siteOrigin, result.typeId);
  return buildTypeShareMessage(result.typeId, shareUrl);
}

/** クリップボードコピー用テキスト */
export function buildResultCopyText(
  result: Pick<
    DiagnosisResult,
    "typeId" | "typeName" | "strengthAxis" | "growthAxis"
  >,
  siteOrigin: string,
): string {
  const shareUrl = buildShareResultUrl(siteOrigin, result.typeId);
  const typeName = result.typeName || getTypeNameForShare(result.typeId);
  return `診断結果：${typeName}
強み：${result.strengthAxis.axisName}
改善点：${result.growthAxis.axisName}

${getOgDescriptionForType(result.typeId)}

診断はこちら: ${shareUrl}
#男磨き診断`;
}
