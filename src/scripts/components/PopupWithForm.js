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

  _getInputValues(){
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }
  _setWaitingText(){
    this._submitButton.textContent = this._waitngText;
  }
  close(){
    super.close();
    this.form.reset();
  }
  setEventListeners(){
    this.form.addEventListener('submit', (evt)=>{
      evt.preventDefault();
      this._setWaitingText();
      this._submitCallBack(this._getInputValues());
    });
    super.setEventListeners();
  }

  setNormalText(){
    this._submitButton.textContent = this._submitButtonText;
  }
}
