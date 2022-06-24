//Импорты констант и утилит
import {photoZoomed, photoZoomedTitle, popupShowPhoto, openPopup} from './utils.js';

export class Card {
  constructor (dataItem, selectors){
    this._name = dataItem?._name ?? 'Картинка без названия';;
    this._link = dataItem?.link ?? '#';
    this._templateSelector = selectors.templateSelector;
    this._listElementSelector = selectors.listElementSelector;
    this._imageContainer = selectors.imageContainer;
    this._titleSelector = selectors.titleSelector;
    this._likeSelector = selectors.likeSelector;
    this._activeLikeClass = selectors.activeLikeClass;
    this._deleteSelector = selectors.deleteSelector;
  }

  //Получаем дом документы
  _getTemplate() {
    const cardTemplate = document.querySelector(this._templateSelector).content;
    this._card = cardTemplate.querySelector(this._listElementSelector).cloneNode(true);
    this._cardImage = this._card.querySelector(this._imageContainer);
    this._cardHeader = this._card.querySelector(this._titleSelector);
    this._buttonLike = this._card.querySelector(this._likeSelector);
    this._buttonDelete = this._card.querySelector(this._deleteSelector);
  }

  //установка данных
  _setCardData() {
    this._cardImage.style.backgroundImage = `url(${this._link})`;
    this._cardImage.setAttribute('aria-label', this._name);
    this._cardHeader.setAttribute('title', this._name);
    this._cardHeader.textContent = this._name;
  }

  //Добавляем ресиверы
  _addEventListeners() {
    //Открытие попапа
    this._cardImage.addEventListener('click', ()=>{
      photoZoomed.src = this._link;
      photoZoomed.setAttribute('alt',this._name);
      photoZoomedTitle.textContent = this._name;
      openPopup(popupShowPhoto);
    });
    //Обработка лайка
    this._buttonLike.addEventListener('click',(evt)=>{
      const thisButton = evt.target;
      thisButton.classList.toggle(this._activeLikeClass);
    });
    //удалить элемент
    this._buttonDelete.addEventListener('click',(evt)=>{
      const thisButton = evt.target;
      const deletingElement = thisButton.closest(this._listElementSelector);
      deletingElement.remove();
    });
  }

  //Выдает готовую карточку
  getCard(){
    this._getTemplate();
    this._setCardData();
    this._addEventListeners();
    return this._card;
  }
}
