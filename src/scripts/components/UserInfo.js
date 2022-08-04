export class UserInfo {
  constructor (nameCurrentSelector,jobCurrentSelector, avatarSelector){
    this._nameCurrent = document.querySelector(nameCurrentSelector);
    this._jobCurrent = document.querySelector(jobCurrentSelector);
    this._avatarCurrent = document.querySelector(avatarSelector);
  }
  getUserInfo(){
    return {name: this._nameCurrent.textContent, job: this._jobCurrent.textContent};
  }
  setUserInfo({name, job, avatar}){
    this._nameCurrent.textContent = name;
    this._jobCurrent.textContent = job;
    this._avatarCurrent.setAttribute("src",avatar);
  }
}
