import { useEffect } from "react";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import Input from "../Input/Input";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();

  useEffect(() => {
    resetForm();
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateAvatar({
      avatar: values.avatar,
    });
    resetForm();
  };

  return (
    <PopupWithForm
      title="Обновите аватар"
      name="new-avatar"
      textButton="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <Input
        type="url"
        name="avatar"
        placeholder="Ссылка на картинку"
        required
        onChange={handleChange}
        value={values.avatar || ""}
        editForm={true}
        errorMessage={errors.avatar}
      />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
