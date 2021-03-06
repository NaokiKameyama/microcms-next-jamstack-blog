import s from "./style.module.scss";
import Image from "next/image";
import Link from "next/link";
import UpdateIcon from "@material-ui/icons/Update";

const Card = ({ blog }) => {
  return (
    <>
      <Link href={`/blog/${blog.id}`}>
        <section className={s["card"]}>
          <img className={s["card-img"]} src={blog.image.url} alt=""></img>
          <div className={s["card-content"]}>
            <div className={s["date"]}>
              <UpdateIcon className={s["update-icon"]} /> {blog.publishedAt}
            </div>
            <h1 className={s["card-title"]}>{blog.title}</h1>
            {/* <p className={s['card-text']}>{blog.body.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'')}</p> */}
          </div>
          <p className={s["category"]}>
            {blog.category && `${blog.category.name}`}
          </p>
        </section>
      </Link>
    </>
  );
};

export default Card;
