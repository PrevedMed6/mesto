//Найти все необходимые элементы формы
const openEditFormButton = document.querySelector('.profile__edit-button');
const closeEditFormButton = document.querySelectorAll('.popup__close');
const addPhotoButton = document.querySelector('.profile__add-photo');
const editPopup =  document.querySelector('#popup-edit');
const addCardPopup =  document.querySelector('#popup-add-card');
const picturePopup =  document.querySelector('#popup-picture');
const nameInput = editPopup.querySelector('#name-input');
const jobInput = editPopup.querySelector('#job-input');
const cardName = addCardPopup.querySelector('#card-name');
const cardLink = addCardPopup.querySelector('#card-link');
const bigPhoto = picturePopup.querySelector('.popup__big-photo');
const bigPhotoTitle = picturePopup.querySelector('.popup__picture-title');
const currentName = document.querySelector('.profile__title');
const currentJob = document.querySelector('.profile__job');
const cardsGrid = document.querySelector('.elements__grid');

//Открыть окно редактирования
function openEditForm () {
  //Подставить полученные значения в поля формы
  nameInput.value = currentName.textContent;
  jobInput.value = currentJob.textContent;
  tooglePopup(editPopup)
}

// Обработчик «отправки» формы редактирования
function editFormSubmitHandler (evt) {
    evt.preventDefault();
    currentName.textContent = nameInput.value;
    currentJob.textContent = jobInput.value
    tooglePopup(editPopup);
}
// Обработчик «отправки» формы добавления фото
function addPhotoFormSubmitHandler (evt) {
  evt.preventDefault();
  const cardItem = {
    name: cardName.value,
    link: cardLink.value
  };
  tooglePopup(addCardPopup);
  addCard(cardItem);
}
//Открыть окно добавления фото
function openAddPhotoForm() {
  //Сбросим значения, если они там есть. Делаем э то здесь. чтоб не писать условий в общем методе закрытия форм.
  const inputs = addCardPopup.querySelectorAll('.popup__input');
  inputs.forEach(function(input){
    input.value="";
  });
  tooglePopup(addCardPopup);
}

//Закрыть любой попап
function closeForm(evt)
{
  const form = evt.target.closest('.popup');
  tooglePopup(form);
}
//Открыть или закрыть указанный попап
function tooglePopup(popupElement)
{
  popupElement.classList.toggle('popup_opened');
  //обеспечиваем анимацию закрытия попапа. поскольку при загрузке страницы у нас нет модификатора, то нельзя обойтись просто toggle
  if(popupElement.classList.contains('popup_opened'))
  {
    popupElement.classList.remove('popup_closed');
  }
  else
  {
    popupElement.classList.add('popup_closed');
  }
}

//обработчик клика на лайк
function likeButtonClickHandler(evt)
{
  var thisButton = evt.target;
  thisButton.classList.toggle('element__heart_active');
}

//обработчик клика на корзину
function deleteButtonClickHandler(evt)
{
  var thisButton = evt.target;
  var deletingElement = thisButton.closest('.element');
  deletingElement.remove();
}

//Добавить карточку в грид
function addCard(cardItem)
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
    bigPhoto.src = cardLink;
    bigPhoto.setAttribute('alt',cardName);
    bigPhotoTitle.textContent = cardName;
    tooglePopup(picturePopup);
  });
  const buttonLike = newCard.querySelector('.element__heart');
  buttonLike.addEventListener('click',likeButtonClickHandler);
  const buttonDelete = newCard.querySelector('.element__delete');
  buttonDelete.addEventListener('click',deleteButtonClickHandler);
  cardsGrid.prepend(newCard);
}
//Добавить стартовые карточки
function initPage()
{
  const initialCards = [
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

  initialCards.forEach(addCard);
}

//Добавить все необходимые события
openEditFormButton.addEventListener('click',openEditForm);
editPopup.addEventListener('submit', editFormSubmitHandler);
addCardPopup.addEventListener('submit', addPhotoFormSubmitHandler);
closeEditFormButton.forEach(function(closeButton) {
  closeButton.addEventListener('click',closeForm)
});
addPhotoButton.addEventListener('click', openAddPhotoForm);
initPage();





