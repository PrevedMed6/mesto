//Для экспорта констант и функций, которые могут пригодиться в разных классах
export const popupShowPhoto =  document.querySelector('#popup-picture');
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

//Закрытие попапа по наэатию на esc
function pressEscapeHandler(evt){
  if(evt.key === 'Escape')
  {
    const popup =  document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

//Открыть любой попап.
export function openPopup(popup) {
  document.addEventListener('keydown', pressEscapeHandler);
  popup.classList.add('popup_opened');
}
//Закрыть любой попап.
export function closePopup(popup) {
  document.removeEventListener('keydown', pressEscapeHandler);
  popup.classList.remove('popup_opened');
}
