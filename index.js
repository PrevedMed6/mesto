//Найти все необходимые элементы формы
let openEditFormButton = document.querySelector('.profile__edit-button');
let closeEditFormButton = document.querySelector('.form__close');
let formElement =  document.querySelector('.form');
let nameInput = formElement.querySelector('#nameInput');
let jobInput = formElement.querySelector('#jobInput');
let currentName = document.querySelector('.profile__title');
let currentJob = document.querySelector('.profile__job')

//Открыть окно редактирования
function openEditForm () {
  //Подставить полученные значения в поля формы
  nameInput.value = currentName.textContent;
  jobInput.value = currentJob.textContent;
  formElement.classList.remove('form_closed');
}

//Закрыть окно редактирования
function closeForm () {
   formElement.classList.add('form_closed');
}

// Обработчик «отправки» формы
function formSubmitHandler (evt) {
    evt.preventDefault();
    currentName.textContent = nameInput.value;
    currentJob.textContent = jobInput.value
    closeForm();
}

//Добавить все необходимые события
openEditFormButton.addEventListener('click',openEditForm);
formElement.addEventListener('submit', formSubmitHandler);
closeEditFormButton.addEventListener('click',closeForm);




