import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import Input from "../Input/Input";

function Login({ handleLogin }) {
  const { values, handleChange, errors, isValid } = useFormWithValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    let { email, password } = values;
    handleLogin(email, password).catch((err) => {
      console.log(`Ошибка ${err}`);
    });
  };

  return (
    <div className="auth-container">
      <div>
        <h3 className="auth-container__title">Вход</h3>
        <form className="popup__form" name="sign-in" onSubmit={handleSubmit}>
          <fieldset className="popup__profile-info">
            <Input
              type="email"
              name="email"
              placeholder="Email"
              required
              minLength="2"
              maxLength="40"
              onChange={handleChange}
              value={values.email || ""}
              pattern="\S+@\S+\.\S+"
              errorMessage={errors.email}
            />
            <Input
              type="password"
              name="password"
              placeholder="Пароль, минимум 6 знаков"
              required
              minLength="6"
              maxLength="40"
              onChange={handleChange}
              value={values.password || ""}
              errorMessage={errors.password}
            />
          </fieldset>
          <button
            type="submit"
            className={`popup__submit auth-container__button-submit ${
              isValid ? "" : "popup__submit_disabled"
            }`}
            aria-label="Войти"
            disabled={!isValid}
          >
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
