'use strict';

(function() {
  if (document.querySelector('.products__sorting')) {
    const sortingBlock = document.querySelector('.products__sorting');
    const sortByPriceBtn = sortingBlock.querySelector('#priceSorting');
    const sortByNameBtn = sortingBlock.querySelector('#nameSorting');
    const sortByCategoryButtons = [sortByPriceBtn, sortByNameBtn];
    const sortingArrows = sortingBlock.querySelectorAll('.products__sorting-arrow');
    let sortingToken = 1;
    sortByProp(comparePricesToLow);

    for (let i = 0; i < sortByCategoryButtons.length; i++) {
      sortByCategoryButtons[i].addEventListener('click', (e) => {
        for (let item of sortByCategoryButtons) {
          if (item.classList.contains('products__sorting-option--active')) {
            item.classList.remove('products__sorting-option--active');
          }
          sortByCategoryButtons[i].classList.add('products__sorting-option--active');
          
          let clickedBtn = e.target;

          if (clickedBtn == sortByPriceBtn) {
            sortingToken = 1;
            for (let item of sortingArrows) {
              if (item.classList.contains('products__sorting-arrow--down')&&item.classList.contains('products__sorting-arrow--active')) {
                sortByProp(comparePricesToLow);
              }
              if (item.classList.contains('products__sorting-arrow--up')&&item.classList.contains('products__sorting-arrow--active')) {
                sortByProp(comparePricesToHigh);
              }
            }
          }
          
          if (clickedBtn == sortByNameBtn) {
            sortingToken = 2;
            for (let item of sortingArrows) {
              if (item.classList.contains('products__sorting-arrow--down')&&item.classList.contains('products__sorting-arrow--active')) {
                sortByProp(compareNamesToLow);
              }
              if (item.classList.contains('products__sorting-arrow--up')&&item.classList.contains('products__sorting-arrow--active')) {
                sortByProp(compareNamesToHigh);
              }
            }
          }
        }
      });
    }

    for (let item of sortingArrows) {
      item.addEventListener('click', changeActiveArrowAndSort);
    }

    function changeActiveArrowAndSort(e) {
      let clickedArrow = e.target;
      for (let item of sortingArrows) {
        if (item.classList.contains('products__sorting-arrow--active')) {
          item.classList.remove('products__sorting-arrow--active');
        }
      }
      clickedArrow.classList.add('products__sorting-arrow--active');
      switch (sortingToken) {
        case 1:
          if (clickedArrow.classList.contains('products__sorting-arrow--down')) {
            sortByProp(comparePricesToLow);
          }
          if (clickedArrow.classList.contains('products__sorting-arrow--up')) {
            sortByProp(comparePricesToHigh);
          }
        break;
        case 2:
          if (clickedArrow.classList.contains('products__sorting-arrow--down')) {
            sortByProp(compareNamesToLow);
          }
          if (clickedArrow.classList.contains('products__sorting-arrow--up')) {
            sortByProp(compareNamesToHigh);
          }
        break;
      }

    } 
    
    function sortByProp(func) {
      let sortedObj;

      if (window.filteredCards === undefined) {
        sortedObj = window.data;
      } else {
        
        sortedObj = window.filteredCards;
      }
      
      sortedObj.sort(func);
      window.sortedObj = sortedObj;
      window.renderCards(sortedObj);
    }

    function compareNamesToHigh(a, b) {
      if (a.name[0] > b.name[0]) return 1;
      if (a.name[0] == b.name[0]) return 0;
      if (a.name[0] < b.name[0]) return -1;
    }

    function compareNamesToLow(a, b) {
      if (a.name[0] < b.name[0]) return 1;
      if (a.name[0] == b.name[0]) return 0;
      if (a.name[0] > b.name[0]) return -1;
    }

    function comparePricesToHigh(a, b) {
      if (parseInt((a.price), 10) > parseInt((b.price), 10)) return 1;
      if (parseInt((a.price), 10) == parseInt((b.price), 10)) return 0;
      if (parseInt((a.price), 10) < parseInt((b.price), 10)) return -1;
    }

    function comparePricesToLow(a, b) {
      if (parseInt((a.price), 10) < parseInt((b.price), 10)) return 1;
      if (parseInt((a.price), 10) == parseInt((b.price), 10)) return 0;
      if (parseInt((a.price), 10) > parseInt((b.price), 10)) return -1;
    }
  }
  
})()