import { AppBar, Toolbar } from "@material-ui/core";
import Header from "./header";
import Footer from "./footer";
import s from "./style.module.scss";

const Layout = ({ children }) => {
  return (
    <div className={s["wrapper"]}>
      <Header />
      <main className={s["base"]}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
