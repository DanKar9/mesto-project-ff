
const elem = document.querySelector('#card-template').content
const cardsContainer = document.querySelector('.places__list')


initialCards.forEach((item) => {
    const cardElement = createCard(item,deleteCard)
    cardsContainer.append(cardElement)
})


function deleteCard (event) {
    const listItem = event.target.closest('.card')
            listItem.remove()
}

function createCard(item, deleteCard) {
  const  card = elem.querySelector('.card').cloneNode(true)
    card.querySelector('.card__image').src = item.link
    card.querySelector('.card__image').alt = 'фото'
    card.querySelector('.card__title').textContent = item.name


    card.addEventListener('click', deleteCard)

        return card
}

