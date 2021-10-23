import Link from "next/link";
// import { client } from "../../libs/client";
import Head from "next/head";
import Card from "../card";
import s from "./style.module.scss";
import Image from "next/image";
import TwitterIcon from "@material-ui/icons/Twitter";
import DoneIcon from "@material-ui/icons/Done";
import GitHubIcon from "@material-ui/icons/GitHub";
import HomeSub from "../home-sub";
import styles from "../../styles/Home.module.scss";

export default function Contact({}) {
  return (
    <div>
      <Head>
        <title>お問い合わせ</title>
      </Head>
      <div className={s["home"]}>
        <div className={s["left-container"]}>
          <div className={s["list-title"]}>お問い合わせ</div>
          <main className={styles.main}>
            <iframe
              className={s["google-form"]}
              src="https://docs.google.com/forms/d/e/1FAIpQLSf5ogBxiH5UsVuK6hzU57-ihguyAX8ipFYutZy-ubeuqJcgqA/viewform?embedded=true"
              // marginheight="0"
              // marginwidth="0"
            >
              読み込んでいます…
            </iframe>
          </main>
        </div>
        <HomeSub />
      </div>
    </div>
  );
}
