function PopupWithForm(props) {
  return (
    <div className={`popup ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__close button-hover"
          aria-label="Закрыть"
          onClick={props.onClose}
        ></button>
        <h3 className="popup__title">{props.title}</h3>
        <form
          className="popup__form"
          name={props.name}
          onSubmit={props.onSubmit}
        >
          <fieldset className="popup__profile-info">{props.children}</fieldset>
          <button
            type="submit"
            className="popup__submit"
            aria-label="Сохранить"
          >
            {props.textButton}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
