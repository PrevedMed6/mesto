export const cardsGridSelector = '.elements__grid';
export const popupShowPhotoSelector =  '#popup-picture';
export const popupAddPhotoSelector = '#popup-add-card';
export const popupEditProfileSelector =  '#popup-edit';
export const popupConfirmSelector =  '#popup-confirm';
export const popupEditAvatarSelector = '#popup-edit-avatar';
export const nameCurrentSelector = '.profile__title';
export const jobCurrentSelector = '.profile__job';
export const avatarSelector = '.profile__avatar-picture';

//Найти все необходимые элементы страницы
export const buttonOpenEditForm = document.querySelector('.profile__edit-button');
export const buttonAddPhoto = document.querySelector('.profile__add-photo');
export const buttonEditAvatar = document.querySelector('.profile__avatar');

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
  likesCountSelector: '.element__likes-count',
  deleteSelector: '.element__delete',
}
