import Link from "next/link";
// import { client } from "../../libs/client";
import Head from 'next/head'
import Card from '../../components/card'
import s from './style.module.scss';
import Image from 'next/image'
import TwitterIcon from '@material-ui/icons/Twitter';
import DoneIcon from '@material-ui/icons/Done';
import GitHubIcon from '@material-ui/icons/GitHub';
import HomeSub from '../../components/home-sub'

export default function Home({ blog }) {
  return (
    <div>
      <Head>
        <title>あつかんブログ</title>
      </Head>
      <div className={s['top-container']}>
        <div className={s['top-left-container']}>
          <Image
            src="/images/undraw_Developer_activity_re_39tg.svg"
            alt="Picture of the author"
            width={250}
            height={250}
          />
        </div>
        <div className={s['top-right-container']}>
          <h2>
            TECH, FINANCE, WORK...
          </h2>
          <p>
          技術, 金融, 働き方に関する記事を投稿しています。<br />
          有益な情報を皆さんとシェアしていきたいです。
          </p>
        </div>
      </div>
      <div className={s['home']}>
        <div className={s['left-container']}>
          <div className={s['list-title']}>
            {/* <DoneIcon />&nbsp;&nbsp;新着記事 */}
            ✓&nbsp;&nbsp;新着記事
          </div>
          <div className={s['blog-card-list-container']}>
            {blog.map((blog) => (
            <div className={s['child']} key={blog.id}>
                  <Card blog={blog} key={blog.id}/>
            </div>
                  ))}
          </div>
        </div>
        <HomeSub />
      </div>
    </div>
  );
}

