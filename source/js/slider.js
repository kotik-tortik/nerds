(function() {
  if (document.querySelector('.slider')) {
    'use strict';
    const controlsList = document.querySelector('.slider__navigation-list');
    const changeSlideButtons = document.querySelectorAll('.slider__navigation-item');
    const slides = document.querySelectorAll('.slider__slides-item');

    let count = 0;
    let setTicker = setTimeout(changeSlide, 2000);

    controlsList.addEventListener('click', slideClickHandler, true);

    function changeSlide() {
      deleteShowingClass(slides, 'slider-show');
      deleteShowingClass(changeSlideButtons, 'slider__navigation-circle');

      slides[count].classList.add('slider-show');
      changeSlideButtons[count].classList.add('slider__navigation-circle');

      count++;
      setTicker = setTimeout(changeSlide, 2000);
      if (count == slides.length) {
        count = 0;
      }
    }

    function slideClickHandler(e) {
      clearInterval(setTicker);

      deleteShowingClass(changeSlideButtons, 'slider__navigation-circle');

      if (e.target.classList.contains('slider__navigation-item')) {
        e.target.classList.add('slider__navigation-circle');
      }

      let arr = Array.from(changeSlideButtons);
      let index = arr.indexOf(e.target);

      deleteShowingClass(slides, 'slider-show');

      slides[index].classList.add('slider-show');

      count = index;

      setTicker = setTimeout(changeSlide, 4000);
    }
  }
  function deleteShowingClass(arr, className) {
    for (let item of arr) {
        if (item.classList.contains(className)) {
          item.classList.remove(className);
        }
      }
  }

  window.deleteShowingClass = deleteShowingClass;
})()