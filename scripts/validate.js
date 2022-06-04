function enableValidation(settings)
{
  //получить все формы по указанному селектору
  const formElementsList = Array.from(document.querySelectorAll(settings.formSelector));

  //переключить состояние кнопки в зависимости от состояния полей ввода
  const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList))
    {
      if (!buttonElement.classList.contains(settings.inactiveButtonClass))
      {
        disableButton(buttonElement);
      }
    }
    else
    {
      enableButton(buttonElement)
    }
  };

  //Проверить, есть ли на форме хотя бы один некорректный ввод
  const hasInvalidInput = (inputList) => {
     return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  //Показать пользователю ошибку
  const showError=(input,errorSpan)=>{
    input.classList.add(settings.inputErrorClass);
    errorSpan.classList.add(settings.errorClass);
    errorSpan.textContent = input.validationMessage;
  };

  //Спрятать ошибку
  const hideError=(input,errorSpan)=>{
    input.classList.remove(settings.inputErrorClass);
    errorSpan.classList.remove(settings.errorClass);
    errorSpan.textContent = '';
  };

  //Проверить, валидно ли поле в данный момент
  const IsValid = (input, errorSpan)=>{
    if(!input.validity.valid)
    {
      showError(input,errorSpan);
    }
    else
    {
      hideError(input,errorSpan);
    }
  };

  //Удалить указанный класс с элементов
  const clearElements = (elements, className)=>{
    elements.forEach((span)=>{
      span.classList.remove(className);
    });
  };

  //Почистить форму от ошибок
  const cleanErrors=(form, buttonElement)=>{
    const activeErrors = form.querySelectorAll(`.${settings.errorClass}`);
    const errorInputs = form.querySelectorAll(`.${settings.inputErrorClass}`);
    clearElements(activeErrors, settings.errorClass);
    clearElements(errorInputs, settings.inputErrorClass);
    disableButton(buttonElement);
  };

  //деактивировать кнопку
  function disableButton(button)
  {
    button.classList.add(settings.inactiveButtonClass);
    button.setAttribute('disabled','disabled');
  }
  //активировать кнопку
  function enableButton(button)
  {
    button.classList.remove(settings.inactiveButtonClass);
    button.removeAttribute('disabled');
  }

  //Настроить валидацию формы
  const setupFormValidation = (form)=>{
    const formInputsList = Array.from(form.querySelectorAll(settings.inputSelector));
    const submitButton = form.querySelector(settings.submitButtonSelector);
    toggleButtonState(formInputsList, submitButton);
    form.addEventListener('input',((evt)=>{
      const input = evt.target;
      const errorSpan = form.querySelector(`#${input.id}-error`);
      IsValid(input, errorSpan);
      toggleButtonState(formInputsList, submitButton);
      }
    ));
    form.addEventListener('reset', ()=>cleanErrors(form,submitButton));
  }

  //Настроить валидацию всех форм
  formElementsList.forEach((form)=>{
    setupFormValidation(form);
  });
}
