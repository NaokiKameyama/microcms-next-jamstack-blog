import s from './style.module.scss';
import Image from 'next/image'
import Link from "next/link";

const Card = ({blog}) => {
  console.log("card")
  console.log(blog)
  return (
    // <div className={s.card}>
    //   {blog[0].title}
    //   {blog[0].publishedAt}
    //   {blog[0].category.name}
    //   {blog[0].body}
    //   <Image className={s['card-img']} src={blog[0].image.url} layout='fill' alt=""></Image>
    // </div>

    <Link href={`/blog/${blog.id}`}>
    <section className={s['card']}>
      {/* <div className={s['card-img-box']}> */}
      <img className={s['card-img']} src={blog.image.url} alt=""></img>
      {/* </div> */}
      <div className={s['card-content']}>
        <h1 className={s['card-title']}>{blog.title}</h1>
        <p className={s['card-text']}>{blog.body.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'')}</p>
      </div>
      <div className={s["card-link"]}>
        <div>{blog.publishedAt}</div>
  </div>
  </section>
  </Link>
  );
};

export default Card;
