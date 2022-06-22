import { useEffect, useRef, useState } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [values, setValues] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: values.name,
      link: values.link,
    });
  }

  useEffect(() => {
    setValues({});
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Новое место"
      name="add-card"
      textButton="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div>
        <input
          value={values.name || ''}
          onChange={handleChange}
          type="text"
          id="name-card-input"
          name="name"
          className="input popup__input-info_type_name-card"
          placeholder="Название"
          required
          minLength="2"
          maxLength="30"
        />
        <span
          className="popup__error popup__error_visible"
          id="name-card-input-error"
        ></span>
      </div>
      <div>
        <input
          value={values.link || ''}
          onChange={handleChange}
          type="url"
          id="link-card-input"
          name="link"
          className="input popup__input-info_type_link-card"
          placeholder="Ссылка на картинку"
          required
        />
        <span
          className="popup__error popup__error_visible"
          id="link-card-input-error"
        ></span>
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
