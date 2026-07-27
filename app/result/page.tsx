import type { Metadata } from "next";
import { Suspense } from "react";
import { ResultView } from "@/components/result/ResultView";
import {
  buildShareResultUrl,
  DEFAULT_OG_DESCRIPTION,
  getCommonOgImages,
  getOgDescriptionForType,
  getSiteOrigin,
  getTypeNameForShare,
  getTypeOgImagePath,
  getTypeOgImages,
  OGP_IMAGE_PATH,
  parseResultTypeId,
  toAbsoluteUrl,
} from "@/lib/diagnosis/share-og";

type ResultPageProps = {
  searchParams: Promise<{ type?: string | string[]; debug?: string | string[] }>;
};

/** クエリ（type / debug）を確実に扱う */
export const dynamic = "force-dynamic";

export async function generateMetadata({
  searchParams,
}: ResultPageProps): Promise<Metadata> {
  const params = await searchParams;
  const typeId = parseResultTypeId(params.type);
  const origin = getSiteOrigin();
  const metadataBase = new URL(`${origin}/`);

  if (!typeId) {
    const title = "診断結果 | 男磨き診断";
    const description = DEFAULT_OG_DESCRIPTION;
    const pageUrl = `${origin}/result`;
    const imageUrl = toAbsoluteUrl(OGP_IMAGE_PATH, origin);
    return {
      metadataBase,
      title,
      description,
      alternates: { canonical: pageUrl },
      openGraph: {
        title: "男磨き診断",
        description,
        url: pageUrl,
        siteName: "男磨き診断",
        locale: "ja_JP",
        type: "website",
        images: getCommonOgImages(origin),
      },
      twitter: {
        card: "summary_large_image",
        title: "男磨き診断",
        description,
        images: [imageUrl],
      },
    };
  }

  const typeName = getTypeNameForShare(typeId);
  const title = `『${typeName}』| 男磨き診断`;
  const description = getOgDescriptionForType(typeId);
  const pageUrl = buildShareResultUrl(origin, typeId);
  const imagePath = getTypeOgImagePath(typeId);
  const imageUrl = toAbsoluteUrl(imagePath, origin);
  const images = getTypeOgImages(typeId, origin);

  return {
    metadataBase,
    title,
    description,
    alternates: { canonical: pageUrl },
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: "男磨き診断",
      locale: "ja_JP",
      type: "website",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default function ResultPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-dvh items-center justify-center bg-void text-muted">
          読み込み中…
        </div>
      }
    >
      <ResultView />
    </Suspense>
  );
}
