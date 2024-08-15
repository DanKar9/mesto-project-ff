

import '../pages/index.css'
import { openPopup, closePopup } from "./components/modal.js";
import {  createCard,handleDelete,handleLike } from "./components/card.js";
import { clearValidation, enableValidation } from './components/validation';
import { editingProfile, getCards, infoPerson, newSessionCard, updateAvatar } from './components/api';


const cardsContainer = document.querySelector(".places__list");
const editProfilePopup = document.querySelector(".popup_type_edit");
const popupCloseButtons = document.querySelectorAll(".popup__close");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const openModalNewCard = document.querySelector(".popup_type_new-card");
const profileFormElement = document.querySelector('form[name="edit-profile"]');
const popupInputTypeName = profileFormElement.querySelector(".popup__input_type_name");
const popupInputTypeDescription = profileFormElement.querySelector(".popup__input_type_description");
const addCardForm = document.querySelector('form[name="new-place"]');
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const popupAddCard = document.querySelector('.popup__content')
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const cardLinkInput = document.querySelector(".popup__input_type_url");
const popupImage = document.querySelector(".popup_type_image");
const popupImageSrc = popupImage.querySelector(".popup__image");
const popupCaption = popupImage.querySelector(".popup__caption");
const avatar = document.querySelector('.profile__image')
let profileId
const popupEditAvatar = document.querySelector('.popup_type_change-avatar')
const popupEditAvatarSaveButton = popupEditAvatar.querySelector('.popup__form-save-button')
const popupEditAvatarCloseButton = popupEditAvatar.querySelector(".popup__close")
const avatarPhoto = document.querySelector('.profile__image')
const popupEditAvatarForm = document.querySelector(".popup__form-input-container_type_update-avatar");
const avatarLink = popupEditAvatarForm.querySelector(".popup__form-item_el_link")
const popupSaveButton = document.querySelector('.popup__button ')

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

function cardList(element,profileId) {
  const newCard = createCard(
    element,
    handleDelete,
    handleLike,
    openPopupImage,
    profileId
  )
 addCard(newCard)
}

Promise.all([infoPerson(),getCards()])
.then(([profile,cards])=> {
  profileId = profile._id
  const newAvatar = profile.avatar
  profileTitle.textContent = profile.name
  profileDescription.textContent = profile.about
  avatar.style.backgroundImage = `url('${newAvatar}')`

  cards.forEach((card) => {
    cardList(card,profileId)
  })
})  
.catch((err)=> {
  console.log(err)
})

// обработчик открытия попапа редактирования профиля
profileEditButton.addEventListener("click", function () {
  popupInputTypeName.value = profileTitle.textContent; 
  popupInputTypeDescription.value = profileDescription.textContent; 
  openPopup(editProfilePopup); 
});
// обработчик открытия попапа добавления карточки
profileAddButton.addEventListener("click", function () {
  openPopup(openModalNewCard); // открываем попап добавления карточки
});

popupEditAvatarCloseButton.addEventListener("click", () =>
  closePopup(popupEditAvatar)
);

avatarPhoto.addEventListener("click", () => {
  openPopup(popupEditAvatar);
  popupEditAvatarForm.reset();
  clearValidation(popupEditAvatarForm, validationConfig);

});

// обработчик закрытия попапа
popupCloseButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => {
    if (popup) {
      closePopup(popup); // закрываем попап в зависимости от кнопки
    }
  });
});
// обработчик отправки формы редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true,editProfilePopup)
  editingProfile(popupInputTypeName.value,popupInputTypeDescription.value)
  .then(()=> {
    profileTitle.textContent = popupInputTypeName.value;
    profileDescription.textContent = popupInputTypeDescription.value;
    closePopup(editProfilePopup);
  }) 
  .finally(()=> {
    renderLoading(false,editProfilePopup)
  })
  .catch((err) => {
    console.log(err)
  })
}
//функция открытия модального окна с картинкой
function openPopupImage(element) {
  //функция открытия модального окна с картинкой в карточке
  popupImageSrc.src = element.link;
  popupImageSrc.alt = element.name;
  popupCaption.textContent = element.name;
  openPopup(popupImage);
}
// обработчик отправки формы добавления карточки
function addCardSubmit(evt) {
  evt.preventDefault();
  renderLoading(true,openModalNewCard)
  newSessionCard(cardNameInput.value,cardLinkInput.value)
  .then((card)=> {
    cardList(card,profileId)
    closePopup(popupAddCard)
  })
  .finally(()=> {
    renderLoading(false,openModalNewCard)
  })
  .catch((err)=> console.log(err))
 
}

function addCard(element, toStart) {
  if (toStart === true) {
    cardsContainer.prepend(element);
  } else {
    cardsContainer.append(element);
  }
}

function newAvatar (evt) {
  evt.preventDefault()
  renderLoading(true,popupEditAvatar)
  updateAvatar(avatarLink.value)
  .then((res)=> {
    avatarPhoto.style.backgroundImage(`url('${res.avatar}')`)
    closePopup(popupEditAvatar)
  })
  .finally(()=> {
    renderLoading(false,popupEditAvatar)
  })
  .catch((err)=> console.log(err))
}


//уведомление пользователя о результатах загрузки
const renderLoading = (isLoading, formElement) => {
  const buttonElement = formElement.querySelector(".popup__button");
  if (isLoading) {
    buttonElement.setAttribute("data-text", buttonElement.textContent);
    buttonElement.textContent = "Сохранение...";
  } else {
    buttonElement.textContent = buttonElement.getAttribute("data-text");
    buttonElement.removeAttribute("data-text");
  }
};

popupEditAvatarForm.addEventListener('submit',newAvatar)

profileFormElement.addEventListener("submit", handleProfileFormSubmit); // обработчик отправки формы редактирования профиля
addCardForm.addEventListener("submit", addCardSubmit); // обработчик отправки формы добавления карточки

enableValidation(validationConfig)