import { useEffect } from "react";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import Input from "../Input/Input";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();

  useEffect(() => {
    resetForm();
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlace({
      name: values.name,
      link: values.link,
    });
    resetForm();
  };

  return (
    <PopupWithForm
      title="Новое место"
      name="add-card"
      textButton="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <Input
        value={values.name || ""}
        onChange={handleChange}
        type="text"
        name="name"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        editForm={true}
        errorMessage={errors.name}
      />
      <Input
        value={values.link || ""}
        onChange={handleChange}
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        required
        editForm={true}
        errorMessage={errors.link}
      />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
