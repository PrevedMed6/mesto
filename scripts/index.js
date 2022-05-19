//Найти все необходимые элементы формы
const buttonOpenEditForm = document.querySelector('.profile__edit-button');
const buttonCloseEditForm = document.querySelectorAll('.popup__close');
const buttonAddPhoto = document.querySelector('.profile__add-photo');
const formEditProfile =  document.querySelector('#popup-edit');
const formAddPhoto =  document.querySelector('#popup-add-card');
const formShowPhoto =  document.querySelector('#popup-picture');
const nameInput = formEditProfile.querySelector('#name-input');
const jobInput = formEditProfile.querySelector('#job-input');
const cardName = formAddPhoto.querySelector('#card-name');
const cardLink = formAddPhoto.querySelector('#card-link');
const photoZoomed = formShowPhoto.querySelector('.popup__big-photo');
const photoZoomedTitle = formShowPhoto.querySelector('.popup__picture-title');
const nameCurrent = document.querySelector('.profile__title');
const jobCurrent = document.querySelector('.profile__job');
const cardsGrid = document.querySelector('.elements__grid');

//Открыть окно редактирования профиля
function openEditForm () {
  //Подставить полученные значения в поля формы
  nameInput.value = nameCurrent.textContent;
  jobInput.value = jobCurrent.textContent;
  openPopup(formEditProfile);
}

// Обработчик «отправки» формы редактирования
function editFormSubmitHandler (evt) {
    evt.preventDefault();
    nameCurrent.textContent = nameInput.value;
    jobCurrent.textContent = jobInput.value
    closePopup(evt);
}
// Обработчик «отправки» формы добавления фото
function addPhotoFormSubmitHandler (evt) {
  evt.preventDefault();
  const cardItem = {
    name: cardName.value,
    link: cardLink.value
  };
  //Закрываем форму
  closePopup(evt);
  //Добавляем карточку, переиспользуя метод добавления карточки
  renderCard(cardItem);
}
//Открыть окно добавления фото
function openAddPhotoForm() {
  //Сбросим значения, если они там есть. Делаем это здесь, чтоб не писать условий в общем методе закрытия форм.
  const form = formAddPhoto.querySelectorAll('.popup__form');
  if(form.length>0)
  {
    form[0].reset();
  }
  openPopup(formAddPhoto);
}

//Закрыть любой попап.
function closePopup(evt)
{
  //получаем форму, которую надо закрыть
  const popup = evt.target.closest('.popup');
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
function renderCard(cardItem)
{
  const newCard = makeCard(cardItem);
  //Добавляем карточку в начало грида
  cardsGrid.prepend(newCard);
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
  cardImage.addEventListener('click', function(){
    photoZoomed.src = cardLink;
    photoZoomed.setAttribute('alt',cardName);
    photoZoomedTitle.textContent = cardName;
    openPopup(formShowPhoto);
  });
  const buttonLike = newCard.querySelector('.element__heart');
  buttonLike.addEventListener('click',likeButtonClickHandler);
  const buttonDelete = newCard.querySelector('.element__delete');
  buttonDelete.addEventListener('click',deleteButtonClickHandler);
  return newCard;
}
//Для каждого элемента массива карточек выполняем добавление карточки, передавая элемент массива в метод renderCard.
initialCards.forEach(renderCard);

//Добавить все необходимые события
buttonOpenEditForm.addEventListener('click',openEditForm);
formEditProfile.addEventListener('submit', editFormSubmitHandler);
formAddPhoto.addEventListener('submit', addPhotoFormSubmitHandler);
buttonCloseEditForm.forEach(function(closeButton) {
  closeButton.addEventListener('click', closePopup)
});
buttonAddPhoto.addEventListener('click', openAddPhotoForm);
initPage();





