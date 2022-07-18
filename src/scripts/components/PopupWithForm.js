import {Popup} from './Popup.js';
export class PopupWithForm extends Popup {
  constructor (popupSelector, submitCallBack){
    super(popupSelector);
    this.form = this._popup.querySelector('.popup__form');
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._submitCallBack = submitCallBack;
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
  }
  setEventListeners(){
    this.form.addEventListener('submit', this._submitCallBack.bind(this));
    super.setEventListeners();
  }
}
