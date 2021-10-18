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
          <div className={s['top-image']}>
            <Image src={blog.image.url} width={blog.image.width} height={blog.image.height} alt="My avatar" />
          </div>
            <p className={s['category']}>{blog.category && `${blog.category.name}`}</p>
            <h1 className={styles.title}>{blog.title}</h1>
            <p className={styles.publishedAt}>{blog.publishedAt}</p>
            <div
              dangerouslySetInnerHTML={{
                __html: `${highlightedBody}`,
              }}
              className={styles.post}
            />

            <br />
            <a
            href="https://twitter.com/atukan0930?ref_src=twsrc%5Etfw"
            className={"twitter-follow-button"}
            data-size="large"
            data-lang="ja"
            data-show-count="false">
              Follow @atukan0930
            </a>
          </main>
          {/* <div className={s['follow']}>
            <a
            href="https://twitter.com/atukan0930?ref_src=twsrc%5Etfw"
            className={"twitter-follow-button"}
            data-size="large"
            data-lang="ja"
            data-show-count="false">
              Follow @atukan0930
            </a>
            <script async src="https://platform.twitter.com/widgets.js" charset="utf-8">
            </script>
          </div> */}
        </div>
        <HomeSub />
      </div>
    </div>
  );
}

