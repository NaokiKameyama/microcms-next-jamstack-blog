import { AppBar, Toolbar } from "@material-ui/core";
import s from './style.module.scss';
import Link from 'next/link';

const Header = () => {
  return (
    <>
      <header className={s['header']}>
        <div className={s["inner"]}>
          <div className={s["header-top"]}>
            <Link href="/" passHref>
              <h1>あつかんブログ🦄</h1>
            </Link>
          </div>
          <nav>
            <ul>
                {/* <li><a href="#">TECH</a></li>
                <li><a href="#">MONEY</a></li>
                <li><a href="#">WORK</a></li> */}
                <Link href="/profile" passHref>
                  <li>プロフィール</li>
                </Link>
                <Link href="/contact" passHref>
                  <li>お問い合わせ</li>
                </Link>
            </ul>
        </nav>
        </div>
      </header>

      <div className={s["toolbarMargin"]} />
    </>
  );
};

export default Header;
