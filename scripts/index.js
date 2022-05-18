//Найти все необходимые элементы формы
const openEditFormButton = document.querySelector('.profile__edit-button');
const closeEditFormButton = document.querySelector('.popup__close');
const formElement =  document.querySelector('.popup');
const nameInput = formElement.querySelector('#nameInput');
const jobInput = formElement.querySelector('#jobInput');
const currentName = document.querySelector('.profile__title');
const currentJob = document.querySelector('.profile__job');
const cardsGrid = document.querySelector('.elements__grid');

//Открыть окно редактирования
function openEditForm () {
  //Подставить полученные значения в поля формы
  nameInput.value = currentName.textContent;
  jobInput.value = currentJob.textContent;
  formElement.classList.add('popup_opened');
}

//Закрыть окно редактирования
function closeForm () {
   formElement.classList.remove('popup_opened');
}

// Обработчик «отправки» формы
function formSubmitHandler (evt) {
    evt.preventDefault();
    currentName.textContent = nameInput.value;
    currentJob.textContent = jobInput.value
    closeForm();
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
  const cardImage = newCard.querySelector('.element__image');
  cardImage.src = cardLink;
  cardImage.alt = cardName;
  const cardHeader = newCard.querySelector('.element__title-text');
  cardHeader.setAttribute('title', cardName);
  cardHeader.textContent = cardName;
  //Добавляем обработчики на элементы
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
formElement.addEventListener('submit', formSubmitHandler);
closeEditFormButton.addEventListener('click',closeForm);
initPage();





