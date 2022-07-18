import waterUnderWaterImage from '../../image/boxed-water-is-better-R98l5I6OFQY-unsplash.jpg';
import icebergImage from '../../image/iceberg.jpg';
import atollImage from '../../image/jcob-nasyr-hZPYwYR02Yo-unsplash.jpg';
import southSeasImage from '../../image/joel-filipe-_AjqGGafofE-unsplash.jpg';
import starImage from '../../image/linus-nylund-UCIZh0-OYPw-unsplash.jpg';
import greatBarrierReefImage from '../../image/milos-prelevic-2xuiab6o-qc-unsplash.jpg';

export const initialCards = [
  {
    name: 'Вода под водой',
    link: waterUnderWaterImage
  },
  {
    name: 'Северный Ледовитый океан',
    link: icebergImage
  },
  {
    name: 'Атолл',
    link: atollImage
  },
  {
    name: 'Южные моря',
    link: southSeasImage
  },
  {
    name: 'Пляж для звезды',
    link: starImage
  },
  {
    name: 'Большой барьерный риф',
    link: greatBarrierReefImage
  }
];

export const cardsGridSelector = '.elements__grid';
export const popupShowPhotoSelector =  '#popup-picture';
export const popupAddPhotoSelector = '#popup-add-card';
export const popupEditProfileSelector =  '#popup-edit';
export const nameCurrentSelector = '.profile__title';
export const jobCurrentSelector = '.profile__job';

//Найти все необходимые элементы страницы
export const buttonOpenEditForm = document.querySelector('.profile__edit-button');
export const buttonAddPhoto = document.querySelector('.profile__add-photo');

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
