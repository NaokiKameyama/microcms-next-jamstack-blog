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
      <div className={s['home-container']}>
        <div className={s['blog-card-list-container']}>
            {blog.map((blog) => (
              <div key={blog.id}>
                <Card blog={blog} />
              </div>
            ))}
        </div>
        <div className={s['sub-container']}>
          <div className={s['sub-container-profile']}>
              <div className={s['sub-container-profile-above']}>
                画像
              </div>
              <div className={s['sub-container-profile-botom']}>
                あああああああああああああああああああああああああああああああああ
              </div>
              <div className={s['circle']}>
                <span>sample</span>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

