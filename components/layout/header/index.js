import { AppBar, Toolbar } from "@material-ui/core";
import s from './style.module.scss';

const Header = () => {
  return (
    <>
      <header className={s['header']}>
        <div className={s["inner"]}>
          <h1>あつかんブログ 🐶</h1>
          <nav class="pc-nav">
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
