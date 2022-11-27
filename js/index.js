/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
// 'use strict';

import {plural} from './modules/utiles.js';




document.addEventListener('DOMContentLoaded', () => {
  console.log('hallo');

  const menuBtn = document.querySelector('.header__menu-button');
  console.log('menuBtn: ', menuBtn);
  const headerMenu = document.querySelector('.header__menu');
  console.log('headerMenu: ', headerMenu);

  const heroTimer = document.querySelector('.hero__timer');
  const timer = document.querySelector('.timer');

  console.log('timer: ', timer);
  console.log('heroTimer: ', heroTimer);
  console.log(timer === heroTimer);
  const timerDeadline = timer.dataset.timerDeadline;
  console.log('timerDeadline: ', timerDeadline);

  menuBtn.addEventListener('click', event => {
    console.log('menu button');
    // headerMenu.style.opacity = 0.9;
    // headerMenu.style.zIndex = 1;
    headerMenu.classList.toggle('header__menu_active');
  });
});
