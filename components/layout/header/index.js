import { AppBar, Toolbar } from "@material-ui/core";
import s from './style.module.scss';
import Link from 'next/link';

const Header = () => {
  return (
    <>
      <header className={s['header']}>
        <div className={s["inner"]}>
          <div className={s["header-top"]}>
            <Link href="/">
              <h1>あつかんブログ🦄</h1>
            </Link>
          </div>
          <nav>
            <ul>
                <li><a href="#">IT</a></li>
                <li><a href="#">MONEY</a></li>
                <li><a href="#">ABOUT</a></li>
                <li><a href="#">CONTACT</a></li>
            </ul>
        </nav>
        </div>
      </header>

      <div className={s["toolbarMargin"]} />
    </>
  );
};

export default Header;
