import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = useContext(CurrentUserContext);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit"
      textButton="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div>
        <input
          type="text"
          id="name-input"
          name="name"
          className="input popup__input-info_type_name"
          placeholder="Имя"
          required
          minLength="2"
          maxLength="40"
          onChange={handleChangeName}
          value={name || ''}
        />
        <span
          className="popup__error popup__error_visible"
          id="name-input-error"
        ></span>
      </div>
      <div>
        <input
          type="text"
          id="job-input"
          name="job"
          className="input popup__input-info_type_job"
          placeholder="О себе"
          required
          minLength="2"
          maxLength="200"
          onChange={handleChangeDescription}
          value={description || ''}
        />
        <span
          className="popup__error popup__error_visible"
          id="job-input-error"
        ></span>
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
