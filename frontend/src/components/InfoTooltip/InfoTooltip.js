function InfoTooltip(props) {
  return (
    <div className={`popup ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__close button-hover"
          aria-label="Закрыть"
          onClick={props.onClose}
        ></button>
        <img className="popup__img-status" src={props.img} />
        <h3 className="popup__title popup__title_type_info">{props.title}</h3>
      </div>
    </div>
  );
}

export default InfoTooltip;
