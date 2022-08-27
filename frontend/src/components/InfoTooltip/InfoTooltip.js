import success from "../../images/success.svg";
import error from "../../images/error.svg";

function InfoTooltip({ data }) {
  const { isOpen, onClose, name, title } = data;
  let img = name === "error" ? error : success;

  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__close button-hover"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
        <img className="popup__img-status" src={img} alt={name} />
        <h3 className="popup__title popup__title_type_info">{title}</h3>
      </div>
    </div>
  );
}

export default InfoTooltip;
