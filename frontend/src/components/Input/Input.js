
function Input({
    type,
    name,
    minLength,
    maxLength,
    placeholder,
    onChange,
    value,
    errorMessage,
    pattern,
    editForm,
    disabled,
}) {

    return(
        <div>
        <input
        type={type}
        name={name}
        className={`input ${editForm ? "" : "input_theme_auth"}`}
        required
        minLength={minLength}
        maxLength={maxLength}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        pattern={pattern}
        disabled={disabled}
        />
        <span className="popup__error popup__error_visible">{errorMessage}</span>
      </div>

    )
}

export default Input