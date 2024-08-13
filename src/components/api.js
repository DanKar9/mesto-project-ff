
const config = {
    baseUrl: "https://nomoreparties.co/v1/wff-cohort-20",
    headers: {
      authorization: "eb6f46de-1897-4b76-b5a5-05aeae65284b",
      "Content-Type": "application/json",
    },
  };
  
export const infoPerson = () => {
    return fetch (`${config.baseUrl}/users/me`, {
        method : "GET",
        headers: config.headers,
    
    })
    .then(handleResponse)
}

export const getCards = () => {
    return fetch (`${config.baseUrl}/cards`, {
        method: "GET",
        headers: config.headers
    })
    .then(handleResponse)
}

export const editingProfile = (name,job) => {
    return fetch (`${config.baseUrl}/users/me`, {
        method: "PATCH",
        headers : config.headers,
        body: JSON.stringify({
            name: name,
            about: job
        })
    })
    .then(handleResponse)
}

export const newSessionCard = (name,link) => {
    return fetch (`${config.baseUrl}/cards`,{
        method: "POST",
        headers:config.headers,
        body: JSON.stringify({
            name : name,
            link: link
        })
    })
    .then(handleResponse)
}

export const addLike = (cardId) => {
    return fetch (`${config.baseUrl}/cards/likes/${cardId}`, {
        method: "PUT",
        headers: config.headers
    })
    .then(handleResponse)
}

export const deleteLike = (cardId) => {
    return fetch (`${config.baseUrl}/cards/likes/${cardId} `, {
        method: "DELETE",
        headers: config.headers
    })
    .then(handleResponse)
}


export const deleteCard = (cardId) => {
    return fetch (`${config.baseUrl}/cards/${cardId}`, {
        method : "DELETE",
        headers: config.headers
    })
    .then(handleResponse)
}

export const updateAvatar = (avatar) => {
    return fetch (`${config.baseUrl}/users/me/${avatar}`,{
        method: 'PATCH',
        headers: config.headers
    })
    .then(handleResponse)
}

function handleResponse (res) {
    if (res.ok) {
     return res.json()
    }else {
       return Promise.reject(`Ошибка ${res.status}`)
    }
}


