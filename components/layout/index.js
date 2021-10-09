import { AppBar, Toolbar } from "@material-ui/core";
import Header from './header'
import s from './style.module.scss';

const Layout = ({children}) => {
  return (
    <>
      <Header />
      <main className={s['base']}>{children}</main>
    </>
  );
};

export default Layout;
