export class Popup {
  constructor (popupSelector){
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
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
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.classList.add('popup_opened');
  }
  close(){
    document.removeEventListener('keydown', this._handleEscClose);
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
