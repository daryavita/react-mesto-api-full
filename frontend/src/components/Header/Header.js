import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import { Route, Switch } from "react-router-dom";

function Header({ handleSignOut, userData }) {
  let { email } = userData || {};

  return (
    <header className="header">
      <a href="#">
        <img src={logo} alt="логотип" className="header__logo" />
      </a>

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
