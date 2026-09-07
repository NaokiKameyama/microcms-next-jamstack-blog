import React from "react";
import Link from "next/link";
import Seo from "../components/Seo";
import site from "../lib/site";
import s from "../styles/LegalPage.module.scss";

const UPDATED = "2026年9月7日";

// 外部送信される情報の一覧（改正電気通信事業法の外部送信規律に沿った記載）
const EXTERNAL = [
  {
    name: "Google アナリティクス（Google LLC）",
    purpose: "アクセス解析（閲覧数、流入元、閲覧環境の把握）",
    data: "Cookie により発行される識別子、閲覧したページ、参照元、ブラウザ・端末・OS の種類、IP アドレスを含む接続情報",
    link: "https://policies.google.com/technologies/partner-sites?hl=ja",
  },
  {
    name: "Google AdSense（Google LLC）",
    purpose: "広告の配信と効果測定",
    data: "Cookie や広告識別子、閲覧したページ、ブラウザ・端末の種類、IP アドレスを含む接続情報",
    link: "https://policies.google.com/technologies/ads?hl=ja",
  },
  {
    name: "Amazon アソシエイト（アマゾンジャパン合同会社）",
    purpose: "アフィリエイトリンク経由の売上計測",
    data: "リンクをクリックした際の識別子、参照元、ブラウザ・端末の種類",
    link: "https://www.amazon.co.jp/gp/help/customer/display.html?nodeId=GX7NJQ4ZB8MHPW8N",
  },
  {
    name: "Google フォーム（Google LLC）",
    purpose: "お問い合わせの受付",
    data: "フォームに入力された内容（氏名、メールアドレス、お問い合わせ内容）",
    link: "https://policies.google.com/privacy?hl=ja",
  },
];

