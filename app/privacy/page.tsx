import type { Metadata } from "next";
import {
  LegalPageShell,
  LegalSection,
} from "@/components/legal/LegalPageShell";

export const metadata: Metadata = {
  title: "プライバシーポリシー | 男磨き診断",
  description: "男磨き診断（Otokomigaki）のプライバシーポリシーです。",
};

export default function PrivacyPage() {
  return (
    <LegalPageShell title="プライバシーポリシー" updatedAt="2026年7月26日">
      <LegalSection title="1. 基本方針">
        <p>
          男磨き診断（以下「本サービス」）は、利用者のプライバシーを尊重し、個人情報の保護に努めます。本ポリシーは、本サービスにおける情報の取り扱い方針を説明するものです。
        </p>
      </LegalSection>

      <LegalSection title="2. 取得する情報">
        <p>本サービスでは、主に次の情報を取り扱うことがあります。</p>
        <ul className="list-disc space-y-2 pl-5 text-muted">
          <li>
            診断への回答内容（ブラウザ内の一時保存など。通常、サーバーへ個人を特定する形で保存することを目的としません）
          </li>
          <li>
            アクセス情報（閲覧ページ、参照元、端末・ブラウザの種類、おおよその地域など）
          </li>
          <li>Cookie または類似技術により取得される利用状況データ</li>
        </ul>
      </LegalSection>

      <LegalSection title="3. 利用目的">
        <p>取得した情報は、以下の目的で利用します。</p>
        <ul className="list-disc space-y-2 pl-5 text-muted">
          <li>診断結果の表示およびサービス提供</li>
          <li>サイト改善、不具合調査、表示最適化</li>
          <li>利用状況の把握（アクセス解析）</li>
          <li>不正利用の防止およびセキュリティ確保</li>
        </ul>
      </LegalSection>

      <LegalSection title="4. アクセス解析ツールについて">
        <p>
          本サービスでは、利用状況の把握とサービス改善のため、Vercel Analytics
          等のアクセス解析ツールを使用する場合があります。これらのツールは、Cookie
          や類似技術を用いて、個人を直接特定しない形で閲覧データを収集することがあります。
        </p>
        <p>
          解析ツールの詳細は、各提供元のプライバシーポリシーをご確認ください。ブラウザ設定により
          Cookie を無効化できる場合がありますが、一部機能に影響が出ることがあります。
        </p>
      </LegalSection>

      <LegalSection title="5. 第三者提供">
        <p>
          法令に基づく場合、またはサービス運営上必要な業務委託先への提供を除き、利用者の同意なく個人を特定できる情報を第三者へ提供することはありません。
        </p>
      </LegalSection>

      <LegalSection title="6. 外部リンク">
        <p>
          本サービスから外部サイトへ移動した場合、当該サイトのプライバシー方針が適用されます。移動先サイトでの情報取り扱いについて、本サービス運営者は責任を負いません。
        </p>
      </LegalSection>

      <LegalSection title="7. データの保管">
        <p>
          診断回答などは、端末のセッションストレージ等に一時的に保存される場合があります。ブラウザのデータを削除すると、これらの情報も消去されることがあります。
        </p>
      </LegalSection>

      <LegalSection title="8. ポリシーの変更">
        <p>
          本ポリシーは必要に応じて改定します。重要な変更がある場合は、本ページへの掲載をもってお知らせします。
        </p>
      </LegalSection>

      <LegalSection title="9. お問い合わせ">
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
