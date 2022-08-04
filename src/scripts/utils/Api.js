class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = {};
    this._headers.authorization = options.headers.authorization;
    this._headers.ContentType = options.headers['Content-Type'];
  }

  //Получить данные о пользователе
  getUserInfo(){
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._headers.authorization
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  //Обновить данные о пользователе
  setUserInfo(name,about){
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._headers.authorization,
        'Content-Type': this._headers.ContentType
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  //Получить начальные карточки
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
    headers: {
      authorization: this._headers.authorization
    }
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  //Получить начальные карточки
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
    headers: {
      authorization: this._headers.authorization
    }
  }).then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  //Добавить карточку
  addNewCard(name,link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._headers.authorization,
        'Content-Type': this._headers.ContentType
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  deleteCard(cardId){
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._headers.authorization,
      },
    })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  toggleLikes(cardId, method){
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: method,
      headers: {
        authorization: this._headers.authorization,
      },
    })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
}


export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-46',
  headers: {
    authorization: 'edf4f2cb-d593-41af-9e86-b9e9da331453',
    'Content-Type': 'application/json'
  }
});