const PrivacyPolicy: React.FC = () => {
  return (
    <>
      <Seo
        title="プライバシーポリシー・免責事項"
        description="あつかんブログの運営者情報、取得する情報と利用目的、アクセス解析（Google アナリティクス）、広告（Google AdSense）、アフィリエイト（Amazon アソシエイト）、外部送信される情報、免責事項についてまとめています。"
        path="/privacyPolicy"
        breadcrumbs={[{ name: "ホーム", path: "/" }, { name: "プライバシーポリシー・免責事項", path: "/privacyPolicy" }]}
      />
      <div className={s["page"]}>
        <h1>プライバシーポリシー・免責事項</h1>
        <p>
          {site.name}（以下「当サイト」）は、訪問者の個人情報や閲覧に関する情報の取扱いについて、以下のとおり定めます。
        </p>

        <h2>1. 運営者とお問い合わせ窓口</h2>
        <p>
          当サイトは {site.author.name} が個人で運営しています。運営者の経歴は
          <Link href="/profile"><a>プロフィール</a></Link>
          をご覧ください。当サイトに関するお問い合わせは
          <Link href="/contact"><a>お問い合わせフォーム</a></Link>
          からお願いします。
        </p>

        <h2>2. 取得する情報と利用目的</h2>
        <p>当サイトが取得する情報は次の 2 種類です。会員登録や決済の機能はなく、住所・電話番号・口座情報などを求めることはありません。</p>
        <ul>
          <li>
            <strong>お問い合わせフォームに入力された情報</strong>（氏名、メールアドレス、お問い合わせ内容）：お問い合わせへの回答のためにのみ利用し、本人の同意なく第三者に提供しません。
          </li>
          <li>
            <strong>閲覧時に自動的に取得される情報</strong>（Cookie、閲覧したページ、参照元、ブラウザや端末の種類、IP アドレスなど）：アクセス解析と広告の配信のために、下記の外部サービスを通じて取得します。個人を特定する目的では利用しません。
          </li>
        </ul>

        <h2>3. アクセス解析ツールについて</h2>
        <p>
          当サイトは、Google LLC が提供するアクセス解析ツール「Google アナリティクス」を利用しています。Google アナリティクスはトラフィックデータの収集のために Cookie を使用します。このデータは匿名で収集されており、個人を特定するものではありません。
        </p>
        <p>
          Cookie を無効にすることで収集を拒否できます。お使いのブラウザの設定をご確認ください。また、
          <a href="https://tools.google.com/dlpage/gaoptout?hl=ja" target="_blank" rel="noreferrer">Google アナリティクス オプトアウト アドオン</a>
          を利用すると、Google アナリティクスによる情報収集を停止できます。詳しくは
          <a href="https://policies.google.com/technologies/partner-sites?hl=ja" target="_blank" rel="noreferrer">Google のポリシーと規約</a>
          をご覧ください。
        </p>

        <h2>4. 広告の配信について</h2>
        <p>
          当サイトは、第三者配信の広告サービス「Google AdSense」を利用しています。Google などの第三者配信事業者は、訪問者の興味に応じた広告を表示するために Cookie を使用し、当サイトや他のサイトへの過去のアクセス情報に基づいて広告を配信することがあります。
        </p>
        <p>
          パーソナライズ広告は
          <a href="https://adssettings.google.com/authenticated?hl=ja" target="_blank" rel="noreferrer">Google の広告設定</a>
          で無効にできます。また、
          <a href="https://www.aboutads.info/choices/" target="_blank" rel="noreferrer">www.aboutads.info</a>
          にアクセスすれば、第三者配信事業者の Cookie の使用を無効にできます。Google の広告における Cookie の取扱いの詳細は、
          <a href="https://policies.google.com/technologies/ads?hl=ja" target="_blank" rel="noreferrer">Google のポリシーと規約</a>
          をご覧ください。
        </p>

        <h2>5. アフィリエイトプログラムについて</h2>
        <p>
          当サイトは、Amazon アソシエイト・プログラムをはじめとするアフィリエイトプログラムに参加しており、記事内に商品やサービスの紹介リンクを含むことがあります。
          <strong>Amazon のアソシエイトとして、{site.name}は適格販売により収入を得ています。</strong>
        </p>
        <p>
          アフィリエイトリンクを含む記事には、記事の冒頭に「アフィリエイト広告（PR）が含まれます」と表示しています。リンク経由で商品を購入されても、価格が変わることはありません。紹介する商品やサービスは、運営者が実際に使用または調査したうえで選んでいます。
        </p>

        <h2>6. 外部に送信される情報の一覧</h2>
        <p>当サイトの閲覧にあたり、次の外部サービスに情報が送信されます。</p>
        <div className={s["table-wrap"]}>
          <table>
            <thead>
              <tr>
                <th>送信先</th>
                <th>利用目的</th>
                <th>送信される情報</th>
                <th>詳細</th>
              </tr>
            </thead>
            <tbody>
              {EXTERNAL.map((e) => (
                <tr key={e.name}>
                  <td>{e.name}</td>
                  <td>{e.purpose}</td>
                  <td>{e.data}</td>
                  <td>
                    <a href={e.link} target="_blank" rel="noreferrer">ポリシー</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>7. 免責事項</h2>
        <ul>
          <li>当サイトの記事は、運営者が執筆時点で確認した情報と個人の見解に基づいています。正確性・完全性・最新性を保証するものではなく、内容は予告なく変更・削除することがあります。</li>
          <li>当サイトの情報を利用したことによって生じた損害について、運営者は一切の責任を負いません。特に、資産運用や金融に関する記事は運営者の個人的な経験の記録であり、投資の勧誘ではありません。投資判断はご自身の責任で行ってください。</li>
          <li>当サイトからリンクしている外部サイトの内容やサービスについて、運営者は責任を負いません。</li>
          <li>記事内で紹介する製品・サービスの仕様や価格は執筆時点のものです。最新の情報は各提供元でご確認ください。</li>
        </ul>

        <h2>8. 著作権とリンクについて</h2>
        <p>
          当サイトに掲載している文章・画像の著作権は、特に明記がない限り運営者に帰属します。引用の範囲を超える無断転載はお断りします。引用する場合は、出典として当サイトの名称と URL を明記してください。当サイトへのリンクは自由です。事前の連絡は不要です。
        </p>

        <h2>9. 本ポリシーの改定</h2>
        <p>
          本ポリシーは、法令の改正やサービスの変更に応じて予告なく改定することがあります。改定後の内容は当ページに掲載した時点で効力を持ちます。
        </p>
        <p className={s["updated"]}>最終改定日：{UPDATED}</p>
      </div>
    </>
  );
};

export default PrivacyPolicy;
