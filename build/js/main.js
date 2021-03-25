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

})();
