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
} from '../scripts/utils/constants.js';
import {Card} from '../scripts/components/Card.js';
import {UserInfo} from '../scripts/components/UserInfo.js';
import {Section} from '../scripts/components/Section.js';
import {PopupWithImage} from '../scripts/components/PopupWithImage.js';
import {PopupWithForm} from '../scripts/components/PopupWithForm.js';
import {PopupConfirm} from '../scripts/components/PopupConfirm.js';
import {FormValidator} from '../scripts/components/FormValidator.js';
import {api} from '../scripts/components/Api.js';

//переменная для сохранения текущего пользователя
let me = {}
//Информация о пользователе
const userInfo = new UserInfo(nameCurrentSelector,jobCurrentSelector,avatarSelector);
//грид карточек
const cardSection = new Section(
  (item, isPrepend = false)=>{
    if(isPrepend) {
      cardSection.container.prepend(item);
    }
    else {
      cardSection.container.append(item);
    }
  },
  cardsGridSelector
);

//Создаем попапы
const popupConfirm = new PopupConfirm(popupConfirmSelector,()=>{
  api.deleteCard(popupConfirm.itemToDelete.cardId).then(()=>{
    popupConfirm.itemToDelete.deleteCard();
    popupConfirm.close();
  }).catch((err)=>{
    console.log(err);
  });
});
popupConfirm.setEventListeners();

const popupShowPhoto = new PopupWithImage(popupShowPhotoSelector);
popupShowPhoto.setEventListeners();

const popupAddPhoto = new PopupWithForm(popupAddPhotoSelector,'Создать',(inputValues)=>{
  api.addNewCard(inputValues.name, inputValues.link)
    .then((res)=>{
      const card = createCard(res);
      cardSection.addItem(card, true);
      popupAddPhoto.close();
    }).catch((err)=>{
      console.log(err);
    }).finally(()=>{
      popupAddPhoto.setNormalText();
    });
  }
);
popupAddPhoto.setEventListeners();

const popupEditProfile = new PopupWithForm(popupEditProfileSelector,'Отправить',(inputValues)=>{
    api.setUserInfo(inputValues.name, inputValues.job).then((result)=>{
      userInfo.setUserInfo({name: result.name, job: result.about, avatar: result.avatar});
      popupEditProfile.close();
    }).catch((err)=>{
      console.log(err)
    }).finally(()=>{
      popupEditProfile.setNormalText();
    });
  }
);
popupEditProfile.setEventListeners();

const popupEditAvatar = new PopupWithForm(popupEditAvatarSelector,'Сохранить',(inputValues)=>{
  api.editAvatar(inputValues.avatar).then((result)=>{
    userInfo.setUserInfo({name: result.name, job: result.about, avatar: result.avatar});
    popupEditAvatar.close();
  }).catch((err)=>{
    console.log(err)
  }).finally(()=>{
    popupEditAvatar.setNormalText();
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

 //рендерим карточки
function drowCards(cards)
{
  const cardElements = cards.map((card)=>{
    return createCard(card);
  });
  cardSection.renderItems(cardElements);
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

Promise.all([
  api.getUserInfo(),
  api.getInitialCards() ])
  .then(([user, initialCards])=>{
    userInfo.setUserInfo({name: user.name, job: user.about, avatar: user.avatar});
    me = user;
    drowCards(initialCards);
  })
  .catch((err)=>{
    console.log(err);
});

 //Настроить валидацию всех форм
 const profileValidation = new FormValidator(validationSelectors, popupEditProfile.form);
 const newCardValidation = new FormValidator(validationSelectors, popupAddPhoto.form);
 const newAvatarValidation = new FormValidator(validationSelectors, popupEditAvatar.form);
 profileValidation.enableValidation();
 newCardValidation.enableValidation();
 newAvatarValidation.enableValidation();





