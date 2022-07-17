import {photoZoomed, photoZoomedTitle} from '../utils/constants.js';

class Popup {
  constructor (popupSelector){
    this._popup = document.querySelector(popupSelector);
  }
  _handleEscClose(evt){
    if(evt.key === 'Escape')
    {
      this.close();
    }
  }
  _ifNeedToClose(element){
    return element.classList.contains('popup__close')
    || element.classList.contains('popup_opened');
  }
  open(){
    document.addEventListener('keydown', this._handleEscClose.bind(this));
    this._popup.classList.add('popup_opened');
  }
  close(){
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
    this._popup.classList.remove('popup_opened');
  }
  setEventListeners(){
    this._popup.addEventListener('click', (evt)=>{
      const target = evt.target;
      if (this._ifNeedToClose(target))
      {
        this.close();
      }
    });
  }
}

export class PopupWithImage extends Popup {
  constructor (popupSelector){
    super(popupSelector);
  }
  open({link,name}){
    photoZoomed.src = link;
    photoZoomed.setAttribute('alt', name);
    photoZoomedTitle.textContent = name;
    super.open();
  }
}

export class PopupWithForm extends Popup {
  constructor (popupSelector, submitCallBack){
    super(popupSelector);
    this.form = this._popup.querySelector('.popup__form');
    this._submitCallBack = submitCallBack;
  }
  _getInputValues(){
    this._inputList = this._popup.querySelectorAll('.popup__input');
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
