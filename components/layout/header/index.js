import { AppBar, Toolbar } from "@material-ui/core";
import s from './style.module.scss';

const Header = () => {
  return (
    <>
      <AppBar position="fixed">
        <Toolbar>Header</Toolbar>
      </AppBar>
      <div className={s.toolbarMargin}/>
    </>
  );
};

export default Header;
