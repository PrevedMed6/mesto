//Найти все необходимые элементы страницы
const popupsList = Array.from(document.querySelectorAll('.popup'));
const buttonOpenEditForm = document.querySelector('.profile__edit-button');
const buttonAddPhoto = document.querySelector('.profile__add-photo');
const popupEditProfile =  document.querySelector('#popup-edit');
const popupAddPhoto =  document.querySelector('#popup-add-card');
const popupShowPhoto =  document.querySelector('#popup-picture');
const photoZoomed = popupShowPhoto.querySelector('.popup__big-photo');
const photoZoomedTitle = popupShowPhoto.querySelector('.popup__picture-title');
const nameCurrent = document.querySelector('.profile__title');
const jobCurrent = document.querySelector('.profile__job');
const cardsGrid = document.querySelector('.elements__grid');

//Элементы форм
const formEditProfile = document.forms.editForm;
const nameInput = formEditProfile.elements.nameInput;
const jobInput = formEditProfile.elements.jobInput;
const formAddPhoto = document.forms.addCardForm;
const cardName = formAddPhoto.elements.cardName;
const cardLink = formAddPhoto.elements.cardLink;

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

//Обработчик клика по гриду с карточками
function clickGridHandler(evt) {
  const thisButton = evt.target;
  if(thisButton.classList.contains('element__heart'))
  {
    likeButtonClick(thisButton)
  }
  else if (thisButton.classList.contains('element__delete'))
  {
    deleteButtonClick(thisButton);
  }
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
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}
//Открыть любой попап.
function openPopup(popup) {
   popup.classList.add('popup_opened');
}

//клик на лайк
function likeButtonClick(thisButton) {
  thisButton.classList.toggle('element__heart_active');
}

//клик на корзину
function deleteButtonClick(thisButton) {
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
  return newCard;
}

//Добавить все необходимые события
buttonOpenEditForm.addEventListener('click', openEditForm);
buttonAddPhoto.addEventListener('click', openAddPhotoForm);
popupEditProfile.addEventListener('submit', editFormSubmitHandler);
popupAddPhoto.addEventListener('submit', addPhotoFormSubmitHandler);
popupsList.forEach((popup) => {
  popup.addEventListener('click', (evt)=>{
    const target = evt.target;
    if(target.classList.contains('popup__close') || target.classList.contains('popup_opened'))
    {
      closePopup(popup);
    }
  });
});
document.addEventListener('keydown', function (evt) {
  if(evt.key === 'Escape')
  {
    const popup =  document.querySelector('.popup_opened');
    if(popup)
    {
      closePopup(popup);
    }
  }
});
cardsGrid.addEventListener('click', clickGridHandler);
//Для каждого элемента массива карточек выполняем добавление карточки, передавая элемент массива в метод renderCard.
initialCards.forEach((cardItem) => {
  renderCard(cardItem);
});




