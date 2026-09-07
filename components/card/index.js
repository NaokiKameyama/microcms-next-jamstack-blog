import s from "./style.module.scss";
import Link from "next/link";
import UpdateIcon from "@material-ui/icons/Update";
import { formatDate } from "../../libs/formatDate";

// 一覧カード用のサムネイル。scripts/optimize-images.js が cover-600.webp を作る前提
const thumbOf = (url) => (url.endsWith("/cover.webp") ? url.replace(/cover\.webp$/, "cover-600.webp") : url);

const Card = ({ blog, priority = false }) => {
  const thumb = thumbOf(blog.image.url);
  return (
    <Link href={`/blog/${blog.id}`}>
      <a className={s["card-link"]}>
        <article className={s["card"]}>
          <div className={s["card-thumb"]}>
            <img
              className={s["card-img"]}
              src={thumb}
              srcSet={thumb !== blog.image.url ? `${thumb} 600w, ${blog.image.url} 1200w` : undefined}
              sizes="(max-width: 550px) 100vw, (max-width: 834px) 50vw, 400px"
              width={blog.image.width || undefined}
              height={blog.image.height || undefined}
              alt=""
              loading={priority ? "eager" : "lazy"}
              decoding="async"
            />
            {blog.category && (
              <span className={s["category"]}>{blog.category.name}</span>
            )}
          </div>
          <div className={s["card-content"]}>
            <time className={s["date"]} dateTime={blog.publishedAt}>
              <UpdateIcon className={s["update-icon"]} />
              {formatDate(blog.publishedAt)}
            </time>
            <h2 className={s["card-title"]}>{blog.title}</h2>
          </div>
        </article>
      </a>
    </Link>
  );
};

export default Card;
