import { config, cardListSelector, cardTemplateSelector, nameProfileInput, jobProfileInput, editProfileButton, addCardProfileButton, editAvatarButton } from '../utils/constants.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js'
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { api } from '../components/Api.js';

import '../pages/index.css'
import { PopupWithConfirm } from '../components/PopupWithConfirm.js';

//api
let userId

Promise.all([api.getProfile(), api.getInitialCards()])
    .then(([profileData, initialCards]) => {
        userInfo.setUserInfo(profileData.name, profileData.about, profileData.avatar)
        userId = profileData._id
        cardsList.render(initialCards);
    })
    .catch(err => console.log(`Ошибка ${err}`))

// валидация

const formValidators = {}

const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector))
    formList.forEach((formElement) => {
        const validator = new FormValidator(config, formElement)
        const formName = formElement.getAttribute('name')

        formValidators[formName] = validator;
        validator.enableValidation();
    });
};

enableValidation(config);

// экземпляры классов

const popupTypeEditForm = new PopupWithForm({
    popupSelector: '.popup_type_edit',
    handleFormSubmit: (data) => {
        changeTextButton({ popupSelector: '.popup_type_edit', isLoading: true })
        api.editProfile(data.name, data.job)
            .then(res => {
                userInfo.setUserInfo(res.name, res.about, res.avatar);
                popupTypeEditForm.close()
            })
            .catch(err => console.log(`Ошибка ${err}`))
            .finally(() => {
                changeTextButton({ popupSelector: '.popup_type_edit', isLoading: false })
            })
    }
})

const userInfo = new UserInfo({
    profileNameSelector: '.profile__title',
    profileJobSelector: '.profile__subtitle',
    profileAvatarSelector: '.profile__avatar'
})

const cardsList = new Section({
    renderer: (data) => {
        createCard(data);
        const cardElement = createCard(data);
        cardsList.addItem(cardElement);
    },
}, cardListSelector);

const popupTypeAddCards = new PopupWithForm({
    popupSelector: '.popup_type_add-card',
    handleFormSubmit: (data) => {
        changeTextButton({ popupSelector: '.popup_type_add-card', isLoading: true })
        api.addCard(data.name, data.link)
            .then(res => {
                createCard(res);
                const cardElement = createCard(res);
                cardsList.addItem(cardElement);
                popupTypeAddCards.close()
            })
            .catch(err => console.log(`Ошибка ${err}`))
            .finally(() => {
                changeTextButton({ popupSelector: '.popup_type_add-card', isLoading: false })
            })
    }
})

const popupWithImage = new PopupWithImage('.popup-open-card');

const avatarPopup = new PopupWithForm({
    popupSelector: '.popup_type_new-avatar',
    handleFormSubmit: (data) => {
        changeTextButton({ popupSelector: '.popup_type_new-avatar', isLoading: true })
        api.editAvatar(data.avatar)
            .then(res => {
                userInfo.setUserInfo(res.name, res.about, res.avatar);
                avatarPopup.close()
            })
            .catch(err => console.log(`Ошибка ${err}`))
            .finally(() => {
                changeTextButton({ popupSelector: '.popup_type_new-avatar', isLoading: false })
            })
    }
})

const confirmPopup = new PopupWithConfirm({ popupSelector: '.popup_type_delete-card' })

// функции

function createCard(data) {
    const card = new Card(
        data,
        cardTemplateSelector,
        handleCardClick,
        (id) => {
            confirmPopup.open();
            confirmPopup.changeSubmitHandler(() => {
                api.deleteCardApi(id)
                    .then(res => {
                        card.deleteCard()
                        confirmPopup.close()
                    })
                    .catch(err => console.log(`Ошибка ${err}`))
            })
        },
        userId,
        (id) => {
            if (card.isLicked()) {
                api.deleteLike(id)
                    .then(res => {
                        card.setLikes(res.likes)
                    })
                    .catch(err => console.log(`Ошибка ${err}`))
            } else {
                api.addLike(id)
                    .then(res => {
                        card.setLikes(res.likes)
                    })
                    .catch(err => console.log(`Ошибка ${err}`))
            }
        }
    );
    const cardElement = card.createCard();
    return cardElement;
}

function changeTextButton({ popupSelector, isLoading }) {
    const popup = document.querySelector(popupSelector)
    const button = popup.querySelector('.popup__submit')
    if (isLoading) {
        button.textContent = 'Сохранение...'
    } else {
        button.textContent = 'Сохранить'
    }
}

function handleCardClick(name, link) {
    popupWithImage.open(name, link)
}

//вызовы

editProfileButton.addEventListener('click', () => {
    const { name, job } = userInfo.getUserInfo()
    nameProfileInput.value = name;
    jobProfileInput.value = job;
    formValidators['editform'].resetValidation()
    popupTypeEditForm.open();
});

addCardProfileButton.addEventListener('click', () => {
    formValidators['addform'].resetValidation()
    popupTypeAddCards.open();
});

editAvatarButton.addEventListener('click', () => {
    formValidators['avatarform'].resetValidation()
    avatarPopup.open();
})

popupTypeEditForm.setEventListeners();
popupTypeAddCards.setEventListeners();
popupWithImage.setEventListeners();
confirmPopup.setEventListeners();
avatarPopup.setEventListeners();








