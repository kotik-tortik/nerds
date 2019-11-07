'use strict'
var modalOpenButton = document.querySelector(".map__button");
var modalWindow = document.querySelector(".write-us");
var modalCloseButton = modalWindow.querySelector(".cross-icon");
var modalNameInput = modalWindow.querySelector('[name=name]');
var changeSliderButtonFirst = document.querySelector('#product-1');
var changeSliderButtonSecond = document.querySelector('#product-2');
var changeSliderButtonThird = document.querySelector('#product-3');
var firstSliderItem = document.querySelector('.slide-1');
var secondSliderItem = document.querySelector('.slide-2');
var thirdSliderItem = document.querySelector('.slide-3');

modalOpenButton.addEventListener("click", function (e) {
    e.preventDefault();
    modalWindow.classList.add("write-us_show");
    modalNameInput.focus();
});

modalCloseButton.addEventListener("click", function (e) {
    e.preventDefault();
    modalWindow.classList.remove("write-us_show");
});

firstSliderItem.classList.add('slider-show');

changeSliderButtonFirst.addEventListener('click', function () {
    firstSliderItem.classList.add('slider-show');
    secondSliderItem.classList.remove('slider-show');
    thirdSliderItem.classList.remove('slider-show');

});

changeSliderButtonSecond.addEventListener('click', function () {
    secondSliderItem.classList.add('slider-show');
    firstSliderItem.classList.remove('slider-show');
    thirdSliderItem.classList.remove('slider-show');
});

changeSliderButtonThird.addEventListener('click', function () {
    thirdSliderItem.classList.add('slider-show');
    firstSliderItem.classList.remove('slider-show');
    secondSliderItem.classList.remove('slider-show');
});