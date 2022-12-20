/* eslint-disable max-len */
'use strict';

// простая функция делает перую букву Заглавной отсальные строчными
const toCapitalizedString = (str) =>
  str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();


// простая функция создания элемента страницы
const createElem = (tag, attr = {}, text) => {
  const elem = document.createElement(tag);
  Object.assign(elem, attr);
  if (text) {
    elem.textContent = text;
  }
  return elem;
};

const applyStyleSheet = (str) => {
  // динамически подключаем стили ))
  const head = document.head;
  const style = document.createElement('link');
  style.rel = 'stylesheet';
  style.href = str;
  head.append(style);
};

// функция обработчик строки ввода
// const inputHandler = (input, output) => {
//   console.log('input: ', input.value, 'output: ', output.textContent);
//   const text = input.value.split(' ')
//     .map(word => toCapitalizeString(word)).join(' ');
//   output.textContent = text;
// };

document.addEventListener('DOMContentLoaded', () => {
  // DOMContentLoaded после загрузки страницы
  applyStyleSheet('./css/darkgreen-style.css');
  // страница
  const page = document.querySelector('.page');
  // поле ввода input__text
  const input = createElem('input', {
    className: 'page__input',
    type: 'text',
    placeholder: 'Введите текст...',
    name: 'page-input-text',
    title: 'Начните вводить текст',
  });
  // поле вывода output__text параграф с пустым символом
  const paragraph = createElem('p', {
    className: 'page__text',
    innerHTML: '&nbsp;',
  });
  page.append(input, paragraph);
  page.input = input;
  page.output = paragraph;

  const showText = () => {
    console.log('page.input: ', page.input.value, 'page.output: ', page.output.textContent);
    // при запуске этой функ инпут переносится в вывод
    page.output.textContent = page.input.value;
  };


  // * Lets using debounce
  const debounce = (fn, msec) => {
    console.log('msec: ', msec, 'fn: ', fn);
    let last = 0;
    let lastCallTimer = NaN;

    return (...args) => {
      console.log('args', ...args);
      // заменяем
      const previous = last;
      // обновляем дату последнего вызова
      last = Date.now();
      console.log(previous, last, last - previous, lastCallTimer);
      if (previous && ((last - previous) <= msec)) {
        console.log('сбрасываем таймер и откидываем этот вызов');
        clearTimeout(lastCallTimer);
      }
      lastCallTimer = setTimeout(() => {
        console.log('запуск после таймаута');
        fn(...args);
      }, msec);
    };
  };

  const debounceInputHandle = debounce(showText, 1000);

  page.input.addEventListener('input', debounceInputHandle);
});

// ПРИ НАЧАЛЕ ВВОДА ТЕКСТА В ПОЛЕ ЗАДЕРЖИВАЕМ ВЫВОД ТЕКСТА НА 300 мс
// input.addEventListener('input', event => {
//   setTimeout(() => {
//     inputHandler(page.input, page.paragraph);
//   }, 300);
// });

// input.addEventListener('input', (event) => {
//   setTimeout(inputHandler, 300, input, paragraph);
// });


// const debounceInputHandle = debounce(inputHandler, 500);
// console.log('debounceInputHandle: ', debounceInputHandle);

// input.addEventListener('input', (event) => {
//   debounceInputHandle(page.input, page.paragraph);
//   console.log(event);
// });

// page.input.addEventListener('input', showText);
