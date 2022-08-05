export class Card {
  constructor ({dataItem, handleCardClick, handleLikeClick}, selectors, me){
    this._name = dataItem.name ?? 'Картинка без названия';;
    this._link = dataItem.link ?? '#';
    this._likesCount = dataItem.likes?.length ?? 0;
    this.cardId = dataItem?._id ?? 0;
    this._templateSelector = selectors.templateSelector;
    this._listElementSelector = selectors.listElementSelector;
    this._imageContainer = selectors.imageContainer;
    this._titleSelector = selectors.titleSelector;
    this._likeSelector = selectors.likeSelector;
    this._activeLikeClass = selectors.activeLikeClass;
    this._likesCountSelector = selectors.likesCountSelector;
    this._deleteSelector = selectors.deleteSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._isMyCard = dataItem.owner._id === me;
    this._ifILikeIt = dataItem.likes?.some((like)=>{return like._id === me});
    this._me = me;
  }

  //Получаем дом элементы
  _getTemplate() {
    const cardTemplate = document.querySelector(this._templateSelector).content;
    this.card = cardTemplate.querySelector(this._listElementSelector).cloneNode(true);
    this._cardImage = this.card.querySelector(this._imageContainer);
    this._cardHeader = this.card.querySelector(this._titleSelector);
    this._buttonLike = this.card.querySelector(this._likeSelector);
    this._buttonDelete = this.card.querySelector(this._deleteSelector);
    this._spanLikes = this.card.querySelector(this._likesCountSelector);
  }

  //установка данных
  _setCardData() {
    this._cardImage.style.backgroundImage = `url(${this._link})`;
    this._cardImage.setAttribute('aria-label', this._name);
    this._cardHeader.setAttribute('title', this._name);
    this._cardHeader.textContent = this._name;
    this._spanLikes.textContent = this._likesCount;
    if(!this._isMyCard)
    {
      this._buttonDelete.remove();
    }
    if(this._ifILikeIt)
    {
      this._buttonLike.classList.add(this._activeLikeClass);
    }
  }

  //Добавляем ресиверы
  _addEventListeners() {
    //Открытие попапа
    this._cardImage.addEventListener('click', ()=>{
      this._handleCardClick({link: this._link, name: this._name});
    });
    //Обработка лайка
    this._buttonLike.addEventListener('click',this._handleLikeClick);
    //удалить элемент
    this._buttonDelete.addEventListener('click', this.handleDeleteClick);
  }

  //Выдает готовую карточку
  getCard(){
    this._getTemplate();
    this._setCardData();
    this._addEventListeners();
    return this.card;
  }

  setLikesSection(res){
    this._likesCount = res.likes?.length ?? 0;
    this._ifILikeIt = res.likes?.some((like)=>{return like._id === this._me});
    this._spanLikes.textContent = this._likesCount;
    this._buttonLike.classList.toggle(this._activeLikeClass);
  }

  IfILikeIt(){
    return this._ifILikeIt;
  }
}
