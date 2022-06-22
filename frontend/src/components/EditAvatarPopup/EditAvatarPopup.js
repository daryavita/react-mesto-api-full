import { useEffect, useRef } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const inputRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }

  useEffect(() => {
    inputRef.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Обновите аватар"
      name="new-avatar"
      textButton="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div>
        <input
          ref={inputRef}
          type="url"
          id="link-avatar-input"
          name="avatar"
          className="input popup__input-info_type_link-avatar"
          placeholder="Ссылка на картинку"
          required
        />
        <span
          className="popup__error popup__error_visible"
          id="link-avatar-input-error"
        ></span>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
