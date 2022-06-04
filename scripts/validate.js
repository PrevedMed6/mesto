function enableValidation(settings)
{
  //получить все формы по указанному селектору
  const formElementsList = Array.from(document.querySelectorAll(settings.formSelector));

  //переключить состояние кнопки в зависимости от состояния полей ввода
  const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList))
    {
      if(!buttonElement.classList.contains(settings.inactiveButtonClass))
      {
        buttonElement.classList.add(settings.inactiveButtonClass);
      }
    }
    else
    {
      buttonElement.classList.remove(settings.inactiveButtonClass);
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

  const clearElements = (elements, className)=>{
    elements.forEach((span)=>{
      span.classList.remove(className);
    });
  };
  const cleanErrors=(form, buttonElement)=>{
    const activeErrors = form.querySelectorAll(`.${settings.errorClass}`);
    const errorInputs = form.querySelectorAll(`.${settings.inputErrorClass}`);
    clearElements(activeErrors, settings.errorClass);
    clearElements(errorInputs, settings.inputErrorClass);
    buttonElement.classList.add(settings.inactiveButtonClass);
  };

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
