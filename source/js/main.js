'use strict';
(() => {

    /* меню моб и таблет */
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

    /* аккордеон */
    const accordionButtons = document.querySelectorAll(`.question-list__item-title`);
    const answers = document.querySelectorAll(`.question-list__item-answer`);

    if (answers) {
      answers.forEach((answer) => {
        if (answer.classList.contains(`question-list__item-answer--no-js`)) {
          answer.classList.remove(`question-list__item-answer--no-js`);
        }
      });
    };

    if (accordionButtons) {
      let activePanel;
      accordionButtons.forEach(function(item) {
        if (item.classList.contains(`question-list__item-title--no-js`)) {
          item.classList.remove(`question-list__item-title--no-js`)
        }
        item.addEventListener('click', function() {
          this.classList.add(`question-list__item-title--active`);
          this.nextElementSibling.classList.add('question-list__item-answer--active');
          if (activePanel) {
            activePanel.classList.remove(`question-list__item-title--active`);
            activePanel.nextElementSibling.classList.remove('question-list__item-answer--active');
          }
          activePanel = (activePanel === this) ? 0 : this;
        });
      });
    };

    /* аккордеон для фильтра */
    const filterButtons = document.querySelectorAll(`.filter-list__item-title`);
    const filterBlocks = document.querySelectorAll(`.filter-list__item-block`);

    if (filterBlocks) {
      filterBlocks.forEach((filterBlock) => {
        if (filterBlock.classList.contains(`filter-list__item-block--no-js`)) {
          filterBlock.classList.remove(`filter-list__item-block--no-js`);
        };
      });
    };

    if (filterButtons) {
      filterButtons.forEach(function(item) {
        if (item.classList.contains(`filter-list__item-title--no-js`)) {
          item.classList.remove(`filter-list__item-title--no-js`)
        }
        item.addEventListener('click', function() {
          this.classList.toggle(`filter-list__item-title--active`);
          this.nextElementSibling.classList.toggle('filter-list__item-block--active');
        });
      });
    };

    /* слайдер */
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

    const list = document.querySelector(`.products-list--js`);
    const items = document.querySelectorAll(`.products-list__item--js`);
    const buttonLeft = document.querySelector(`.new__left-button`);
    const buttonRight = document.querySelector(`.new__right-button`);

    /* вывод количества страниц */
    const paginationList = document.querySelector(`.pagination`);
    let deleter = 4;

    if (tablet.matches || mobile.matches) {
      deleter = 2;
    };

    for (let i = 1; i <= items.length / deleter; i++) {
      let li = document.createElement(`li`);
      li.classList.add(`pagination__item`);
      li.textContent= i;
      paginationList.appendChild(li);
    };

    let pageNumbers = document.querySelectorAll(`.pagination__item`);

    let li = document.createElement(`li`);
    li.classList.add(`pagination__item`, `pagination__item--span`);
    li.textContent = `of`;
    paginationList.appendChild(li);

    li = document.createElement(`li`);
    li.classList.add(`pagination__item`, `pagination__item--last-child`);
    li.textContent = pageNumbers.length;
    paginationList.appendChild(li);

    for (let i = 0; i < pageNumbers.length; i++) {
      pageNumbers[0].classList.add(`pagination__item--active`);
    };

    let index = 0;

    const updateSelection = () => {
      let active = document.querySelector(`li.pagination__item--active`);
      if (active) {
        active.classList.remove(`pagination__item--active`);
      }
      pageNumbers[index].classList.add(`pagination__item--active`);
    };

    const nextElem = () => {
      index = (index + 1) % pageNumbers.length;
      updateSelection();
      if (index === pageNumbers.length - 1) {
        buttonRight.removeEventListener('click', nextElem);
      }
    };

    const previousElem = () => {
      index = (index + pageNumbers.length - 1) % pageNumbers.length;
      updateSelection();
      if (index === 0) {
        buttonLeft.removeEventListener('click', previousElem);
      }
    }

    let wrapperWidth; /* вычисляемая под конкретное разрешение ширина контейнера */
    let itemWidth; /* вычисляемая под конкретное разрешение ширина 1 слайда */
    let itemMarginRight; /* вычисляемый margin */

    let positionLeftItem = 0;
    let transform = 0;

    let step; /* шаг */
    let itemsArray = [];
    let startX = 0; /* для мобильного тача - начало перемещения */

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
        itemMarginRight = parseInt(getComputedStyle(items[0]).marginRight);

        step = (itemWidth + itemMarginRight) / wrapperWidth * 100;

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
      nextElem();
    };

    const buttonLeftClickHandler = () => {
      if (positionLeftItem <= position.getMin) {
        return;
      }

      positionLeftItem = positionLeftItem - count;
      transform += step * count;

      list.style.transform = `translateX(` + transform + `%)`;
      previousElem();
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

  /* open close filter */
  const filterOpen = document.querySelector(`.filters__button`);
  const filterClose = document.querySelector(`.filter__close`);
  const filter = document.querySelector(`.filter`);

  if (filterOpen) {
    filterOpen.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      filter.classList.add(`filter--active`);
    });
  };

  if (filterClose) {
    filterClose.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      filter.classList.remove(`filter--active`);
    });
  }

  /* модальное окно добавления товара */
  const openCartModal = document.querySelector(`.card-description-column__add-button`);
  const cartModal = document.querySelector(`.cart-modal`);
  const modalWrapper = document.querySelector(`.cart-modal__wrapper`);
  const closeCart = document.querySelector(`.cart-modal__close`);
  const body = document.querySelector(`body`);
  const ESCAPE = `Escape`;

  if (openCartModal) {
    openCartModal.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      cartModal.classList.add(`cart-modal--active`);
      body.classList.add(`body-position`);
    });
  };

  const checkEscape = (evt, escapeActionCb) => {
    if (evt.key === ESCAPE) {
      evt.preventDefault();
      escapeActionCb();
    }
  };

  const closePopup = () => {
    cartModal.classList.remove(`cart-modal--active`);
    body.classList.remove(`body-position`);
  };

  const onEscapeKeydown = (evt) => {
    checkEscape(evt, closePopup);
    body.classList.remove(`body-position`);
  };

  if (closeCart) {
    closeCart.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      cartModal.classList.remove(`cart-modal--active`);
      body.classList.remove(`body-position`);
    });
  };

  if (modalWrapper) {
    modalWrapper.addEventListener(`click`, (evt) => {
      evt.stopPropagation();
    });
  };

  if (cartModal) {
    cartModal.addEventListener(`click`, () => {
      cartModal.classList.remove(`cart-modal--active`);
      body.classList.remove(`body-position`);
    });
    document.addEventListener(`keydown`, onEscapeKeydown);
  };

  /* open-close login modal */
  const openButtons = document.querySelectorAll(`.open-login`);
  const loginModal = document.querySelector(`.login`);
  const loginWrapper = document.querySelector(`.login__wrapper`);
  const closeLogin = document.querySelector(`.login__close`);
  const emailInput = document.querySelector(`#log-in`);
  const passwordInput = document.querySelector(`input[type='password']`);
  const loginForm = document.querySelector(`.login__form`);

  let isStorageSupport = true;
  let storageMail = ``;

  try {
    storageMail = localStorage.getItem(`email`);
  } catch (err) {
    isStorageSupport = false;
  }

  if (openButtons) {
    openButtons.forEach((button) => {
      button.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        loginModal.classList.add(`login--active`);
        body.classList.add(`body-position`);
        emailInput.focus();
        if (storageMail) {
          emailInput.value = storageMail;
          if (passwordInput) {
            passwordInput.focus();
          }
        }
      });
    });
  };

  if (loginForm) {
    loginForm.addEventListener(`submit`, (evt) => {
      if (!emailInput || !passwordInput) {
        evt.preventDefault();
      } else {
        localStorage.setItem(`email`, emailInput.value);
      }
    });
  };

  const closeLoginPopup = () => {
    loginModal.classList.remove(`login--active`);
    body.classList.remove(`body-position`);
  }

  const onEscapeLoginKeydown = (evt) => {
    checkEscape(evt, closeLoginPopup);
    body.classList.remove(`body-position`);
  };

  if (closeLogin) {
    closeLogin.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      loginModal.classList.remove(`login--active`);
      body.classList.remove(`body-position`);
  });
  }

  if (loginWrapper) {
    loginWrapper.addEventListener(`click`, (evt) => {
      evt.stopPropagation();
    });
  };

  if (loginModal) {
    loginModal.addEventListener(`click`, function() {
      loginModal.classList.remove(`login--active`);
      body.classList.remove(`body-position`);
    });
    document.addEventListener(`keydown`, onEscapeLoginKeydown);
  };
})();
