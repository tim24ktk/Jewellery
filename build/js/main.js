'use strict';
(() => {

  const mainMenu = document.querySelector(`.main-menu`);
  const openButton = document.querySelector(`.header-top__button`);
  const closeButton = document.querySelector(`.main-menu__button`);
  const logoAll = document.querySelectorAll(`.logo`);

  if (mainMenu && mainMenu.classList.contains(`main-menu--no-js`)) {
    mainMenu.classList.remove(`main-menu--no-js`);
  };

  if (closeButton && closeButton.classList.contains(`main-menu__button--no-js`)) {
    closeButton.classList.remove(`main-menu__button--no-js`);
  };

  if (openButton && openButton.classList.contains(`header-top__button--no-js`)) {
    openButton.classList.remove(`header-top__button--no-js`);
  };

  if (logoAll) {
    for (let logo of logoAll) {
      logo.classList.remove(`logo--no-js`);
    };
  };

  const openMenu = () => {
    if (mainMenu) {
      mainMenu.classList.add(`main-menu--open`);
    }
  };

  const closeMenu = () => {
    if (mainMenu) {
      mainMenu.classList.remove(`main-menu--open`);
    }
  };

  if (closeButton) {
    closeButton.addEventListener(`click`, closeMenu);
  };

  if (openButton) {
    openButton.addEventListener(`click`, openMenu);
  };

  /* slider */
    const PictureCount = {
      DESKTOP: 4,
      TABLET: 2
    };

    const MaxWidth = {
      TABLET: 1023,
      MOBILE: 767
    };

    const tablet = window.matchMedia(`(max-width: ${MaxWidth.TABLET}px)`);
    const mobile = window.matchMedia(`(max-width: ${MaxWidth.MOBILE}px)`);

    const list = document.querySelector(`.products-list`);
    const items = document.querySelectorAll(`.products-list__item`);
    const buttonLeft = document.querySelector(`.new__left-button`);
    const buttonRight = document.querySelector(`.new__right-button`);

    let wrapperWidth; /* вычисляемая под конкретное разрешение ширина контейнера */
    let itemWidth; /* вычисляемая под конкретное разрешение ширина 1 слайда */

    let positionLeftItem = 0;
    const transform = 0;

    let step; /* шаг */
    let itemsArray = [];
    const startX = 0; /* для мобильного тача - начало перемещения */

    if (items) {
      items.forEach((item, index) => {
        itemsArray.push({item: item, position: index, transform: 0});
      });
    }

    const position = {
      getMin: 0,
      getMax: itemsArray.length - 1
    };

    let count; /* временная переменная для определения количества изображений на адаптиве */


    const changeSizeHandler = (evt) => {

      if (evt.matches) {
        count = PictureCount.TABLET;
      } else {
        count = PictureCount.DESKTOP;
      }

      if (list && items) {
        wrapperWidth = parseFloat(getComputedStyle(list).width);
        itemWidth = parseFloat(getComputedStyle(items[0]).width);

        step = itemWidth / wrapperWidth * 100;

        positionLeftItem = 0;
        transform = 0;
        list.style.transform = `translateX(` + transform + `%)`;
      }
    };

    const setMobileHandler = (evt) => {
      if (evt.matches) {
        setMobileTouch();
      }
    };

    const buttonRightClickHandler = () => {
      if (positionLeftItem + count >= position.getMax) {
        return;
      }

      positionLeftItem = positionLeftItem + count;

      transform -= step * count;
      list.style.transform = `translateX(` + transform + `%)`;
    };

    const buttonLeftClickHandler = () => {
      if (positionLeftItem <= position.getMin) {
        return;
      }

      positionLeftItem = positionLeftItem - count;
      transform += step * count;

      list.style.transform = `translateX(` + transform + `%)`;
    };

    const setMobileTouch = () => {
      if (list) {
        list.addEventListener(`touchstart`, (evt) => {
          startX = evt.changedTouches[0].clientX;
        });

        list.addEventListener(`touchend`, (evt) => {
          let endX = evt.changedTouches[0].clientX;
          let deltaX = endX - startX;

          if (deltaX > 50) {
            buttonRightClickHandler();
          } else if (deltaX < -50) {
            buttonLeftClickHandler();
          }
        });
      }
    };

    if (buttonLeft && buttonRight) {
      buttonRight.addEventListener(`click`, buttonRightClickHandler);
      buttonLeft.addEventListener(`click`, buttonLeftClickHandler);
    }

    tablet.addListener(changeSizeHandler);
    changeSizeHandler(tablet);

    mobile.addListener(setMobileHandler);
    setMobileHandler(mobile);
})();
