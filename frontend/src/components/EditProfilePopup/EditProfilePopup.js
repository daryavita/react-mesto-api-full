import { useEffect, useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import Input from "../Input/Input";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const {
    values,
    setValues,
    handleChange,
    errors,
    setErrors,
    isValid,
    resetForm,
  } = useFormWithValidation();

  useEffect(() => {
    setValues(currentUser);
  }, [currentUser, setValues, isOpen]);

  useEffect(() => {
    setErrors("");
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let { name, about } = values;
    onUpdateUser({
      name: name,
      about: about,
    });
    resetForm();
  };

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit"
      textButton="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <Input
        type="text"
        name="name"
        placeholder="Имя"
        required
        minLength="2"
        maxLength="40"
        onChange={handleChange}
        value={values.name || ""}
        editForm={true}
        errorMessage={errors.name}
      />
      <Input
        type="text"
        name="about"
        className="input popup__input-info_type_job"
        placeholder="О себе"
        required
        minLength="2"
        maxLength="40"
        onChange={handleChange}
        value={values.about || ""}
        editForm={true}
        errorMessage={errors.about}
      />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
