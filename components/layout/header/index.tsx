import s from "./style.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";

const NAV_ITEMS = [
  { href: "/profile", label: "プロフィール" },
  { href: "/contact", label: "お問い合わせ" },
];

const Header: React.FC = () => {
  const router = useRouter();
  // サイト名を h1 にするのはトップだけ。下層では記事タイトルなどに h1 を譲る。
  const SiteName = (router.pathname === "/" ? "h1" : "div") as "h1" | "div";

  return (
    <>
      <header className={s["header"]}>
        <div className={s["inner"]}>
          <SiteName className={s["logo"]}>
            <Link href="/">
              <a className={s["logo-link"]}>あつかんブログ🦄</a>
            </Link>
          </SiteName>
          <nav className={s["nav"]}>
            <ul>
              {NAV_ITEMS.map((item) => {
                const isActive = router.pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link href={item.href}>
                      <a
                        className={isActive ? s["is-active"] : undefined}
                        aria-current={isActive ? "page" : undefined}
                      >
                        {item.label}
                      </a>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </header>

      <div className={s["toolbarMargin"]} />
    </>
  );
};

export default Header;
