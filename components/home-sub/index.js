import Link from "next/link";
import s from "./style.module.scss";
import Image from "next/image";
import { imageLoader } from "../../libs/imageLoader";
import GitHubIcon from "@material-ui/icons/GitHub";

export default function HomeSub() {
  return (
    <div className={s["sub-container"]}>
      <div className={s["sub-container-profile-above"]}>
        <Image
          loader={imageLoader}
          src="/images/beautiful.jpg"
          alt="My avatar"
          width={750}
          height={400}
        />
      </div>
      <div className={s["circle-box"]}>
        <div className={s["circle2"]}>
          <Image
            loader={imageLoader}
            className={s["circle"]}
            src="/images/IMG_8467.jpg"
            alt="My avatar"
            width={120}
            height={120}
          />
        </div>
      </div>
      <div className={s["sub-container-profile-botom"]}>
        <div className={s["name"]}>亀山 直起</div>
        <div className={s["profile-description"]}>
          デジタル庁でプロダクトマネージャー、EdTech企業で取締役CTOをしています。
          休みの日はWebサービスを作るか、お金の勉強をしていることが多いです。
          個人開発では
          <a
            target="_blank"
            rel="noreferrer"
            href="https://apps.apple.com/jp/app/%E8%8B%B1%E5%8D%98%E8%AA%9E%E9%80%9A%E7%9F%A5/id1582213197"
          >
            「英単語通知」
          </a>
          というアプリをリリースしました。
          <br />
          このブログでは、技術・金融・働き方について考えたことを書いています。
        </div>
        <div className={s["icon-container-aaa"]}>
          <div className={s["icon-container2"]}>
            <Link target="_blank" href="https://github.com/NaokiKameyama">
              <a target="_blank">
                <GitHubIcon className={s["github-icon"]} />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
