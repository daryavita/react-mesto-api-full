import { useState } from "react";

function Checkbox({onChange}) {
  const [checked, setChecked] = useState(true);
  const checkboxClassName = `checkbox__slider ${
    checked ? "checkbox__slider_on" : "checkbox__slider_off"
  }`;

  const handleCheck = () => {
    onChange()
    setChecked(!checked)
  }

  return (
    <label className="checkbox">
      <input
        className="checkbox__input"
        type="checkbox"
        checked={checked}
        onChange={handleCheck}
      ></input>
      <span className={checkboxClassName}></span>
      Темная тема
    </label>
  );
}

export default Checkbox;
