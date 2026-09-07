import s from "./style.module.scss";
import HomeSub from "../home-sub";

const facts = [
  { label: "名前", value: "亀山 直起（かめやま なおき）" },
  { label: "生年月", value: "1993年9月" },
  { label: "最終学歴", value: "修士（工学）" },
];

// 経歴。start/end は軸の計算用（end: null = 継続中）、period は表示用。
const careers = [
  {
    start: "2018-04",
    end: "2021-08",
    period: "2018年4月 〜 2021年8月",
    company: "ソフトバンク株式会社",
    role: "システムエンジニア",
  },
  {
    start: "2020-02",
    end: "2021-08",
    period: "2020年2月 〜 2021年8月",
    company: "JS-Pro.株式会社",
    role: "共同創業者",
    note: "副業",
  },
  {
    start: "2021-09",
    end: "2025-01",
    period: "2021年9月 〜 2025年1月",
    company: "PayPay株式会社",
    role: "プロダクトマネージャー",
  },
  {
    start: "2025-02",
    end: null,
    period: "2025年2月 〜 現在",
    company: "デジタル庁",
    role: "プロダクトマネージャー",
  },
  {
    start: "2025-07",
    end: null,
    period: "2025年7月 〜 現在",
    company: "株式会社みんがく",
    role: "取締役CTO",
    note: "兼業",
  },
];

// 横軸は 2018 年 1 月から「現在」（ビルド時の年月。pages/profile.tsx から渡される）まで。
// 継続中のバーは右端＝現在にぴったり届かせる。年ラベルは現在の年より前だけ出し、右端に「現在」を置く。
const AXIS_START = 2018;

const monthsFromStart = (ym) => {
  const [year, month] = ym.split("-").map(Number);
  return (year - AXIS_START) * 12 + (month - 1);
};

const makeAxis = (now) => {
  const [year, month] = now.split("-").map(Number);
  const months = (year - AXIS_START) * 12 + month; // 現在の月を含む
  const years = Array.from({ length: year - AXIS_START }, (_, i) => AXIS_START + i);
  const percent = (n) => `${(n / months) * 100}%`;
  return { months, years, percent };
};

const barStyle = (career, axis) => {
  const from = monthsFromStart(career.start);
  // 終了月も期間に含めるので +1。継続中は右端（現在）まで伸ばす。
  const to = career.end ? monthsFromStart(career.end) + 1 : axis.months;
  return { left: axis.percent(from), width: axis.percent(to - from) };
};

const strengths = [
  {
    title: "新しい技術をすばやく形にする",
    body: "話題の技術はまず自分で触って確かめます。学習から実装までの距離を短く保つことを大事にしています。",
  },
  {
    title: "PMとエンジニアリングを地続きにする",
    body: "仕様を決める人と作る人の間に線を引かず、要件定義から実装まで一貫して手を動かせます。",
  },
  {
    title: "0→1でサービスを立ち上げる",
    body: "個人開発のアプリから会社の事業まで、アイデアを世に出すところまでやりきります。",
  },
];

const works = [
  {
    name: "英単語通知",
    platform: "iOS / Android",
    description: "覚えたい英単語を、定期的にスマホへPush通知で届けるアプリです。",
    url: "https://apps.apple.com/jp/app/%E8%8B%B1%E5%8D%98%E8%AA%9E%E9%80%9A%E7%9F%A5/id1582213197",
  },
  {
    name: "SQL Generator",
    platform: "Web",
    description: "やりたいことを書くと、GPTがSQLを組み立ててくれるサービスです。",
    url: "https://sql-generator-by-gpt.vercel.app/",
  },
  {
    name: "SvelteStudy",
    platform: "Web",
    description:
      "JavaScriptフレームワーク「Svelte」を、手を動かしながら学べるサービスです。",
    url: "https://svelte-study.vercel.app/",
  },
  {
    name: "JS-Pro.",
    platform: "Web",
    description:
      "JavaScriptに特化したオンライン学習サービスです。TOKYO MXで地上波放映されました。",
    url: null,
    status: "サービス停止中",
    extraLink: {
      label: "放映時の動画を見る",
      url: "https://www.youtube.com/watch?v=Hi19AWSqn1M",
    },
  },
];

const certifications = [
  { name: "Googleデジタルワークショップ", year: "2017" },
  { name: "Python エンジニア認定資格", year: "2018" },
  { name: "ITパスポート", year: "2018" },
  { name: "基本情報技術者", year: "2018" },
  { name: "応用情報技術者", year: "2019" },
  { name: "JDLA G検定", year: "2019" },
  { name: "JDLA E資格", year: "2020" },
  { name: "Web検定", year: "2020" },
  { name: "アジャイルソフトウェア開発技術者検定", year: "2020" },
  { name: "AZ-900: Microsoft Azure Fundamentals", year: "2021" },
  { name: "AWS Certified Cloud Practitioner", year: "2021" },
  { name: "JDLA Generative AI TEST 2023 #2", year: "2023" },
];

