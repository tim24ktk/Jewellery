'use strict';
(() => {

  const mainMenu = document.querySelector(`.main-menu`);
  const openButton = document.querySelector(`.header-top__button`);
  const closeButton = document.querySelector(`.main-menu__button`);

  if (mainMenu && mainMenu.classList.contains(`main-menu--no-js`)) {
    mainMenu.classList.remove(`main-menu--no-js`);
  }

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
  }

  if (openButton) {
    openButton.addEventListener(`click`, openMenu);
  }

  })();
