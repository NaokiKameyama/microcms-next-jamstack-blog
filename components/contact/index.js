import Head from "next/head";
import s from "./style.module.scss";
import HomeSub from "../home-sub";

export default function Contact() {
  return (
    <div>
      <Head>
        <title>お問い合わせ | あつかんブログ</title>
        <meta
          name="description"
          content="あつかんブログへのお問い合わせフォームです。記事へのご指摘やご相談はこちらからお送りください。"
        />
      </Head>
      <div className={s["home"]}>
        <div className={s["left-container"]}>
          <h1 className={s["list-title"]}>お問い合わせ</h1>
          <div className={s["panel"]}>
            <p className={s["lead"]}>
              記事へのご指摘、お仕事のご相談などはこちらからお送りください。
              内容を確認のうえ、折り返しご連絡します。
            </p>
            <iframe
              className={s["google-form"]}
              src="https://docs.google.com/forms/d/e/1FAIpQLSeVY7FSJCljw6nvvvhcIMDFjr1hffEGdn_m15-t1kj_vzFC9Q/viewform?embedded=true"
              title="お問い合わせフォーム"
            >
              読み込んでいます…
            </iframe>
          </div>
        </div>
        <HomeSub />
      </div>
    </div>
  );
}
