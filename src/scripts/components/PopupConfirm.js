import {Popup} from './Popup.js';
export class PopupConfirm extends Popup {
  constructor (popupSelector, confirmHandler){
    super(popupSelector);
    this._confirmHandler = confirmHandler.bind(this);
    this._confirmButton = document.querySelector('.popup__button_isconfirm');
  }
  open(itemToDelete){
    super.open();
    this.itemToDelete = itemToDelete;
  }
  close(){
    super.close();
  }
  setEventListeners(){
    this._confirmButton.addEventListener('click', this._confirmHandler);
    super.setEventListeners();
  }
}
