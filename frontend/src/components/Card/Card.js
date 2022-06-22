import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Card({ card, cardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser.id;

  const cardDeleteButtonClassName = `card__delete ${
    isOwn ? "card__delete_visible" : "card__delete_hidden"
  }`;

  const isLiked = card.likes.some(i => i === currentUser.id);
  
  const cardLikeButtonClassName = `card__like ${
    isLiked ? "card__like_active" : " "
  }`;

  function handleClick() {
    cardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card)
  }

  function handleDeleteClick() {
    onCardDelete(card)
  }

  return (
    <div id={card._id}>
      <article className="card" >
        <button
          type="button"
          className={`${cardDeleteButtonClassName} button-hover`}
          aria-label="Удалить"
          onClick={handleDeleteClick}
        ></button>
        <img src={card.link} alt={card.name} className="card__image" onClick={handleClick}/>
        <div className="card__container">
          <h2 className="card__title">{card.name}</h2>
          <div className="card__like-container">
            <button
              type="button"
              className={cardLikeButtonClassName}
              aria-label="Нравится"
              onClick={handleLikeClick}
            ></button>
            <span className="card__like-count">{card.likes.length}</span>
          </div>
        </div>
      </article>
    </div>
  );
}

export default Card;
