//Подключаем необходимые импорты
import '../pages/index.css';
import {
  cardsGridSelector,
  validationSelectors,
  gridCardSelectors,
  popupShowPhotoSelector,
  popupAddPhotoSelector,
  popupConfirmSelector,
  popupEditProfileSelector,
  popupEditAvatarSelector,
  nameCurrentSelector,
  jobCurrentSelector,
  avatarSelector,
  buttonOpenEditForm,
  buttonAddPhoto,
  buttonEditAvatar
} from './utils/constants.js';
import {Card} from './components/Card.js';
import {UserInfo} from './components/UserInfo.js';
import {Section} from './components/Section.js';
import {PopupWithImage} from './components/PopupWithImage.js';
import {PopupWithForm} from './components/PopupWithForm.js';
import {PopupConfirm} from './components/PopupConfirm.js';
import {FormValidator} from './components/FormValidator.js';
import {api} from './utils/Api.js';
let cardSection = {};
let me = {}
//Информация о пользователе
const userInfo = new UserInfo(nameCurrentSelector,jobCurrentSelector,avatarSelector);
api.getUserInfo().then((user)=>{
  userInfo.setUserInfo({name: user.name, job: user.about, avatar: user.avatar});
  me = user;
  drowCards();
}).catch((err)=>{
  console.log(err);
});

//Создаем попапы
const popupConfirm = new PopupConfirm(popupConfirmSelector,()=>{
  api.deleteCard(popupConfirm.itemToDelete.cardId).then(()=>{
    popupConfirm.itemToDelete.card.remove();
  }).catch((err)=>{
    console.log(err);
  }).finally(()=>{
    popupConfirm.close();
  });
});
popupConfirm.setEventListeners();

const popupShowPhoto = new PopupWithImage(popupShowPhotoSelector);
popupShowPhoto.setEventListeners();

const popupAddPhoto = new PopupWithForm(popupAddPhotoSelector,'Создать',(evt)=>{
    evt.preventDefault();
    popupAddPhoto.setWaitingText();
    const cardItem = popupAddPhoto.getInputValues();
    api.addNewCard(cardItem.name, cardItem.link)
    .then((res)=>{
      cardSection.addItem(res, true);
    }).catch((err)=>{
      console.log(err);
    }).finally(()=>{
      popupAddPhoto.close();
    });
  }
);
popupAddPhoto.setEventListeners();

const popupEditProfile = new PopupWithForm(popupEditProfileSelector,'Отправить',(evt)=>{
    evt.preventDefault();
    popupEditProfile.setWaitingText();
    const newUserInfo = popupEditProfile.getInputValues();
    api.setUserInfo(newUserInfo.name, newUserInfo.job).then((result)=>{
      userInfo.setUserInfo({name: result.name, job: result.about, avatar: result.avatar});
    }).catch((err)=>{
      console.log(err)
    }).finally(()=>{
      popupEditProfile.close();
    });
  }
);
popupEditProfile.setEventListeners();

const popupEditAvatar = new PopupWithForm(popupEditAvatarSelector,'Сохранить',(evt)=>{
  evt.preventDefault();
  popupEditAvatar.setWaitingText();
  const newAvatar = popupEditAvatar.getInputValues();
  api.editAvatar(newAvatar.avatar).then((result)=>{
    userInfo.setUserInfo({name: result.name, job: result.about, avatar: result.avatar});
  }).catch((err)=>{
    console.log(err)
  }).finally(()=>{
    popupEditAvatar.close();
  });
});
popupEditAvatar.setEventListeners();

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
buttonEditAvatar.addEventListener('click', ()=>{
  newAvatarValidation.cleanErrors();
  popupEditAvatar.open();
});
 //Настроить валидацию всех форм
 const profileValidation = new FormValidator(validationSelectors, popupEditProfile.form);
 const newCardValidation = new FormValidator(validationSelectors, popupAddPhoto.form);
 const newAvatarValidation = new FormValidator(validationSelectors, popupEditAvatar.form);
 profileValidation.enableValidation();
 newCardValidation.enableValidation();
 newAvatarValidation.enableValidation();

 //создаем экземпляр грида и добавляем в него карточки.
function drowCards()
{
  api.getInitialCards().then((cards)=>{
    cardSection = new Section(
      {
        items: cards,
        renderer: (item, isPrepend = false)=>{
          const newCard = createCard(item);
          if(isPrepend) {
            cardSection.container.prepend(newCard);
         }
          else {
            cardSection.container.append(newCard);
          }
        }
      },
      cardsGridSelector
    );
    cardSection.renderItems();
  })
  .catch((err)=>{
  console.log(err);
  });
}

//Создать карточку
function createCard(cardItem)
{
  const newCard = new Card(
    {
      dataItem: cardItem,
      handleCardClick: popupShowPhoto.open.bind(popupShowPhoto),
      handleLikeClick: ()=>{
        const method = !newCard.IfILikeIt()? 'PUT':'DELETE';
        api.toggleLikes(newCard.cardId,method).then((res)=>{
          newCard.setLikesSection(res);
        }).catch((err)=>{
          console.log(err);
        });
      }
    },
    gridCardSelectors,
    me._id);
    newCard.handleDeleteClick = popupConfirm.open.bind(popupConfirm, newCard);
    return newCard.getCard();
}





