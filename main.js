(()=>{"use strict";var e="",t=[{name:"Вода под водой",link:e+"c47e58f3359d2aa86de6.jpg"},{name:"Северный Ледовитый океан",link:e+"1c23c1c4154e235f520e.jpg"},{name:"Атолл",link:e+"538d6da7e4ca4315d890.jpg"},{name:"Южные моря",link:e+"b41e99c8822c4d47c71f.jpg"},{name:"Пляж для звезды",link:e+"23ddd5fe4730ca98627f.jpg"},{name:"Большой барьерный риф",link:e+"f98fe93819eedc028bbf.jpg"}],n=document.querySelector(".profile__edit-button"),r=document.querySelector(".profile__add-photo"),o={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},i={templateSelector:".grid-card",listElementSelector:".element",imageContainer:".element__image-container",titleSelector:".element__title-text",likeSelector:".element__heart",activeLikeClass:"element__heart_active",deleteSelector:".element__delete"};function a(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var l=function(){function e(t,n){var r,o,i=t.dataItem,a=t.handleCardClick;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._name=null!==(r=null==i?void 0:i.name)&&void 0!==r?r:"Картинка без названия",this._link=null!==(o=null==i?void 0:i.link)&&void 0!==o?o:"#",this._templateSelector=n.templateSelector,this._listElementSelector=n.listElementSelector,this._imageContainer=n.imageContainer,this._titleSelector=n.titleSelector,this._likeSelector=n.likeSelector,this._activeLikeClass=n.activeLikeClass,this._deleteSelector=n.deleteSelector,this._handleCardClick=a}var t,n;return t=e,(n=[{key:"_getTemplate",value:function(){var e=document.querySelector(this._templateSelector).content;this._card=e.querySelector(this._listElementSelector).cloneNode(!0),this._cardImage=this._card.querySelector(this._imageContainer),this._cardHeader=this._card.querySelector(this._titleSelector),this._buttonLike=this._card.querySelector(this._likeSelector),this._buttonDelete=this._card.querySelector(this._deleteSelector)}},{key:"_setCardData",value:function(){this._cardImage.style.backgroundImage="url(".concat(this._link,")"),this._cardImage.setAttribute("aria-label",this._name),this._cardHeader.setAttribute("title",this._name),this._cardHeader.textContent=this._name}},{key:"_addEventListeners",value:function(){var e=this;this._cardImage.addEventListener("click",(function(){e._handleCardClick({link:e._link,name:e._name})})),this._buttonLike.addEventListener("click",(function(){e._buttonLike.classList.toggle(e._activeLikeClass)})),this._buttonDelete.addEventListener("click",(function(){e._card.remove()}))}},{key:"getCard",value:function(){return this._getTemplate(),this._setCardData(),this._addEventListeners(),this._card}}])&&a(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function s(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var u=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._nameCurrent=document.querySelector(t),this._jobCurrent=document.querySelector(n)}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(){return{name:this._nameCurrent.textContent,job:this._jobCurrent.textContent}}},{key:"setUserInfo",value:function(e){var t=e.name,n=e.job;this._nameCurrent.textContent=t,this._jobCurrent.textContent=n}}])&&s(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function c(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var f=function(){function e(t,n){var r=t.items,o=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._items=r,this._renderer=o,this._container=document.querySelector(n)}var t,n;return t=e,(n=[{key:"renderItems",value:function(){var e=this;this._items.forEach((function(t){e._renderer(t)}))}},{key:"addItem",value:function(e,t){this._renderer(e,t)}}])&&c(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function p(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var d=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._popup=document.querySelector(t),this._handleEscClose=this._handleEscClose.bind(this)}var t,n;return t=e,(n=[{key:"_handleEscClose",value:function(e){"Escape"===e.key&&this.close()}},{key:"_ifNeedToClose",value:function(e){return e.classList.contains("popup__close")||e.classList.contains("popup_opened")}},{key:"open",value:function(){document.addEventListener("keydown",this._handleEscClose),this._popup.classList.add("popup_opened")}},{key:"close",value:function(){document.removeEventListener("keydown",this._handleEscClose),this._popup.classList.remove("popup_opened")}},{key:"setEventListeners",value:function(){var e=this;this._popup.addEventListener("click",(function(t){var n=t.target;e._ifNeedToClose(n)&&e.close()}))}}])&&p(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function _(e){return _="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},_(e)}function h(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function y(){return y="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=v(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},y.apply(this,arguments)}function v(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=g(e)););return e}function b(e,t){return b=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},b(e,t)}function m(e,t){if(t&&("object"===_(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function g(e){return g=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},g(e)}var k=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&b(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=g(r);if(o){var n=g(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return m(this,e)});function a(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(t=i.call(this,e))._photoZoomed=t._popup.querySelector(".popup__big-photo"),t._photoZoomedTitle=t._popup.querySelector(".popup__picture-title"),t}return t=a,(n=[{key:"open",value:function(e){var t=e.link,n=e.name;this._photoZoomed.src=t,this._photoZoomed.setAttribute("alt",n),this._photoZoomedTitle.textContent=n,y(g(a.prototype),"open",this).call(this)}}])&&h(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(d);function C(e){return C="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},C(e)}function S(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function E(){return E="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=w(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},E.apply(this,arguments)}function w(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=L(e)););return e}function j(e,t){return j=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},j(e,t)}function O(e,t){if(t&&("object"===C(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function L(e){return L=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},L(e)}var P=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&j(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=L(r);if(o){var n=L(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return O(this,e)});function a(e,t){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(n=i.call(this,e)).form=n._popup.querySelector(".popup__form"),n._inputList=n._popup.querySelectorAll(".popup__input"),n._submitCallBack=t,n}return t=a,(n=[{key:"getInputValues",value:function(){var e=this;return this._formValues={},this._inputList.forEach((function(t){e._formValues[t.name]=t.value})),this._formValues}},{key:"close",value:function(){E(L(a.prototype),"close",this).call(this),this.form.reset()}},{key:"setEventListeners",value:function(){this.form.addEventListener("submit",this._submitCallBack.bind(this)),E(L(a.prototype),"setEventListeners",this).call(this)}}])&&S(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(d);function B(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var I=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._formSelector=t.formSelector,this._inactiveButtonClass=t.inactiveButtonClass,this._inputErrorClass=t.inputErrorClass,this._errorClass=t.errorClass,this._inputSelector=t.inputSelector,this._submitButtonSelector=t.submitButtonSelector,this._formElement=n}var t,n;return t=e,(n=[{key:"_toggleButtonState",value:function(){this._hasInvalidInput(this._inputList)?this._submitButton.classList.contains(this._inactiveButtonClass)||this._disableButton():this._enableButton()}},{key:"_hasInvalidInput",value:function(){return this._formInputsList.some((function(e){return!e.validity.valid}))}},{key:"_showError",value:function(e,t){e.classList.add(this._inputErrorClass),t.classList.add(this._errorClass),t.textContent=e.validationMessage}},{key:"_hideError",value:function(e,t){e.classList.remove(this._inputErrorClass),t.classList.remove(this._errorClass),t.textContent=""}},{key:"_IsValid",value:function(e,t){e.validity.valid?this._hideError(e,t):this._showError(e,t)}},{key:"_disableButton",value:function(){this._submitButton.classList.add(this._inactiveButtonClass),this._submitButton.setAttribute("disabled","disabled")}},{key:"_enableButton",value:function(){this._submitButton.classList.remove(this._inactiveButtonClass),this._submitButton.removeAttribute("disabled")}},{key:"_setEventListeners",value:function(){var e=this;this._formElement.addEventListener("input",(function(t){var n=t.target,r=e._formElement.querySelector("#".concat(n.id,"-error"));e._IsValid(n,r),e._toggleButtonState()}))}},{key:"cleanErrors",value:function(){var e=this;this._formInputsList.forEach((function(t){var n=e._formElement.querySelector("#".concat(t.id,"-error"));e._hideError(t,n)})),this._disableButton()}},{key:"enableValidation",value:function(){this._formInputsList=Array.from(this._formElement.querySelectorAll(this._inputSelector)),this._submitButton=this._formElement.querySelector(this._submitButtonSelector),this._toggleButtonState(),this._setEventListeners()}}])&&B(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}(),q=new u(".profile__title",".profile__job"),R=new k("#popup-picture");R.setEventListeners();var T=new P("#popup-add-card",(function(e){e.preventDefault();var t=T.getInputValues();V.addItem(t,!0),T.close()}));T.setEventListeners();var x=new P("#popup-edit",(function(e){e.preventDefault();var t=x.getInputValues();q.setUserInfo(t),x.close()}));x.setEventListeners();var V=new f({items:t,renderer:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=D(e);t?V._container.prepend(n):V._container.append(n)}},".elements__grid");function D(e){return new l({dataItem:e,handleCardClick:R.open.bind(R)},i).getCard()}V.renderItems(),n.addEventListener("click",(function(){A.cleanErrors();var e=q.getUserInfo();nameInput.value=e.name,jobInput.value=e.job,x.open()})),r.addEventListener("click",(function(){Z.cleanErrors(),T.open()}));var A=new I(o,x.form),Z=new I(o,T.form);A.enableValidation(),Z.enableValidation()})();