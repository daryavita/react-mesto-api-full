import { Link } from "react-router-dom";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import Input from "../Input/Input";

function Register({ handleRegister }) {
  const { values, handleChange, errors, isValid } = useFormWithValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    let { email, password } = values;
    handleRegister(email, password).catch((err) =>
      console.log(`Ошибка ${err}`)
    );
  };

  return (
    <div className="auth-container">
      <div>
        <h3 className="auth-container__title">Регистрация</h3>
        <form
          className="popup__form"
          name="sign-up"
          onSubmit={handleSubmit}
          noValidate
        >
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
            aria-label="Зарегистрироваться"
            disabled={!isValid}
          >
            Зарегистрироваться
          </button>
        </form>
        <span className="auth-container__hint">
          Уже зарегистрированы?{" "}
          <Link to="/sign-in" className="link link_hover">
            Войти
          </Link>
        </span>
      </div>
    </div>
  );
}

export default Register;
