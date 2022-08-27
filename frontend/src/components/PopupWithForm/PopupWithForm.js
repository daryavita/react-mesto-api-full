function PopupWithForm({
  isOpen,
  onClose,
  title,
  name,
  onSubmit,
  children,
  textButton,
  isValid,
}) {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__close button-hover"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
        <h3 className="popup__title">{title}</h3>
        <form
          className="popup__form"
          name={name}
          onSubmit={onSubmit}
          noValidate
        >
          <fieldset className="popup__profile-info">{children}</fieldset>
          <button
            type="submit"
            className={`popup__submit ${
              isValid ? "" : "popup__submit_disabled"
            }`}
            aria-label="Сохранить"
            disabled={!isValid}
          >
            {textButton}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
