import type { Metadata } from "next";
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
  searchParams: Promise<{ type?: string | string[] }>;
};

export async function generateMetadata({
  searchParams,
}: ResultPageProps): Promise<Metadata> {
  const params = await searchParams;
  const typeId = parseResultTypeId(params.type);
  const origin = getSiteOrigin();

  if (!typeId) {
    const title = "診断結果 | 男磨き診断";
    const description = DEFAULT_OG_DESCRIPTION;
    const pageUrl = `${origin}/result`;
    const images = getCommonOgImages(origin);
    return {
      metadataBase: new URL(origin),
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
        images,
      },
      twitter: {
        card: "summary_large_image",
        title: "男磨き診断",
        description,
        images: [toAbsoluteUrl(OGP_IMAGE_PATH, origin)],
      },
    };
  }

  const typeName = getTypeNameForShare(typeId);
  const title = `『${typeName}』| 男磨き診断`;
  const description = getOgDescriptionForType(typeId);
  const pageUrl = buildShareResultUrl(origin, typeId);
  const images = getTypeOgImages(typeId, origin);
  const imageUrl = toAbsoluteUrl(getTypeOgImagePath(typeId), origin);

  return {
    metadataBase: new URL(origin),
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
  return <ResultView />;
}
