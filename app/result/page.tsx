import type { Metadata } from "next";
import { ResultView } from "@/components/result/ResultView";
import {
  DEFAULT_OG_DESCRIPTION,
  getCommonOgImages,
  getOgDescriptionForType,
  getTypeNameForShare,
  OGP_IMAGE_PATH,
  parseResultTypeId,
} from "@/lib/diagnosis/share-og";

type ResultPageProps = {
  searchParams: Promise<{ type?: string | string[] }>;
};

export async function generateMetadata({
  searchParams,
}: ResultPageProps): Promise<Metadata> {
  const params = await searchParams;
  const typeId = parseResultTypeId(params.type);
  const images = getCommonOgImages();

  if (!typeId) {
    const title = "診断結果 | 男磨き診断";
    const description = DEFAULT_OG_DESCRIPTION;
    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images,
        type: "website",
        siteName: "男磨き診断",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [OGP_IMAGE_PATH],
      },
    };
  }

  const typeName = getTypeNameForShare(typeId);
  const title = `『${typeName}』| 男磨き診断`;
  const description = getOgDescriptionForType(typeId);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images,
      type: "website",
      siteName: "男磨き診断",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OGP_IMAGE_PATH],
    },
  };
}

export default function ResultPage() {
  return <ResultView />;
}
