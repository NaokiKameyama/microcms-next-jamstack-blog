import Head from "next/head";
import Card from "../../components/card";
import s from "./style.module.scss";
import Image from "next/image";
import { imageLoader } from "../../libs/imageLoader";
import HomeSub from "../../components/home-sub";
import { InFeedAd } from "../../components/AdSense";
import React from "react";
import Link from "next/link";
import { categoryPath } from "../../lib/posts";

const ALL = "新着記事";
// インフィード広告を差し込む位置（この枚数の直後）。記事がこれより少なければ末尾。
const IN_FEED_AFTER = 4;

// category: 表示中のカテゴリ名（トップは undefined＝新着）。絞り込みはページ側で済んでいる。
export default function Home({ blog, categoryData, category = ALL }) {
  const visibleBlog = blog;

  return (
    <div>
      <Head>
        <title>あつかんブログ</title>
      </Head>
      {category === ALL ? (
        <div className={s["top-container"]}>
          <div className={s["top-left-container"]}>
            <Image
              loader={imageLoader}
              src="/images/undraw_Developer_activity_re_39tg.svg"
              alt=""
              width={250}
              height={250}
            />
          </div>
          <div className={s["top-right-container"]}>
            <h2>TECH, FINANCE, WORK...</h2>
            <p>
              技術・金融・働き方について書いています。
              自分が調べて分かったことを、後から読む人の役に立つ形で残していきます。
            </p>
          </div>
        </div>
      ) : (
        <div className={s["page-title"]}>
          <h1>{category}の記事一覧</h1>
          <p>{visibleBlog.length} 件の記事があります</p>
        </div>
      )}
      <div className={s["home"]}>
        <div className={s["left-container"]}>
          <ul className={s["list-category"]}>
            {[ALL, ...categoryData.map((item) => item.name)].map((name) => {
              const isActive = category === name;
              return (
                <li key={name} className={isActive ? s["category"] : s["category2"]}>
                  <Link href={name === ALL ? "/" : categoryPath(name)}>
                    <a aria-current={isActive ? "page" : undefined}>{name}</a>
                  </Link>
                </li>
              );
            })}
          </ul>
          {visibleBlog.length > 0 ? (
            <div className={s["blog-card-list-container"]}>
              {visibleBlog.map((item, i) => (
                <React.Fragment key={item.id}>
                  <div className={s["child"]}>
                    <Card blog={item} priority={i < 2} />
                  </div>
                  {(i + 1 === IN_FEED_AFTER ||
                    (visibleBlog.length < IN_FEED_AFTER &&
                      i + 1 === visibleBlog.length)) && (
                    <div className={`${s["child"]} ${s["ad-child"]}`}>
                      {/* key をカテゴリにして、絞り込みのたびに再マウント＝再リクエストさせる */}
                      <InFeedAd key={`feed-${category}`} />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          ) : (
            <p className={s["empty"]}>このカテゴリの記事はまだありません。</p>
          )}
        </div>
        <HomeSub />
      </div>
      {/* <Pagination totalCount={blog.length} /> */}
    </div>
  );
}
