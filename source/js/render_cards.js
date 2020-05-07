(function() {
  if (document.querySelector('.products__cards')) {
    'use strict';
    const data = [
      sedona = {
        name: 'sedona',
        link_content: 'Sedona',
        desc: 'Информационный сайт<br>для туристов',
        price: '10 000 руб.',
        image_src: 'img/content/sedona-card.jpg',
        image_alt: 'Сайт Sedona',
        adaptive: 'adaptive',
        grid_type: 'rubber',
        features: ['advantages', 'gallery']
      },
      pink = {
        name: 'pink',
        link_content: 'Pink app',
        desc: 'Продуктовый лендинг<br>приложения для iOS и Android',
        price: '17 000 руб.',
        image_src: 'img/content/pink-card.jpg',
        image_alt: 'Сайт Pink',
        adaptive: 'adaptive',
        grid_type: 'rubber',
        features: ['slider', 'advantages']
      },
      barbershop = {
        name: 'barbershop',
        link_content: 'Barbershop',
        desc: 'Сайт салона красоты.<br>Для мужчин, да.',
        price: '8 000 руб.',
        image_src: 'img/content/barbershop-card.jpg',
        image_alt: 'Сайт барбершопа',
        adaptive: 'adaptive',
        grid_type: 'fixed',
        features: ['slider', 'advantages', 'news']
      },
      mishka = {
        name: 'mishka',
        link_content: 'Mishka',
        desc: 'Интернет-магазин<br>вязаных игрушек',
        price: '21 000 руб.',
        image_src: 'img/content/mishka-card.jpg',
        image_alt: 'Сайт Mishka',
        adaptive: 'adaptive',
        grid_type: 'rubber',
        features: ['slider', 'advantages', 'news', 'basket']
      },
      aplus = {
        name: 'aplus',
        link_content: 'A plus',
        desc: 'Лендинг курсов повышения<br>квалификации',
        price: '13 000 руб.',
        image_src: 'img/content/aplus-card.jpg',
        image_alt: 'Сайт Aplus',
        adaptive: 'notadaptive',
        grid_type: 'fixed',
        features: ['advantages']
      },
      kvast = {
        name: 'kvast',
        link_content: 'Кваст',
        desc: 'Промо-сайт производителя<br>крафтового кваса',
        price: '15 000 руб.',
        image_src: 'img/content/kvast-card.jpg',
        image_alt: 'Сайт Kvast',
        adaptive: 'notadaptive',
        grid_type: 'rubber',
        features: ['slider', 'news', 'basket']
      }
    ];
  
    window.data = data;
    window.renderCards = renderCards;
    
  
    function renderCards(obj) {
      const cardsWrapper = document.querySelector('.products__cards');
      const productCardTemplate = document.querySelector('.card-template').content.querySelector('.products__card');
      const fragment = document.createDocumentFragment();
  
      if (cardsWrapper.hasChildNodes()) {
        cardsWrapper.innerHTML = '';
      }
  
      for (let item of obj) {
        let element = productCardTemplate.cloneNode(true);
        let link = element.querySelector('.products__card-link');
        let desc = element.querySelector('.products__card-description');
        let price = element.querySelector('.products__card-btn');
        let image = element.querySelector('.products__card-image');
    
        link.textContent = item.link_content;
        desc.innerHTML = item.desc;
        price.textContent = item.price;
        image.src = item.image_src;
        image.alt = item.image_alt;
    
        fragment.append(element);
      }
  
      cardsWrapper.append(fragment);
    }
  }
})()