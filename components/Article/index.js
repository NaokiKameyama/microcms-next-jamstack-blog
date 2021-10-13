import Link from "next/link";
// import { client } from "../../libs/client";
import Head from 'next/head'
import Card from '../card'
import s from './style.module.scss';
import Image from 'next/image'
import TwitterIcon from '@material-ui/icons/Twitter';
import DoneIcon from '@material-ui/icons/Done';
import GitHubIcon from '@material-ui/icons/GitHub';
import HomeSub from '../home-sub'
import styles from '../../styles/Home.module.scss';

export default function Article({ blog ,highlightedBody }) {
  return (
    <div>
      <Head>
        <title>あつかんブログ</title>
      </Head>
      <div className={s['home']}>
        <div className={s['left-container']}>
          {/* <div className={s['list-title']}>
            <DoneIcon />&nbsp;&nbsp;新着記事
          </div> */}
          <main className={styles.main}>
            <h1 className={styles.title}>{blog.title}</h1>
            <p className={styles.publishedAt}>{blog.publishedAt}</p>
            <p className="category">{blog.category && `${blog.category.name}`}</p>
            <Image src={blog.image.url} width={blog.image.width} height={blog.image.height} alt="My avatar" />
            <div
              dangerouslySetInnerHTML={{
                __html: `${highlightedBody}`,
              }}
              className={styles.post}
            />
          </main>
        </div>
        <HomeSub />
      </div>
    </div>
  );
}

