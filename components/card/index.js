import s from "./style.module.scss";
import Link from "next/link";
import UpdateIcon from "@material-ui/icons/Update";
import { formatDate } from "../../libs/formatDate";

const Card = ({ blog }) => {
  return (
    <Link href={`/blog/${blog.id}`}>
      <a className={s["card-link"]}>
        <article className={s["card"]}>
          <div className={s["card-thumb"]}>
            <img className={s["card-img"]} src={blog.image.url} alt="" />
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
