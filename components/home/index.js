import Head from "next/head";
import Card from "../../components/card";
import s from "./style.module.scss";
import Image from "next/image";
import { imageLoader } from "../../libs/imageLoader";
import HomeSub from "../../components/home-sub";
import { useState } from "react";

const ALL = "新着記事";

export default function Home({ blog, categoryData }) {
  const [category, setCategory] = useState(ALL);
  const onChange = (value) => {
    setCategory(value);
  };
  const visibleBlog =
    category === ALL
      ? blog
      : blog.filter((item) => item.category && item.category.name === category);

  return (
    <div>
      <Head>
        <title>あつかんブログ</title>
      </Head>
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
      <div className={s["home"]}>
        <div className={s["left-container"]}>
          <ul className={s["list-category"]}>
            {[ALL, ...categoryData.map((item) => item.name)].map((name) => (
              <li
                key={name}
                onClick={() => onChange(name)}
                className={category === name ? s["category"] : s["category2"]}
              >
                {name}
              </li>
            ))}
          </ul>
          {visibleBlog.length > 0 ? (
            <div className={s["blog-card-list-container"]}>
              {visibleBlog.map((item) => (
                <div className={s["child"]} key={item.id}>
                  <Card blog={item} />
                </div>
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
