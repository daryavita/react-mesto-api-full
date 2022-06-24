import { useContext } from "react";
import defaultAvatar from "../../images/defaultAvatar.webp";
import Card from "../Card/Card";
import {
  CurrentUserContext
} from "../../contexts/CurrentUserContext";

function Main({
  onEditProfile,
  onEditAvatar,
  onAddPlace,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div>
      <main className="content">
        <section className="profile">
          <div className="profile__avatar-container">
            <img
              src={currentUser.avatar ? currentUser.avatar : defaultAvatar}
              alt="аватар"
              className="profile__avatar"
            />
            <button
              onClick={onEditAvatar}
              type="button"
              className="profile__add-avatar-button"
              aria-label="Добавить"
            ></button>
          </div>
          <div className="profile__info">
            <div className="profile__text">
              <h1 className="profile__title">{currentUser.name}</h1>
              <p className="profile__subtitle">{currentUser.about}</p>
            </div>
            <button
              onClick={onEditProfile}
              type="button"
              className="profile__edit-button button-hover"
              aria-label="Редактировать"
            ></button>
          </div>
          <button
            onClick={onAddPlace}
            type="button"
            className="profile__add-button button-hover"
            aria-label="Добавить"
          ></button>
        </section>

        <section>
          <div className="cards-list">
            {cards.map((card) => (
              <Card
                key={card._id}
                card={card}
                cardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Main;
