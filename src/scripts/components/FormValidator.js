export class FormValidator
{
  constructor(validationSelectors, formElement) {
    this._formSelector = validationSelectors.formSelector;
    this._inactiveButtonClass = validationSelectors.inactiveButtonClass;
    this._inputErrorClass = validationSelectors.inputErrorClass;
    this._errorClass = validationSelectors.errorClass;
    this._inputSelector = validationSelectors.inputSelector;
    this._submitButtonSelector = validationSelectors.submitButtonSelector;
    this._formElement = formElement;
  }

  //переключить состояние кнопки в зависимости от состояния полей ввода
  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList))
    {
      if (!this._submitButton.classList.contains(this._inactiveButtonClass))
      {
        this._disableButton();
      }
    }
    else
    {
      this._enableButton()
    }
  };

  //Проверить, есть ли на форме хотя бы один некорректный ввод
  _hasInvalidInput() {
     return this._formInputsList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  //Показать пользователю ошибку
  _showError(input,errorSpan) {
    input.classList.add(this._inputErrorClass);
    errorSpan.classList.add(this._errorClass);
    errorSpan.textContent = input.validationMessage;
  };

  //Спрятать ошибку
  _hideError (input,errorSpan) {
    input.classList.remove(this._inputErrorClass);
    errorSpan.classList.remove(this._errorClass);
    errorSpan.textContent = '';
  };

  //Проверить, валидно ли поле в данный момент
  _IsValid (input, errorSpan) {
    if(!input.validity.valid)
    {
      this._showError(input,errorSpan);
    }
    else
    {
      this._hideError(input,errorSpan);
    }
  };

  //деактивировать кнопку
  _disableButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.setAttribute('disabled','disabled');
  }
  //активировать кнопку
  _enableButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.removeAttribute('disabled');
  }

  _setEventListeners() {
    this._formElement.addEventListener('input',((evt)=>{
      const input = evt.target;
      const errorSpan = this._formElement.querySelector(`#${input.id}-error`);
      this._IsValid(input, errorSpan);
      this._toggleButtonState();
      }
    ));
  }

  //Почистить форму от ошибок
  cleanErrors() {
    this._formInputsList.forEach(inputElement => {
      const errorSpan = this._formElement.querySelector(`#${inputElement.id}-error`);
      this._hideError(inputElement,errorSpan);
    });
    this._disableButton();
  }

  //Настроить валидацию формы
  enableValidation() {
    this._formInputsList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._submitButton = this._formElement.querySelector(this._submitButtonSelector);
    this._toggleButtonState();
    this._setEventListeners();
  }
}
