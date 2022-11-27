/* eslint-disable max-len */
// 'use strict';

// https://proweb63.ru/help/js/declension-in-js
// * функция для окончания числительных
export const plural = (number, text, cases = [2, 0, 1, 1, 1, 2]) => text[((number % 100 > 4) && (number % 100 < 20)) ? 2 : cases[(number % 10 < 5) ? (number % 10) : 5]];

/**
 * * пример использования
  const apple = 1;
  const pieces = 3;
  const ruble = 101;

  const r = 'рубл';
  const v = ['ь', 'я', 'ей'];
  const n = 224;

  console.log(apple, plural(apple, ['яблоко', 'яблока', 'яблок']));
  console.log(pieces, 'Мне нужно ' + pieces + ' ' + plural(pieces, ['штука', 'штуки', 'штук']));
  console.log(ruble, `Мы потратили ${ruble} ${plural(ruble, ['рубль', 'рубля', 'рублей'])}`);

  console.log('У меня 120 ' + r + plural(120, v)); // У меня 120 рублей
  console.log('Цена: ' + n + ' рубл' + plural(n, ['ь', 'я', 'ей'])); // Цена: 224 рубля
  console.log(`На счету ${n} рубл${plural(n, v)}`); // На счету 224 рубля
 */

