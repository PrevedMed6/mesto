export class UserInfo {
  constructor (nameCurrentSelector,jobCurrentSelector){
    this._nameCurrent = document.querySelector(nameCurrentSelector);
    this._jobCurrent = document.querySelector(jobCurrentSelector);
  }
  getUserInfo(){
    return {name: this._nameCurrent.textContent, job: this._jobCurrent.textContent};
  }
  setUserInfo({name, job}){
    this._nameCurrent.textContent = name;
    this._jobCurrent.textContent = job;
  }
}
