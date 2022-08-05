import {Popup} from './Popup.js';
export class PopupWithForm extends Popup {
  constructor (popupSelector, submitButtonText, submitCallBack){
    super(popupSelector);
    this.form = this._popup.querySelector('.popup__form');
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._submitCallBack = submitCallBack;
    this._waitngText = 'Сохранение...';
    this._submitButton = this._popup.querySelector('.popup__button');
    this._submitButtonText = submitButtonText;
  }

  getInputValues(){
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  close(){
    super.close();
    this.form.reset();
    this._submitButton.textContent = this._submitButtonText;
  }
  setEventListeners(){
    this.form.addEventListener('submit', this._submitCallBack.bind(this));
    super.setEventListeners();
  }

  setWaitingText(){
    this._submitButton.textContent = this._waitngText;
  }
}
