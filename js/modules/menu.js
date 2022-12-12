/* eslint-disable require-jsdoc */
// * menu control menuBtn

export const menuControl = () => {
  const menuBtn = document.querySelector('.header__menu-button');
  const headerMenu = document.querySelector('.header__menu');

  console.log('menuBtn: ', menuBtn);
  console.log('headerMenu: ', headerMenu);

  // навешиваем нажатие на клавишу Escape закрыть меню
  const escapeHandle = (event) => {
    const key = event.key;
    if (key === 'Escape') {
      console.log('Escaped');
      headerMenu.classList.remove('header__menu_active');
      document.removeEventListener('keydown', escapeHandle);
      document.removeEventListener('click', clickHandle);
      return;
    }
    console.log(key);
    return;
  };

  // отдельно навешиваем клик по кнопке меню
  const menuBtnHandle = event => {
    const target = event.target;
    if (target === menuBtn) {
      if (headerMenu.classList.contains('header__menu_active')) {
        console.log('menuBtnHandle close'); //
        headerMenu.classList.remove('header__menu_active');
        document.removeEventListener('keydown', escapeHandle);
        document.removeEventListener('click', clickHandle);
        return;
      } else {
        console.log('menuBtnHandle open'); //
        headerMenu.classList.add('header__menu_active');
        document.addEventListener('keydown', escapeHandle);
        document.addEventListener('click', clickHandle);
        return;
      }
    }
    return;
  };

  // чтобы предусмотреть возможные варианты открыть и закрыть меню
  function clickHandle(event) {
    const target = event.target;
    if (target === menuBtn) {
      console.log('menu btn clickHandle'); //
      return;
    }
    if (target.classList.contains('header__link')) {
      headerMenu.classList.remove('header__menu_active');
      console.log('link menu'); //
      document.removeEventListener('keydown', escapeHandle);
      document.removeEventListener('click', clickHandle);
      return;
    }
    if (target === headerMenu) {
      console.log('header menu');
      return;
    }
    headerMenu.classList.remove('header__menu_active');
    console.log('other', target);
    document.removeEventListener('keydown', escapeHandle);
    document.removeEventListener('click', clickHandle);
    return;
  }

  document.addEventListener('click', menuBtnHandle);

  /*
  document.addEventListener('click', event => {
    const target = event.target;
    if (target === menuBtn) {
      headerMenu.classList.add('header__menu_active');
      console.log('menu btn'); //
      document.addEventListener('keydown', escapeHandle);
      return;
    }
    if (target.classList.contains('header__link')) {
      headerMenu.classList.remove('header__menu_active');
      console.log('link menu'); //
      document.removeEventListener('keydown', escapeHandle);
      return;
    }
    if (target === headerMenu) {
      console.log('header menu');
      return;
    }
    headerMenu.classList.remove('header__menu_active');
    console.log('other');
    document.removeEventListener('keydown', escapeHandle);
    return;
  });
  */

  /*
  document.addEventListener('keydown', event => {
    const key = event.key;
    if (key === 'Escape') {
      console.log('Escaped');
      headerMenu.classList.remove('header__menu_active');
    }
  });
  */

  // document.addEventListener('click', clickHandle);
  return;
};
