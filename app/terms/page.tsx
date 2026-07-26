import type { Metadata } from "next";
import {
  LegalPageShell,
  LegalSection,
} from "@/components/legal/LegalPageShell";

export const metadata: Metadata = {
  title: "利用規約 | 男磨き診断",
  description: "男磨き診断（Otokomigaki）の利用規約です。",
};

export default function TermsPage() {
  return (
    <LegalPageShell title="利用規約" updatedAt="2026年7月26日">
      <LegalSection title="1. はじめに">
        <p>
          本利用規約（以下「本規約」）は、男磨き診断（以下「本サービス」）の利用条件を定めるものです。本サービスをご利用いただくことで、本規約に同意したものとみなします。
        </p>
      </LegalSection>

      <LegalSection title="2. サービスの性質">
        <p>
          本サービスは、自己理解やエンタメを目的とした診断コンテンツです。医学的・心理学的・職業的な専門診断、または特定の結果を保証するものではありません。
        </p>
        <p>
          診断結果は回答内容に基づく参考情報であり、人生・健康・対人関係・投資等に関する助言として扱うものではありません。
        </p>
      </LegalSection>

      <LegalSection title="3. 免責事項">
        <p>
          本サービスの利用、または診断結果の解釈・利用により生じた損害・不利益について、運営者は法令上許容される範囲で一切の責任を負いません。
        </p>
        <p>
          通信環境、端末、ブラウザの状態により、表示や機能が正常に動作しない場合があります。また、事前の通知なく内容・仕様を変更、または提供を中断・終了することがあります。
        </p>
      </LegalSection>

      <LegalSection title="4. 禁止事項">
        <p>利用者は、以下の行為を行ってはなりません。</p>
        <ul className="list-disc space-y-2 pl-5 text-muted">
          <li>本サービスの運営を妨害する行為</li>
          <li>不正アクセス、改ざん、過度な負荷をかける行為</li>
          <li>本サービスの内容を無断で複製・再配布・商用転用する行為</li>
          <li>法令または公序良俗に反する行為</li>
        </ul>
      </LegalSection>

      <LegalSection title="5. 知的財産権">
        <p>
          本サービスに関する文章、デザイン、画像、ロゴ、診断ロジック、タイプ名称その他のコンテンツに関する権利は、運営者または正当な権利者に帰属します。私的利用の範囲を超える無断利用を禁じます。
        </p>
      </LegalSection>

      <LegalSection title="6. 外部サービスへのリンク">
        <p>
          本サービスは、外部サイト（例：専門家相談サービス等）へのリンクを含む場合があります。リンク先の内容・取引・トラブルについて、本サービス運営者は責任を負いません。
        </p>
      </LegalSection>

      <LegalSection title="7. 規約の変更">
        <p>
          本規約は必要に応じて改定することがあります。改定後の規約は、本ページに掲載した時点から効力を生じます。
        </p>
      </LegalSection>

      <LegalSection title="8. お問い合わせ">
        <p>
          本サービスに関するお問い合わせは、X（
          <a
            href="https://x.com/o5xsw"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold transition-colors hover:text-gold-soft"
          >
            @o5xsw
          </a>
          ）のDMまでご連絡ください。
        </p>
      </LegalSection>
    </LegalPageShell>
  );
}
