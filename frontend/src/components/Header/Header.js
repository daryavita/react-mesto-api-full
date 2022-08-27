import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import logoBlack from "../../images/logo-black.svg";
import { Route, Switch } from "react-router-dom";

function Header({ handleSignOut, userData, theme }) {
  let { email } = userData || {};
  let logoSrc = theme === 'dark' ? logo : logoBlack

  return (
    <header className="header">
      <Link to="/">
        <img src={logoSrc} alt="логотип" className="header__logo" />
      </Link>

      <Switch>
        <Route exact path="/">
          <div className="header__links">
            <p className="header__info">{email}</p>
            <Link
              to="/sign-in"
              className="link link_hover link_type_header link_type_dark"
              onClick={handleSignOut}
            >
              Выйти
            </Link>
          </div>
        </Route>

        <Route exact path="/sign-in">
          <Link to="/sign-up" className="link link_hover link_type_header">
            Регистрация
          </Link>
        </Route>

        <Route exact path="/sign-up">
          <Link to="/sign-in" className="link link_hover link_type_header">
            Войти
          </Link>
        </Route>
      </Switch>
    </header>
  );
}

export default Header;
