const btn = document.querySelector('.profile__add-button')
const list = document.querySelector('.places__list')


function addCard() {
    initialCards.map((item) => {
        const elem = document.querySelector('#card-template').content
        let card = elem.querySelector('.card').cloneNode(true)
        card.querySelector('.card__image').src = item.link
        card.querySelector('.card__title').textContent = item.name
        list.append(card)
    })

    const btnDelete = document.querySelectorAll('.card__delete-button');
    btnDelete.forEach(elem => {
        elem.addEventListener('click', function(event) {
            const listItem = event.target.closest('.card')
            listItem.remove()
        })
    })

}



btn.addEventListener('click', function() {
    addCard()
})