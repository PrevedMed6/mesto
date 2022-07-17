export const initialCards = [
  {
    name: 'Вода под водой',
    link: './image/boxed-water-is-better-R98l5I6OFQY-unsplash.jpg'
  },
  {
    name: 'Северный Ледовитый океан',
    link: './image/iceberg.jpg'
  },
  {
    name: 'Атол',
    link: './image/jcob-nasyr-hZPYwYR02Yo-unsplash.jpg'
  },
  {
    name: 'Южные моря',
    link: './image/joel-filipe-_AjqGGafofE-unsplash.jpg'
  },
  {
    name: 'Пляж для звезды',
    link: './image/linus-nylund-UCIZh0-OYPw-unsplash.jpg'
  },
  {
    name: 'Большой барьерный риф',
    link: './image/milos-prelevic-2xuiab6o-qc-unsplash.jpg'
  }
];

export const cardsGridSelector = '.elements__grid';
export const popupShowPhotoSelector =  '#popup-picture';
export const popupAddPhotoSelector = '#popup-add-card';
export const popupEditProfileSelector =  '#popup-edit';
export const nameCurrentSelector = '.profile__title';
export const jobCurrentSelector = '.profile__job';

//Найти все необходимые элементы страницы
const popupShowPhoto =  document.querySelector('#popup-picture');
export const buttonOpenEditForm = document.querySelector('.profile__edit-button');
export const buttonAddPhoto = document.querySelector('.profile__add-photo');
export const photoZoomed = popupShowPhoto.querySelector('.popup__big-photo');
export const photoZoomedTitle = popupShowPhoto.querySelector('.popup__picture-title');

//селекторы для валидации
export const validationSelectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}
//Селекторы для карточки
export const gridCardSelectors = {
  templateSelector: '.grid-card',
  listElementSelector: '.element',
  imageContainer: '.element__image-container',
  titleSelector: '.element__title-text',
  likeSelector: '.element__heart',
  activeLikeClass: 'element__heart_active',
  deleteSelector: '.element__delete',
}
