import { useState } from "react";

function Login({ handleLogin }) {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userData.email || !userData.password) {
      return;
    }

    handleLogin(userData.email, userData.password).catch((err) => {
      setUserData((prev) => ({
        ...prev,
        message: err,
      }));
    });
  };

  return (
    <div className="auth-container">
      <div>
        <h3 className="auth-container__title">Вход</h3>
        <form className="popup__form" name="sign-in" onSubmit={handleSubmit}>
          <fieldset className="popup__profile-info">
            <div>
              <input
                type="email"
                name="email"
                className="input input_theme_black"
                placeholder="Email"
                required
                minLength="2"
                maxLength="40"
                onChange={handleChange}
                value={userData.email}
              />
              <span className="popup__error popup__error_visible"></span>
            </div>
            <div>
              <input
                type="password"
                name="password"
                className="input input_theme_black"
                placeholder="Пароль"
                required
                minLength="2"
                maxLength="200"
                onChange={handleChange}
                value={userData.password}
              />
              <span className="popup__error popup__error_visible"></span>
            </div>
          </fieldset>
          <button
            type="submit"
            className="popup__submit auth-container__button-submit"
            aria-label="Сохранить"
          >
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
