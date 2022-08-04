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
  nameCurrentSelector,
  jobCurrentSelector,
  avatarSelector,
  buttonOpenEditForm,
  buttonAddPhoto,
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
const popupAddPhoto = new PopupWithForm(popupAddPhotoSelector,(evt)=>{
    evt.preventDefault();
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
const popupEditProfile = new PopupWithForm(popupEditProfileSelector,(evt)=>{
    evt.preventDefault();
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
        let method = 'DELETE';
        if(!newCard._ifILikeIt)
        {
          method = 'PUT';
        }
        api.toggleLikes(newCard.cardId,method).then((res)=>{
          newCard._likesCount = res.likes?.length ?? 0;
          newCard._ifILikeIt = res.likes?.some((like)=>{return like._id === me});
          newCard._spanLikes.textContent = newCard._likesCount;
          newCard._buttonLike.classList.toggle(newCard._activeLikeClass);
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





