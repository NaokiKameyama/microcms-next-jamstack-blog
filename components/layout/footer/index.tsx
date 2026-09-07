import React from "react";
import s from "./style.module.scss";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className={s["footer"]}>
      <div className={s["inner"]}>
        <nav className={s["links"]}>
          <Link href="/profile">
            <a>運営者情報（プロフィール）</a>
          </Link>
          <Link href="/contact">
            <a>お問い合わせ</a>
          </Link>
          <Link href="/privacyPolicy">
            <a>プライバシーポリシー・免責事項</a>
          </Link>
        </nav>
        {/* Amazon アソシエイト・プログラム運営規約で定められた表示。全ページに出す */}
        <p className={s["disclosure"]}>
          Amazon のアソシエイトとして、あつかんブログは適格販売により収入を得ています。
        </p>
        <p className={s["copyright"]}>
          © All rights reserved by atukan-blog.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