const hobbies = [
  {
    label: "フルスタック開発",
    body: "トレンドの技術でWebとネイティブアプリを作ること。最近は生成AIばかり触っています。",
  },
  { label: "資産運用", body: "お金の流れを追いかけるのが好きです。" },
  { label: "犬と戯れる", body: "いちばんの息抜きです。" },
];

// 発明者として名前が載っている特許（出願人はいずれも PayPay 株式会社、在籍時の出願）。
// Google Patents の公報から要約を一行にしたもの。granted が無いものは公開済み・審査中。
const gp = (n) => `https://patents.google.com/patent/${n}/ja`;
const patents = [
  {
    number: "特許第7403705号",
    title: "認証装置、認証方法、およびプログラム",
    filed: "2023-10-17",
    granted: "2023-12-22",
    summary:
      "ワンタイムパスワードのなりすまし対策。認証を要求したアプリと、通知先のアドレスにアクセスしたアプリが同一かを突き合わせて本人を確認する仕組み。",
    url: gp("JP7403705B1"),
  },
  {
    number: "特許第7453458号",
    title: "サービス提供装置、サービス提供方法、およびプログラム",
    filed: "2023-09-06",
    granted: "2024-03-19",
    summary:
      "決済コード画像のスクリーンショット対策。画面キャプチャで複製されたコードを無効化し、そのコードでの利用を不正として検知する仕組み。",
    url: gp("JP7453458B1"),
  },
  {
    number: "特許第7496023号",
    title: "情報処理装置、情報処理方法、およびプログラム",
    filed: "2023-07-24",
    granted: "2024-06-05",
    summary:
      "電子チラシの効果測定。チラシの閲覧履歴と電子決済の履歴を突き合わせ、チラシを見た後に実際にその店で決済したユーザーから効果の指標を導く仕組み。",
    url: gp("JP7496023B1"),
  },
  {
    number: "特許第7529856号",
    title: "情報処理装置、情報処理方法、およびプログラム",
    filed: "2023-06-29",
    granted: "2024-08-06",
    summary:
      "決済直後のアンケート。加盟店で決済したユーザーの決済アプリにその店のアンケートを届け、回答を分析して店に返し、効果のあったアンケートを他の店にも提案する仕組み。",
    url: gp("JP7529856B1"),
  },
  {
    number: "特許第7783243号",
    title: "認証装置、認証方法、およびプログラム",
    filed: "2023-12-13",
    granted: "2025-12-09",
    summary:
      "ログイン時のアプリ確認。ID とパスワードに加えて、認証を要求したアプリの識別情報が事前に登録されたものと一致するかを確認して本人を認証する仕組み。",
    url: gp("JP7783243B2"),
  },
  {
    number: "特開2025-037780",
    title: "サービス提供装置、サービス提供方法、およびプログラム",
    filed: "2024-03-06",
    summary: "決済コード画像の複製検知と無効化（特許第7453458号の関連出願）。",
    url: gp("JP2025037780A"),
  },
  {
    number: "特開2025-017309",
    title: "情報処理装置、情報処理方法、プログラム、および情報処理システム",
    filed: "2024-05-21",
    summary: "電子チラシの効果測定（特許第7496023号の関連出願）。",
    url: gp("JP2025017309A"),
  },
  {
    number: "特開2025-010129",
    title: "情報処理装置、情報処理方法、およびプログラム",
    filed: "2024-07-25",
    summary: "決済直後のアンケート提供と分析（特許第7529856号の関連出願）。",
    url: gp("JP2025010129A"),
  },
];
const PATENT_NOTE = `登録済み ${patents.filter((p) => p.granted).length} 件、審査中 ${patents.filter((p) => !p.granted).length} 件。いずれも PayPay 在籍時に発明者として出願したものです。`;

function Section({ title, description, children }) {
  return (
    <section className={s["section"]}>
      <h2 className={s["section-title"]}>{title}</h2>
      {description && <p className={s["section-description"]}>{description}</p>}
      {children}
    </section>
  );
}

