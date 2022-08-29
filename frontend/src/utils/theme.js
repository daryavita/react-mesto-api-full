import { createGlobalStyle } from "styled-components";
import plus from "../images/plus.svg";
import plusBlack from "../images/plus-black.svg";
import edit from "../images/edit.svg";
import editBlack from "../images/edit-black.svg";

export const darkTheme = {
  body: "#000",
  textColor: "#FFF",
  headingColor: "#000",
  colorButton: "#000",
  colorInput: "#000",
  borderBottom: "2px solid #fff",
  imgAddBtn: `url(${plus})`,
  imgEditBtn: `url(${edit})`,
  border: "2px solid #FFF",
};

export const lightTheme = {
  body: "#e3e9ee",
  textColor: "#002b64",
  headingColor: "#002b64",
  colorButton: "#e3e9ee",
  colorInput: "#e3e9ee",
  borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
  imgAddBtn: `url(${plusBlack})`,
  imgEditBtn: `url(${editBlack})`,
  border: "2px solid #002b64",
};

export const GlobalStyles = createGlobalStyle`
   body {
    background: ${(props) => props.theme.body};
    color: ${(props) => props.theme.textColor};
    transition: .3s ease;
   }
   h2,h3{
     color: ${(props) => props.theme.headingColor};
   }
   a{
    color: ${(props) => props.theme.textColor};
   }
   button{
    background-color: ${(props) => props.theme.colorButton};
    color: ${(props) => props.theme.textColor};
   }
   .input_theme_auth {
    background: ${(props) => props.theme.colorInput};
    border-bottom: ${(props) => props.theme.borderBottom};
    color: ${(props) => props.theme.textColor};

   }
   .checkbox {
    color: ${(props) => props.theme.textColor};
   }
   .profile__add-button {
    background-image: ${(props) => props.theme.imgAddBtn};
    border: ${(props) => props.theme.border};
   }
   .profile__edit-button {
    background-image: ${(props) => props.theme.imgEditBtn};
    border: ${(props) => props.theme.border};
   }
   .card__image {
    color: ${(props) => props.theme.headingColor};
   }
  `;
