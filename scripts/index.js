//Подключаем необходимые импорты
import {
  initialCards,
  cardsGridSelector,
  validationSelectors,
  gridCardSelectors,
  popupShowPhotoSelector,
  popupAddPhotoSelector,
  popupEditProfileSelector,
  nameCurrentSelector,
  jobCurrentSelector,
  buttonOpenEditForm,
  buttonAddPhoto,
} from './utils/constants.js';
import {Card} from './components/Card.js';
import {UserInfo} from './components/UserInfo.js';
import {Section} from './components/Section.js';
import {PopupWithForm, PopupWithImage} from './components/Popup.js';
import {FormValidator} from './components/FormValidator.js';

//Информация о пользователях
const userInfo = new UserInfo(nameCurrentSelector,jobCurrentSelector);
//Создаем попапы
const popupShowPhoto = new PopupWithImage(popupShowPhotoSelector);
popupShowPhoto.setEventListeners();
const popupAddPhoto = new PopupWithForm(popupAddPhotoSelector,(evt)=>{
    evt.preventDefault();
    const cardItem = popupAddPhoto._getInputValues();
    cardSection.addItem(cardItem, true);
    popupAddPhoto.close();
  }
);
popupAddPhoto.setEventListeners();
const popupEditProfile = new PopupWithForm(popupEditProfileSelector,(evt)=>{
    evt.preventDefault();
    const newUserInfo = popupEditProfile._getInputValues();
    userInfo.setUserInfo(newUserInfo);
    popupEditProfile.close();
  }
);
popupEditProfile.setEventListeners();
//создаем экземпляр грида и добавляем в него карточки.
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item, isPrepend = false)=>{
      const newCard = createCard(item);
      if(isPrepend) {
        cardSection._container.prepend(newCard);
      }
      else {
        cardSection._container.append(newCard);
      }
    }
  },
  cardsGridSelector
);
cardSection.renderItems();

//Создать карточку
function createCard(cardItem)
{
  const newCard = new Card(
    {
      dataItem: cardItem,
      handleCardClick: popupShowPhoto.open.bind(popupShowPhoto)
    },
    gridCardSelectors).getCard();
  return newCard;
}

//Добавить все необходимые события
buttonOpenEditForm.addEventListener('click', ()=>{
  profileValidation.cleanErrors();
  const info = userInfo.getUserInfo();
  nameInput.value = info.name;
  jobInput.value = info.job;
  popupEditProfile.open();
});
buttonAddPhoto.addEventListener('click', ()=>{
  newCardValidation.cleanErrors();
  popupAddPhoto.open();
});

 //Настроить валидацию всех форм
 const profileValidation = new FormValidator(validationSelectors, popupEditProfile.form);
 const newCardValidation = new FormValidator(validationSelectors, popupAddPhoto.form);
 profileValidation.enableValidation();
 newCardValidation.enableValidation();





