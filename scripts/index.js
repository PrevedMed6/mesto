//Найти все необходимые элементы формы
const buttonOpenEditForm = document.querySelector('.profile__edit-button');
const buttonCloseEditForm = document.querySelectorAll('.popup__close');
const buttonAddPhoto = document.querySelector('.profile__add-photo');
const popupEditProfile =  document.querySelector('#popup-edit');
const popupAddPhoto =  document.querySelector('#popup-add-card');
const formAddPhoto = popupAddPhoto.querySelector('.popup__form');
const popupShowPhoto =  document.querySelector('#popup-picture');
const nameInput = popupEditProfile.querySelector('#name-input');
const jobInput = popupEditProfile.querySelector('#job-input');
const cardName = popupAddPhoto.querySelector('#card-name');
const cardLink = popupAddPhoto.querySelector('#card-link');
const photoZoomed = popupShowPhoto.querySelector('.popup__big-photo');
const photoZoomedTitle = popupShowPhoto.querySelector('.popup__picture-title');
const nameCurrent = document.querySelector('.profile__title');
const jobCurrent = document.querySelector('.profile__job');
const cardsGrid = document.querySelector('.elements__grid');

//Открыть окно редактирования профиля
function openEditForm () {
  //Подставить полученные значения в поля формы
  nameInput.value = nameCurrent.textContent;
  jobInput.value = jobCurrent.textContent;
  openPopup(popupEditProfile);
}

// Обработчик «отправки» формы редактирования
function editFormSubmitHandler (evt) {
    evt.preventDefault();
    nameCurrent.textContent = nameInput.value;
    jobCurrent.textContent = jobInput.value
    closePopup(popupEditProfile);
}
// Обработчик «отправки» формы добавления фото
function addPhotoFormSubmitHandler (evt) {
  evt.preventDefault();
  const cardItem = {
    name: cardName.value,
    link: cardLink.value
  };
  //Закрываем форму
  closePopup(popupAddPhoto);
  //Добавляем карточку, переиспользуя метод добавления карточки
  renderCard(cardItem, true);
}
//Открыть окно добавления фото
function openAddPhotoForm() {
  //Сбросим значения, если они там есть. Делаем это здесь, чтоб не писать условий в общем методе закрытия форм.
  formAddPhoto.reset();
  openPopup(popupAddPhoto);
}

function openShowPhotoForm(cardLink, cardName) {
  photoZoomed.src = cardLink;
  photoZoomed.setAttribute('alt',cardName);
  photoZoomedTitle.textContent = cardName;
  openPopup(popupShowPhoto);
}

//Закрыть любой попап.
function closePopup(popup)
{
  popup.classList.remove('popup_opened');
  popup.classList.add('popup_closed');
}
//Открыть любой попап.
function openPopup(popup)
{
  popup.classList.remove('popup_closed');
  popup.classList.add('popup_opened');
}

//обработчик клика на лайк
function likeButtonClickHandler(evt)
{
  const thisButton = evt.target;
  thisButton.classList.toggle('element__heart_active');
}

//обработчик клика на корзину
function deleteButtonClickHandler(evt)
{
  const thisButton = evt.target;
  const deletingElement = thisButton.closest('.element');
  deletingElement.remove();
}

//Добавить карточку в грид
function renderCard(cardItem, isPrepend = false)
{
  const newCard = makeCard(cardItem);
  if(isPrepend) {
    cardsGrid.prepend(newCard);
  }
  else {
    cardsGrid.append(newCard);
  }
}

//Подготовить карточку для добавления в грид
function makeCard(cardItem)
{
  const cardTemplate = document.querySelector('#grid_card').content;
  const cardLink = cardItem?.link??'#';
  const cardName = cardItem?.name??'Картинка без названия';
  const newCard = cardTemplate.querySelector('.element').cloneNode(true);
  //Наполняем контентом
  const cardImage = newCard.querySelector('.element__image-container');
  cardImage.style.backgroundImage = `url(${cardLink})`;
  cardImage.setAttribute('aria-label', cardName);
  const cardHeader = newCard.querySelector('.element__title-text');
  cardHeader.setAttribute('title', cardName);
  cardHeader.textContent = cardName;
  //Добавляем обработчики на элементы
  cardImage.addEventListener('click', ()=>{
    openShowPhotoForm(cardLink, cardName);
  });
  const buttonLike = newCard.querySelector('.element__heart');
  buttonLike.addEventListener('click',likeButtonClickHandler);
  const buttonDelete = newCard.querySelector('.element__delete');
  buttonDelete.addEventListener('click',deleteButtonClickHandler);
  return newCard;
}

//Добавить все необходимые события
buttonOpenEditForm.addEventListener('click',openEditForm);
popupEditProfile.addEventListener('submit', editFormSubmitHandler);
popupAddPhoto.addEventListener('submit', addPhotoFormSubmitHandler);
buttonCloseEditForm.forEach((closeButton) => {
    closeButton.addEventListener('click', (evt)=>{
      const popup = evt.target.closest('.popup');
      closePopup(popup);
  });
});
buttonAddPhoto.addEventListener('click', openAddPhotoForm);

//Для каждого элемента массива карточек выполняем добавление карточки, передавая элемент массива в метод renderCard.
initialCards.forEach((cardItem) => {
  renderCard(cardItem)
});




