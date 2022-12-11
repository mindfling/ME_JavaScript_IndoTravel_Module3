// * menu control menuBtn


export const menuControl = () => {
  const menuBtn = document.querySelector('.header__menu-button');
  const headerMenu = document.querySelector('.header__menu');

  console.log('menuBtn: ', menuBtn);
  console.log('headerMenu: ', headerMenu);

  /**
    menuBtn.addEventListener('click', event => {
      console.log('menu button');
      // todo вручную
      // headerMenu.style.opacity = 0.9;
      // headerMenu.style.zIndex = 1;
      // todo на автомате просто добавить класс active
      headerMenu.classList.toggle('header__menu_active');
    });

    headerMenu.addEventListener('click', (event) => {
      const target = event.target;
      event.preventDefault();
      if (target.classList.contains('header__link')) {
        console.log('link menu')
        headerMenu.classList.toggle('header__menu_active');
      }
    });
  */

  // чтобы предусмотреть возможные варианты открыть и закрыть меню
  document.addEventListener('click', event => {
    const target = event.target;
    if (target === menuBtn) {
      headerMenu.classList.toggle('header__menu_active');
      console.log('menu btn'); //
      return;
    }
    if (target.classList.contains('header__link')) {
      headerMenu.classList.remove('header__menu_active');
      console.log('link menu'); //
      return;
    }
    if (target.classList.contains('header__menu')) {
      console.log('header menu');
      return;
    }
    headerMenu.classList.remove('header__menu_active');
    console.log('other');
    return;
  });

  // навешиваем нажатие на клавишу Escape закрыть меню
  document.addEventListener('keydown', event => {
    const key = event.key;
    if (key === 'Escape') {
      console.log('Escaped');
      headerMenu.classList.remove('header__menu_active');
    }
  });

  return;
};

