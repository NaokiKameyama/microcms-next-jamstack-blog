import Link from "next/link";
import Image from "next/image";
import { imageLoader } from "../../libs/imageLoader";
import HomeSub from "../home-sub";
import s from "./style.module.scss";
import { formatDate } from "../../libs/formatDate";
import { TwitterFollowButton } from "react-twitter-embed";

export default function Article({ blog, highlightedBody }) {
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
            </div>
            <h1 className={s["title"]}>{blog.title}</h1>
          </header>

          {blog.image && (
            <div className={s["top-image"]}>
              <Image
                loader={imageLoader}
                src={blog.image.url}
                width={blog.image.width}
                height={blog.image.height}
                alt=""
              />
            </div>
          )}

          <div
            className={s["post"]}
            dangerouslySetInnerHTML={{ __html: `${highlightedBody}` }}
          />
          {blog.html && (
            <div
              className={s["post"]}
              dangerouslySetInnerHTML={{ __html: `${blog.html}` }}
            />
          )}

          <footer className={s["article-footer"]}>
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
