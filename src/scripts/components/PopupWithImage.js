import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
  constructor (popupSelector){
    super(popupSelector);
    this._photoZoomed = this._popup.querySelector('.popup__big-photo');
    this._photoZoomedTitle = this._popup.querySelector('.popup__picture-title');
  }
  open({link,name}){
    this._photoZoomed.src = link;
    this._photoZoomed.setAttribute('alt', name);
    this._photoZoomedTitle.textContent = name;
    super.open();
  }
}
