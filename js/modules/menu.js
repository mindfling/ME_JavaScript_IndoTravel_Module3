// * menu control menuBtn


export const menuControl = () => {
  const menuBtn = document.querySelector('.header__menu-button');
  const headerMenu = document.querySelector('.header__menu');

  console.log('menuBtn: ', menuBtn);
  console.log('headerMenu: ', headerMenu);

  menuBtn.addEventListener('click', event => {
    console.log('menu button');
    // headerMenu.style.opacity = 0.9;
    // headerMenu.style.zIndex = 1;
    headerMenu.classList.toggle('header__menu_active');
  });

  return;
};

