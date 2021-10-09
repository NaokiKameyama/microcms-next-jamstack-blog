import Link from "next/link";
// import { client } from "../../libs/client";
import Head from 'next/head'
import Card from '../../components/card'
import s from './style.module.scss';

export default function Home({ blog }) {
  return (
    <div>
      <Head>
        <title>あつかんブログ</title>
      </Head>
        <div className={s['blog-card-list']}>
            {blog.map((blog) => (
              <div className={s['blog-card']} key={blog.id}>
                <Card blog={blog} />
              </div>
            ))}
        </div>
    </div>
  );
}

