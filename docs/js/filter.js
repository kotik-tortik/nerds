'use strict';

(function() {
  if (document.querySelector('.filter')) {
    const filter = document.querySelector('.filter');
    const minPrice = filter.querySelector('.filter__price-fields-input--min');
    const maxPrice = filter.querySelector('.filter__price-fields-input--max');
    const radioAdaptiveLabels = filter.querySelectorAll('.filter__adaptive-controls-btn');
    const radioAdaptiveButtons = filter.querySelectorAll('.filter__adaptive-radio-btn');
    const radioGridLabels = filter.querySelectorAll('.filter__grid-controls-btn');
    const radioGridButtons = filter.querySelectorAll('.filter__grid-radio-btn');
    const checkboxLabels = filter.querySelectorAll('.filter__features-controls-btn');
    const checkboxButtons = filter.querySelectorAll('.filter__features-checkbox');
    const rangeBtn = filter.querySelectorAll('.filter__range-toggle');
    const resetBtn = filter.querySelector('.filter__reset-btn');

    resetBtn.addEventListener('click', (e) => {
      window.renderCards(window.data);
    });

    addDisableClass(radioAdaptiveButtons, radioAdaptiveLabels, 'disabled');
    addDisableClass(radioGridButtons, radioGridLabels, 'disabled');
    addDisableClass(checkboxButtons, checkboxLabels, 'disabled');

    clickBtnsHandler(radioAdaptiveLabels, radioAdaptiveButtons, 'filter__adaptive-controls-btn--checked');
    clickBtnsHandler(radioGridLabels, radioGridButtons, 'filter__grid-controls-btn--checked');
    clickBtnsHandler(checkboxLabels, checkboxButtons, 'filter__features-controls-btn--checked');

    filter.addEventListener('submit', (e) => {
      e.preventDefault();
      let filteredCards = [];

      for (let item of window.sortedObj) {
        let itemPrice = item['price'].replace(/\s+/g, '');
        itemPrice = parseInt(itemPrice, 10);
        
        if (itemPrice >= minPrice.value && itemPrice <= maxPrice.value){
          filteredCards.push(item);
        }
      }

      filterByGridType(radioAdaptiveLabels, radioAdaptiveButtons, 'filter__adaptive-controls-btn--checked', 'adaptive');
      filterByGridType(radioGridLabels, radioGridButtons, 'filter__grid-controls-btn--checked', 'grid_type');
      filterByFeatures(checkboxLabels, checkboxButtons, 'filter__features-controls-btn--checked');


      function filterByGridType(arrLabels, arrButtons, className, prop) {
        for (let i = 0; i < arrLabels.length; i++) {
          if (arrLabels[i].classList.contains(className)) {
            let value = arrButtons[i].value;
            filteredCards = filteredCards.filter(item => item[prop] === value);
          }
        }
      }

      function filterByFeatures(arrLabels, arrButtons, className) {
        let values = [];
        for (let i = 0; i < arrLabels.length; i++) {
          if (arrLabels[i].classList.contains(className)) {
            values.push(arrButtons[i].value);
          }
        }

        for (let prop of values) {
          filteredCards = filteredCards.filter(item => item['features'].includes(prop));
        }
      }
      window.filteredCards = filteredCards;
      window.renderCards(filteredCards);
    });

    const inputs = filter.querySelectorAll('.filter__price-fields-input');
    const arr = Array.from(rangeBtn);
    arr[0].style.left = '0px';
    arr[1].style.left = '142px';
    
    for (let item of rangeBtn) {
      item.addEventListener('mousedown', (e) => {
        e.preventDefault();

        let startCoord = e.clientX;
        const rangeScale = filter.querySelector('.filter__range-scale');
        const rangeScaleInner =filter.querySelector('.filter__range-bar');
        const rangeScaleWidth = Math.round(rangeScale.getBoundingClientRect().width);
        const rangeBtnWidth = item.getBoundingClientRect().width;
        const minCoord = Math.round(rangeScale.getBoundingClientRect().x);
        const maxCoord = Math.round(rangeScale.getBoundingClientRect().right - rangeBtnWidth);
        const maxInputValue = 21000;

        let index = arr.indexOf(item);
        
        function onMouseMove(moveEvt) {
          let shift = startCoord - moveEvt.clientX;
          startCoord = moveEvt.clientX;
          item.style.left = (item.offsetLeft - shift) + 'px';

          let currentCoord = Math.round(item.getBoundingClientRect().x);
          
          if (currentCoord < minCoord) {
            item.style.left = '0px';
          }

          if (currentCoord > maxCoord) {
            item.style.left = (rangeScaleWidth - rangeBtnWidth) + 'px';
          }

          resizeInnerScale();
          addInputValue();

          function addInputValue() {
            inputs[index].value = Math.trunc(maxInputValue * 1e-2 / (rangeScaleWidth - rangeBtnWidth) * parseInt(item.style.left, 10)) * 1e2;
      
            if (inputs[index].value < 0) {
              inputs[index].value = 0;
            } else if (inputs[index].value > maxInputValue) {
              inputs[index].value = maxInputValue;
            }
          }

          function resizeInnerScale() {
            rangeScaleInner.style.left = arr[0].style.left;
            rangeScaleInner.style.width = (rangeScaleWidth - parseInt(arr[0].style.left, 10) - (rangeScaleWidth - parseInt(arr[1].style.left))) + 'px';
          }
        }
  
        function onMouseUp(upEvt) {
          document.removeEventListener('mousemove', onMouseMove);
          document.removeEventListener('mouseup', onMouseUp);
        }
  
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
      });
    }

    function clickBtnsHandler(arrLabels, arrButtons, className ) {
      for (let i = 0; i < arrLabels.length; i++) {
        arrLabels[i].addEventListener('click', (e) => {
          if (!arrButtons[i].hasAttribute('disabled') && arrButtons[i].name == 'toggle') {
            window.deleteShowingClass(arrLabels, className);
            arrLabels[i].classList.add(className);
          }

          if (!arrButtons[i].hasAttribute('disabled') && arrButtons[i].name == 'checkbox') {
            arrLabels[i].classList.toggle(className);
          }
        });
      }
    }

    function addDisableClass(arrButtons, arrLabels, className) {
      for (let i = 0; i < arrButtons.length; i++) {
        if (arrButtons[i].hasAttribute('disabled')) {
          arrLabels[i].classList.add(className);
        }
      }
    }
  }
})()