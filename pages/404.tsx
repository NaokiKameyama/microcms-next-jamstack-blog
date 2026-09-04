import Head from "next/head";
import Link from "next/link";
import s from "../styles/NotFound.module.scss";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>ページが見つかりません | あつかんブログ</title>
        <meta name="robots" content="noindex" />
      </Head>
      <div className={s["notfound"]}>
        <p className={s["code"]}>404</p>
        <p className={s["title"]}>ページが見つかりませんでした</p>
        <p className={s["lead"]}>
          お探しのページは削除されたか、URLが変更された可能性があります。
        </p>
        <Link href="/">
          <a className={s["back"]}>記事一覧へ</a>
        </Link>
      </div>
    </>
  );
}
