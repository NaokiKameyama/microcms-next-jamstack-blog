import React from "react";
import s from "./style.module.scss";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className={s["footer"]}>
      <Link href="/privacyPolicy" passHref>
        <div className={s["privacy-policy"]}>プライバシーポリシー</div>
      </Link>
      <div>© All rights reserved by atukan-blog.</div>
    </footer>
  );
};

export default Footer;
