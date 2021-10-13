import Link from "next/link";
// import { client } from "../../libs/client";
import Head from 'next/head'
import Card from '../card'
import s from './style.module.scss';
import Image from 'next/image'
import TwitterIcon from '@material-ui/icons/Twitter';
import DoneIcon from '@material-ui/icons/Done';
import GitHubIcon from '@material-ui/icons/GitHub';


export default function HomeSub() {
  return (
      <div className={s['sub-container']}>
        <div className={s['sub-container-profile']}>
            <img
                className={s['sub-container-profile-above']}
                src="/images/beautiful.jpg"
                alt="My avatar"
            />
            {/* <div className={s['sub-container-profile-above']} /> */}
            <div className={s['circle-box']}>
              <img
                className={s['circle']}
                src="/images/IMG_8467.jpg"
                alt="My avatar"
              />
            </div>
        </div>
        <div className={s['sub-container-profile-botom']}>
          <div className={s['name']}>
            あつかん
          </div>
          <div className={s['profile-description']}>
          工学修士→某通信企業→Fintech企業。<br/>
          職種は、ProductOps Engineer。<br/>
          趣味はFlutterのアプリ開発やお金の勉強にハマっていまして、最近
          <a target="_blank" rel="noreferrer" href="https://apps.apple.com/jp/app/%E8%8B%B1%E5%8D%98%E8%AA%9E%E9%80%9A%E7%9F%A5/id1582213197">「英単語通知」</a>というアプリをリリースしました。<br />
          働き方、技術、金融のジャンルに興味があるので、それらに関することを書いていこうと思います。
          </div>
          <div className={s['icon-container-aaa']}>
            <div className={s['icon-container']}>
              <Link target="_blank" href="https://twitter.com/atukan0930">
                <a target="_blank">
                  <TwitterIcon className={s['twitter-icon']} />
                </a>
              </Link>
            </div>
            <div className={s['icon-container2']}>
              <Link target="_blank" href="https://github.com/NaokiKameyama">
                <a target="_blank">
                  <GitHubIcon className={s['github-icon']} />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
  );
}

