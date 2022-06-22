function ImagePopup({ card, onClose }) {
  return (
    <div
      className={`popup popup-open-card ${card?.link && 'popup_opened'}`}
    >
      <figure className="popup-open-card__container">
        <img
          src={card.link}
          alt={card.name}
          className="popup-open-card__image"
        />
        <button
          type="button"
          className="popup__close button-hover"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
        <figcaption className="popup-open-card__title">{card.name}</figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;
