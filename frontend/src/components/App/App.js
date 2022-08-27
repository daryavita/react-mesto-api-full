import { useEffect, useState } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import ImagePopup from "../ImagePopup/ImagePopup";
import {
  CurrentUserContext,
  CardDataContext,
} from "../../contexts/CurrentUserContext";
import { api } from "../../utils/Api";
import EditProfilePopup from "../EditProfilePopup/EditProfilePopup";
import EditAvatarPopup from "../EditAvatarPopup/EditAvatarPopup";
import AddPlacePopup from "../AddPlacePopup/AddPlacePopup";
import { Route, Switch, useHistory } from "react-router-dom";
import Login from "../Login/Login";
import Register from "../Register/Register";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import * as auth from "../../utils/auth";
import Checkbox from "../Checkbox/Checkbox";
import { ThemeProvider } from "styled-components";
import { darkTheme, GlobalStyles, lightTheme } from "../../utils/theme";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [infoTooltip, setInfoTooltip] = useState({});
  const [theme, setTheme] = useState("dark");
  const history = useHistory();

  useEffect(() => {
    if (loggedIn) {
      api
        .getProfile()
        .then((res) => {
          setCurrentUser({
            name: res.name,
            about: res.about,
            avatar: res.avatar,
            id: res._id,
          });
        })
        .catch((err) => console.log(`Ошибка ${err}`));

      api
        .getInitialCards()
        .then((res) => {
          setCards(res);
        })
        .catch((err) => console.log(`Ошибка ${err}`));
    }
  }, [loggedIn]);

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      history.push("/");
      return;
    }
    history.push("/sign-in");
  }, [loggedIn]);

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
    setInfoTooltip({});
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleUpdateUser = (currentUser) => {
    api
      .editProfile(currentUser.name, currentUser.about)
      .then((res) => {
        setCurrentUser({
          name: res.name,
          about: res.about,
          avatar: res.avatar,
        });
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка ${err}`));
  };

  const handleUpdateAvatar = (currentUser) => {
    api
      .editAvatar(currentUser.avatar)
      .then((res) => {
        setCurrentUser({
          name: res.name,
          about: res.about,
          avatar: res.avatar,
        });
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка ${err}`));
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser.id);

    const request = isLiked ? api.deleteLike(card._id) : api.addLike(card._id);
    request
      .then((res) => {
        setCards((state) =>
          state.map((item) => (item._id === card._id ? res : item))
        );
      })
      .catch((err) => console.log(`Ошибка ${err}`));
  }

  function handleCardDelete(card) {
    api
      .deleteCardApi(card._id)
      .then(() => {
        setCards((prevState) => {
          return prevState.filter(
            (deleteCardApi) => deleteCardApi._id !== card._id
          );
        });
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка ${err}`));
  }

  const handleAddPlaceSubmit = (card) => {
    api
      .addCard(card.name, card.link)
      .then((res) => {
        const newCard = {
          name: res.name,
          link: res.link,
          likes: res.likes,
          owner: res.owner,
          _id: res._id,
        };
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка ${err}`));
  };

  const handleLogin = (email, password) => {
    return auth
      .authorize(email, password)
      .then((data) => {
        if (!data.token) {
          setInfoTooltip({
            title: "Произошла ошибка((",
            name: "error",
            isOpen: true,
            onClose: closeAllPopups,
          });
          return;
        }
        localStorage.setItem("jwt", data.token);
        tokenCheck();
        history.push("/");
      })
      .catch((err) => {
        setInfoTooltip({
          title: err,
          name: "error",
          isOpen: true,
          onClose: closeAllPopups,
        });
      });
  };

  const handleRegister = (email, password) => {
    return auth
      .register(email, password)
      .then((res) => {
        setInfoTooltip({
          title: "Вы успешно зарегистрировались!",
          name: "success",
          isOpen: true,
          onClose: closeAllPopups,
        });
        history.push("/sign-in");
      })
      .catch((err) => {
        setInfoTooltip({
          title: err,
          name: "error",
          isOpen: true,
          onClose: closeAllPopups,
        });
      });
  };

  const tokenCheck = () => {
    if (localStorage.getItem("jwt")) {
      let jwt = localStorage.getItem("jwt");

      auth
        .getContent(jwt)
        .then((res) => {
          if (res) {
            setUserData({
              email: res.email,
              password: res.password,
            });
            setLoggedIn(true);
          }
        })
        .catch((err) => console.log(`Ошибка ${err}`));
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
  };

  const switchTheme = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <CurrentUserContext.Provider value={currentUser}>
        <CardDataContext.Provider value={cards}>
          <GlobalStyles />
          <Checkbox onChange={switchTheme} />
          <Switch>
            <Route path="/sign-in">
              <Header theme={theme}/>
              <Login handleLogin={handleLogin} tokenCheck={tokenCheck} />
            </Route>

            <Route path="/sign-up">
              <Header theme={theme}/>
              <Register handleRegister={handleRegister} />
            </Route>

            <ProtectedRoute path="/" loggedIn={loggedIn}>
              <Header handleSignOut={handleSignOut} userData={userData} theme={theme}/>
              <Main
                onEditProfile={handleEditProfileClick}
                onEditAvatar={handleEditAvatarClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />
            </ProtectedRoute>
          </Switch>

          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

          <PopupWithForm
            title="Вы уверены?"
            name="delete-card"
            textButton="Да"
          ></PopupWithForm>

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />

          <InfoTooltip data={infoTooltip} />
        </CardDataContext.Provider>
      </CurrentUserContext.Provider>
    </ThemeProvider>
  );
}

export default App;
