import React from "react";
import s from "./style.module.scss";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className={s["footer"]}>
      <div className={s["inner"]}>
        <nav className={s["links"]}>
          <Link href="/profile">
            <a>プロフィール</a>
          </Link>
          <Link href="/contact">
            <a>お問い合わせ</a>
          </Link>
          <Link href="/privacyPolicy">
            <a>プライバシーポリシー</a>
          </Link>
        </nav>
        <p className={s["copyright"]}>
          © All rights reserved by atukan-blog.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
