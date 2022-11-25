/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
'use strict';

console.log('осталось');
// https://proweb63.ru/help/js/declension-in-js
const sklonenie = (number, txt, cases = [2, 0, 1, 1, 1, 2]) => txt[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];

const apple = 1;
const pieces = 3;
const ruble = 101;

const a = sklonenie(apple, ['яблоко', 'яблока', 'яблок']); // яблоко
console.log(apple, sklonenie(apple, ['яблоко', 'яблока', 'яблок']));
const b = 'Мне нужно ' + pieces + ' ' + sklonenie(pieces, ['штука', 'штуки', 'штук']); // Мне нужно 3 штуки
console.log(pieces, 'Мне нужно ' + pieces + ' ' + sklonenie(pieces, ['штука', 'штуки', 'штук']));
const c = `Мы потратили ${ruble} ${sklonenie(ruble, ['рубль', 'рубля', 'рублей'])}`; // Мы потратили 10 рублей
console.log(ruble, `Мы потратили ${ruble} ${sklonenie(ruble, ['рубль', 'рубля', 'рублей'])}`);


const r = 'рубл';
const v = ['ь', 'я', 'ей'];
const n = 224;

const str1 = 'У меня 120 ' + r + sklonenie(120, v); // У меня 120 рублей
const str2 = 'Цена: ' + n + ' рубл' + sklonenie(n, ['ь', 'я', 'ей']); // Цена: 224 рубля
const str3 = `На счету ${n} рубл${sklonenie(n, v)}`; // На счету 224 рубля


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
