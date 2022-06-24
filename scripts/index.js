//Подключаем необходимые импорты
import {initialCards} from './data.js';
import {validationSelectors, gridCardSelectors, popupShowPhoto, openPopup, closePopup} from './utils.js';
import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

//Найти все необходимые элементы страницы
const formElementsList = Array.from(document.querySelectorAll(validationSelectors.formSelector));
const buttonOpenEditForm = document.querySelector('.profile__edit-button');
const buttonAddPhoto = document.querySelector('.profile__add-photo');
const popupEditProfile =  document.querySelector('#popup-edit');
const popupAddPhoto =  document.querySelector('#popup-add-card');
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
  //Сбросим ошибки, если они есть. Делаем это здесь, т.к. при закрытии есть задержка (анимация) и видно, как дергаются поля
  formEditProfile.reset();
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

//Обработчик закрытия попапа
function clickPopupHandler(evt) {
  const target = evt.target;
  if (ifNeedToClose(target))
  {
    closePopup(evt.currentTarget);
  }
}

function ifNeedToClose(element){
  return element.classList.contains('popup__close')
  || element.classList.contains('popup_opened');
}

//Открыть окно добавления фото
function openAddPhotoForm() {
  //Сбросим ошибки, если они есть. Делаем это здесь, т.к. при закрытии есть задержка (анимация) и видно, как дергаются поля
  formAddPhoto.reset();
  openPopup(popupAddPhoto);
}

//Добавить карточку в грид
function renderCard(cardItem, isPrepend = false)
{
  const newCard = new Card(cardItem, gridCardSelectors).getCard();
  if(isPrepend) {
    cardsGrid.prepend(newCard);
  }
  else {
    cardsGrid.append(newCard);
  }
}

//Добавить все необходимые события
buttonOpenEditForm.addEventListener('click', openEditForm);
buttonAddPhoto.addEventListener('click', openAddPhotoForm);
formEditProfile.addEventListener('submit', editFormSubmitHandler);
formAddPhoto.addEventListener('submit', addPhotoFormSubmitHandler);
popupShowPhoto.addEventListener('click', clickPopupHandler);
popupAddPhoto.addEventListener('click', clickPopupHandler);
popupEditProfile.addEventListener('click', clickPopupHandler);

//Для каждого элемента массива карточек выполняем добавление карточки, передавая элемент массива в метод renderCard.
initialCards.forEach((cardItem) => {
  renderCard(cardItem);
});
 //Настроить валидацию всех форм
formElementsList.forEach((form)=>{
  new FormValidator(validationSelectors, form).enableValidation();
});





