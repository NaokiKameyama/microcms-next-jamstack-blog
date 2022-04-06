import Link from "next/link";
// import { client } from "../../libs/client";
import Head from "next/head";
import Card from "../card";
import s from "./style.module.scss";
import Image from "next/image";
import HomeSub from "../home-sub";
import styles from "../../styles/Home.module.scss";

export default function Profile({}) {
  return (
    <div>
      <Head>
        <title>プロフィール</title>
      </Head>
      <div className={s["home"]}>
        <div className={s["left-container"]}>
          <div className={s["list-title"]}>プロフィール</div>
          <main className={styles.main}>
            <div>
              こんにちは。
              <br />
              お越し頂きありがとうございます。
              <br />
              主に「技術、金融、働き方」に関する情報発信をしています。
              <br />
              (本サイトは、Next.js, TypeScript, microCMS, Vercel等の技術を使って、0から構築しています。)
              <br />
            </div>
            <div>
              <table>
                <tr>
                  <th>名前</th>
                  <td>亀山 直起</td>
                </tr>
                <tr>
                  <th>生年月</th>
                  <td>1993年9月</td>
                </tr>
                <tr>
                  <th>組織</th>
                  <td>Fintech企業 📱</td>
                </tr>
                <tr>
                  <th>役職</th>
                  <td>Product Manager🧑‍💻</td>
                </tr>
                <tr>
                  <th>職歴</th>
                  <td>
                    2018年4月 ~ 2021年9月 通信企業 システムエンジニア
                    <br />
                    2020年2月 ~ 2021年6月 JS-Pro.株式会社 取締役兼CIO
                    <br />
                    2021年 ~ 現在 Fintech企業 プロダクトマネージャ
                  </td>
                </tr>
                <tr>
                  <th>最終学歴</th>
                  <td>修士(工学)</td>
                </tr>
                <tr>
                  <th>趣味</th>
                  <td>プログラミング, 資産運用</td>
                </tr>
                <tr>
                  <th>作成したサービス</th>
                  <td>
                    【iOS, Android】
                    <br />
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://apps.apple.com/jp/app/%E8%8B%B1%E5%8D%98%E8%AA%9E%E9%80%9A%E7%9F%A5/id1582213197"
                    >
                      英単語通知
                    </a>{" "}
                    　英単語を定期的にスマホにPush通知するアプリです。
                    <br />
                    <br />
                    <hr />
                    【Web】
                    <br />
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://sveltestudy.jp/"
                    >
                      SvelteStudy
                    </a>{" "}
                    　SvelteというJavaScriptのフレームワークを学習するサービスです。
                    <br />
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://www.js-pro.jp/"
                    >
                      JS-Pro.(現在サービス停止中)
                    </a>{" "}
                    　JavaScript特化型のオンライン学習サービスです。
                      このサービスは、TOKYO MXで地上放映されました。(
                    　<a
                      target="_blank"
                      rel="noreferrer"
                      href="https://www.youtube.com/watch?v=Hi19AWSqn1M"
                    >
                      動画
                    </a>
                      )
                    <br />
                  </td>
                </tr>
                <tr>
                  <th>資格</th>
                  <td>
                    Googleデジタルワークショップ 2017年取得
                    <br />
                    <hr />
                    Python エンジニア認定資格　2018年取得
                    <br />
                    <hr />
                    ITパスポート　2018年取得
                    <br />
                    <hr />
                    基本情報技術者 2018年取得
                    <br />
                    <hr />
                    応用情報技術者 2019年取得
                    <br />
                    <hr />
                    JDLA G検定(JDLA deep learning for GENERAL)　2019年取得
                    <br />
                    <hr />
                    JDLA E資格 (JDLA Deep Learning for ENGINEER)　2020年取得
                    <br />
                    <hr />
                    Web検定　2020年取得
                    <br />
                    <hr />
                    アジャイルソフトウェア開発技術者検定　2020年取得
                    <br />
                    <hr />
                    AZ-900: Microsoft Azure Fundamentals　2021年取得
                    <br />
                    <hr />
                    AWS Certified Cloud Practitioner　2021年取得
                    <br />
                  </td>
                </tr>
              </table>
            </div>
          </main>
        </div>
        <HomeSub />
      </div>
    </div>
  );
}
