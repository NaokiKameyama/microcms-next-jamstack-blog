import Link from "next/link";
import Image from "next/image";
import { imageLoader } from "../../libs/imageLoader";
import HomeSub from "../home-sub";
import s from "./style.module.scss";
import { formatDate } from "../../libs/formatDate";
import { TwitterFollowButton } from "react-twitter-embed";
import { InArticleAd } from "../AdSense";

// 本文 HTML を 2 つ目のトップレベル見出し（h1/h2）の直前で分割する。
// 見出しは本文直下にあるので、その手前で切れば入れ子のタグを壊さない。
// 見出しが 2 つ未満なら分割しない（広告は末尾だけ）。
const splitBeforeSecondHeading = (html) => {
  const re = /<h[12][\s>]/gi;
  let match;
  let count = 0;
  while ((match = re.exec(html))) {
    if (++count === 2) return [html.slice(0, match.index), html.slice(match.index)];
  }
  return [html, ""];
};

export default function Article({ blog, highlightedBody, related = [] }) {
  const [bodyHead, bodyTail] = splitBeforeSecondHeading(`${highlightedBody}`);
  return (
    <div className={s["home"]}>
      <div className={s["left-container"]}>
        <article className={s["article"]}>
          <header className={s["article-header"]}>
            <div className={s["meta"]}>
              {blog.category && (
                <span className={s["category"]}>{blog.category.name}</span>
              )}
              <time className={s["published-at"]} dateTime={blog.publishedAt}>
                {formatDate(blog.publishedAt)}
              </time>
              {blog.updatedAt && blog.updatedAt.slice(0, 10) !== blog.publishedAt.slice(0, 10) && (
                <span className={s["updated-at"]}>更新 {formatDate(blog.updatedAt)}</span>
              )}
            </div>
            <h1 className={s["title"]}>{blog.title}</h1>
            {blog.pr && (
              <p className={s["pr-note"]}>
                本記事にはアフィリエイト広告（PR）が含まれます。
              </p>
            )}
          </header>

          {blog.image && (
            <div className={s["top-image"]}>
              <img
                src={blog.image.url}
                width={blog.image.width || undefined}
                height={blog.image.height || undefined}
                alt=""
                loading="eager"
              />
            </div>
          )}

          <div
            className={s["post"]}
            dangerouslySetInnerHTML={{ __html: bodyHead }}
          />
          {bodyTail && (
            <>
              <div className={s["ad-slot"]}>
                {/* key を記事IDにして、記事間の遷移で必ず再マウント＝再リクエストさせる */}
                <InArticleAd key={`mid-${blog.id}`} />
              </div>
              <div
                className={s["post"]}
                dangerouslySetInnerHTML={{ __html: bodyTail }}
              />
            </>
          )}
          {blog.html && (
            <div
              className={s["post"]}
              dangerouslySetInnerHTML={{ __html: `${blog.html}` }}
            />
          )}

          <div className={s["ad-slot"]}>
            <InArticleAd key={`end-${blog.id}`} />
          </div>

          <footer className={s["article-footer"]}>
            {related.length > 0 && (
              <section className={s["related"]}>
                <h2 className={s["related-title"]}>関連記事</h2>
                <ul className={s["related-list"]}>
                  {related.map((item) => (
                    <li key={item.id}>
                      <Link href={`/blog/${item.id}`}>
                        <a className={s["related-link"]}>
                          <img className={s["related-thumb"]} src={item.image.url} alt="" loading="lazy" />
                          <span className={s["related-body"]}>
                            <span className={s["related-name"]}>{item.title}</span>
                            <time className={s["related-date"]} dateTime={item.publishedAt}>
                              {formatDate(item.publishedAt)}
                            </time>
                          </span>
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}
            <div className={s["cta"]}>
              <p className={s["cta-text"]}>
                プロダクト開発・技術・キャリアに関するご相談や執筆のご依頼を受け付けています。
              </p>
              <Link href="/contact">
                <a className={s["cta-link"]}>お仕事のご相談はこちら</a>
              </Link>
            </div>
            <div className={s["follow"]}>
              <TwitterFollowButton
                screenName="atukan0930"
                options={{ size: "large" }}
              />
            </div>
            <Link href="/">
              <a className={s["back-link"]}>← 記事一覧に戻る</a>
            </Link>
          </footer>
        </article>
      </div>
      <HomeSub />
    </div>
  );
}
