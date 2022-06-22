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
import success from "../../images/success.svg";
import error from "../../images/error.svg";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import * as auth from "../../utils/auth";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [successNotif, setSuccessNotif] = useState(false);
  const [errorNotif, setErrorNotif] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if(loggedIn) {
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
  }, [])

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
    setSuccessNotif(false);
    setErrorNotif(false);
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
    const isLiked = card.likes.some(i => i === currentUser.id);

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
          setErrorNotif(true);
          return;
        }
        localStorage.setItem("jwt", data.token);
        tokenCheck();
        history.push("/");
      })
      .catch((err) => setErrorNotif(true));
  };

  const handleRegister = (email, password) => {
    return auth
      .register(email, password)
      .then((res) => {
        setSuccessNotif(true);
        history.push("/sign-in");
      })
      .catch((err) => setErrorNotif(true));
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

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CardDataContext.Provider value={cards}>
        <Switch>
          <Route path="/sign-in">
            <Header />
            <Login handleLogin={handleLogin} tokenCheck={tokenCheck} />
          </Route>

          <Route path="/sign-up">
            <Header />
            <Register handleRegister={handleRegister} />
          </Route>

          <ProtectedRoute path="/" loggedIn={loggedIn}>
            <Header handleSignOut={handleSignOut} userData={userData} />
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

        <InfoTooltip
          title="Вы успешно зарегистрировались!"
          name="success"
          img={success}
          isOpen={successNotif}
          onClose={closeAllPopups}
        />
        <InfoTooltip
          title="Что-то пошло не так! Попробуйте еще раз."
          name="error"
          img={error}
          isOpen={errorNotif}
          onClose={closeAllPopups}
        />
      </CardDataContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
