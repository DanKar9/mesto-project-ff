import { addLike, deleteCard, deleteLike } from "./api";

export { createCard, handleDelete, handleLike };
// функция создания карточки
function createCard(element, handleDelete,handleLike, openPopupImage,profileId) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
 
  cardTitle.textContent = element.name;
  cardImage.src = element.link;
  cardImage.alt = element.name;

  
    const likeButton = cardElement.querySelector(".card__like-button");
    const likeCount = cardElement.querySelector('.card__like-Count')
    const deleteButton = cardElement.querySelector(".card__delete-button");

    const hasLike = element.likes.some((like) => {
      return like._id === profileId;
    });
  
    if (hasLike) {
      likeButton.classList.add("card__like-button_is-active");
    }

    likeCount.textContent = element.likes.length
  // обработчик постановки лайка
  likeButton.addEventListener("click", (evt) => {
    handleLike(evt,element._id,likeCount);
  });
  //Удаление локальных и Api карточек
  if(profileId === element.owner._id) { 
  deleteButton.addEventListener("click", (evt) =>{
    handleDelete(evt,element._id); // обработчик удаления карточки
  } )
  } else {
    deleteButton.classList.add('card__delete-button-hide')
  }

  //  открытие модального окна с картинкой
  cardImage.addEventListener("click", () => {
    openPopupImage(element.link, element.name);
  });
  return cardElement;
}

// функция удаления карточки
function handleDelete(evt,cardId) {
  deleteCard(cardId)
  .then(()=> evt.target.closest('.places__item').remove())
  .catch((err)=> console.log(err))
}
//функция постановки лайка
function handleLike(evt,cardId,likeCount) {
  const isLiked = evt.target.classList.contains('card__like-button_is-active')
  const likeMethod = isLiked ? deleteLike : addLike
  likeMethod(cardId)
  .then((res)=> {
    likeCount.textContent = res.likes.length
    evt.target.classList.toggle("card__like-button_is-active")
  })
  .catch((err)=> console.log(err))
}





