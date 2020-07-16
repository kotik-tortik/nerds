'use strict';

(function() {
  if (document.querySelector(".popup")) {
    const popup = document.querySelector(".popup");
    const popupOpenButton = document.querySelector(".contact-block__button");
    const popupCloseButton = popup.querySelector(".popup__cross-icon");
    const popupNameInput = popup.querySelector('.popup__name-input');
  
    popupOpenButton.addEventListener('click', openPopup);
    popupCloseButton.addEventListener('click', closePopup);
    popupCloseButton.addEventListener('keydown', closePopupByEnterKey);
    window.addEventListener('keydown', closePopupByEscKey);
  
    function openPopup() {
      popup.classList.add('popup-show');
      popupNameInput.focus();
    }
  
    function closePopup() {
      popup.classList.remove('popup-show');
    }
  
    function closePopupByEnterKey(e) {
      if (e.keyCode === 13) {
        closePopup();
      }
    }
  
    function closePopupByEscKey(e) {
      if (e.keyCode === 27) {
          closePopup();
      }
    }
  }
})()