export default function Profile({ now = "2027-01" }) {
  const axis = makeAxis(now);
  return (
    <div>
      <div className={s["home"]}>
        <div className={s["left-container"]}>
          <h1 className={s["list-title"]}>プロフィール</h1>

          <section className={s["section"]}>
            <p className={s["intro-lead"]}>
              はじめまして、亀山直起です。
              <br />
              お越しいただきありがとうございます。
            </p>
            <p className={s["intro-body"]}>
              デジタル庁でプロダクトマネージャーを、EdTech企業の株式会社みんがくで取締役CTOを務めています。
              行政と民間、プロダクトマネジメントとエンジニアリング。その両方に軸足を置きながら、
              「つくって届ける」ことを続けてきました。
            </p>
            <p className={s["intro-body"]}>
              このブログでは、働き方・技術・金融をテーマに、日々考えていることを書き留めています。
            </p>
            <p className={s["intro-note"]}>
              このサイト自体も Next.js / TypeScript / microCMS / Vercel
              を使って、ゼロから構築しています。
            </p>
          </section>

          <Section title="基本情報">
            <dl className={s["facts"]}>
              {facts.map((fact) => (
                <div className={s["fact"]} key={fact.label}>
                  <dt className={s["fact-label"]}>{fact.label}</dt>
                  <dd className={s["fact-value"]}>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Section>

          <Section title="経歴">
            <div className={s["gantt"]}>
              <div className={s["gantt-header"]}>
                <div className={s["gantt-label"]} aria-hidden="true" />
                <div className={s["gantt-axis"]}>
                  {axis.years.map((year) => (
                    <span
                      key={year}
                      className={s["gantt-year"]}
                      style={{ left: axis.percent((year - AXIS_START) * 12) }}
                    >
                      {year}
                    </span>
                  ))}
                  <span className={s["gantt-now"]}>現在</span>
                </div>
              </div>
              {careers.map((career) => (
                <div
                  className={s["gantt-row"]}
                  key={`${career.company}-${career.start}`}
                >
                  <div className={s["gantt-label"]}>
                    <div className={s["gantt-company"]}>
                      {career.company}
                      {career.note && (
                        <span className={s["gantt-note"]}>{career.note}</span>
                      )}
                    </div>
                    <div className={s["gantt-role"]}>{career.role}</div>
                    <div className={s["gantt-period"]}>{career.period}</div>
                  </div>
                  <div className={s["gantt-track"]}>
                    <div className={s["gantt-grid"]} aria-hidden="true">
                      {axis.years.map((year) => (
                        <span
                          key={year}
                          style={{ left: axis.percent((year - AXIS_START) * 12) }}
                        />
                      ))}
                      <span className={s["gantt-now-line"]} />
                    </div>
                    <div
                      className={[
                        s["gantt-bar"],
                        !career.end && s["is-ongoing"],
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      style={barStyle(career, axis)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section title="得意なこと">
            <div className={s["strengths"]}>
              {strengths.map((strength) => (
                <div key={strength.title}>
                  <div className={s["strength-title"]}>{strength.title}</div>
                  <p className={s["strength-body"]}>{strength.body}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section title="特許" description={PATENT_NOTE}>
            <ul className={s["patents"]}>
              {patents.map((patent) => (
                <li className={s["patent"]} key={patent.number}>
                  <div className={s["patent-head"]}>
                    <span
                      className={`${s["patent-status"]} ${
                        patent.granted ? s["is-granted"] : s["is-pending"]
                      }`}
                    >
                      {patent.granted ? "登録済み" : "審査中"}
                    </span>
                    <a
                      className={s["patent-number"]}
                      target="_blank"
                      rel="noreferrer"
                      href={patent.url}
                    >
                      {patent.number}
                    </a>
                    <span className={s["patent-date"]}>
                      {patent.granted ? `登録 ${patent.granted}` : `出願 ${patent.filed}`}
                    </span>
                  </div>
                  <div className={s["patent-title"]}>{patent.title}</div>
                  {patent.summary && (
                    <p className={s["patent-summary"]}>{patent.summary}</p>
                  )}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="公表論文">
            <a
              className={s["scholar-link"]}
              target="_blank"
              rel="noreferrer"
              href="https://scholar.google.co.jp/citations?hl=ja&user=O1T55MMAAAAJ"
            >
              Google Scholar で一覧を見る
            </a>
          </Section>

          <Section
            title="つくったもの"
            description="個人開発・事業として立ち上げたサービスです。"
          >
            <div className={s["works"]}>
              {works.map((work) => (
                <div className={s["work"]} key={work.name}>
                  <div className={s["work-head"]}>
                    <span className={s["work-platform"]}>{work.platform}</span>
                    {work.status && (
                      <span className={s["work-status"]}>{work.status}</span>
                    )}
                  </div>
                  <div className={s["work-name"]}>
                    {work.url ? (
                      <a target="_blank" rel="noreferrer" href={work.url}>
                        {work.name}
                      </a>
                    ) : (
                      work.name
                    )}
                  </div>
                  <p className={s["work-description"]}>{work.description}</p>
                  {work.extraLink && (
                    <a
                      className={s["work-extra"]}
                      target="_blank"
                      rel="noreferrer"
                      href={work.extraLink.url}
                    >
                      {work.extraLink.label}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </Section>

          <Section title="資格">
            <ul className={s["certifications"]}>
              {certifications.map((certification) => (
                <li className={s["certification"]} key={certification.name}>
                  <span className={s["certification-year"]}>
                    {certification.year}
                  </span>
                  <span className={s["certification-name"]}>
                    {certification.name}
                  </span>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="趣味">
            <div className={s["hobbies"]}>
              {hobbies.map((hobby) => (
                <div key={hobby.label}>
                  <div className={s["hobby-label"]}>{hobby.label}</div>
                  <p className={s["hobby-body"]}>{hobby.body}</p>
                </div>
              ))}
            </div>
          </Section>
        </div>
        <HomeSub />
      </div>
    </div>
  );
}
