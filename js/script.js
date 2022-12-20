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
const inputHandle = (input, output) => {
  const text = input.value.split(' ')
    .map(word => toCapitalizedString(word)).join(' ');
  output.textContent = text;
};

document.addEventListener('DOMContentLoaded', () => {
  // DOMContentLoaded после загрузки страницы
  applyStyleSheet('./css/darkgreen-style.css');
  const page = document.querySelector('.page');
  // поле ввода input__text
  const input = createElem('input', {
    className: 'page__input',
    type: 'text',
    placeholder: 'Введите текст...',
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
    page.output.textContent = page.input.value;
  };


  // * Lets using debounce pattern
  const debounceTimer = (fn, msec) => {
    let last = 0;
    let lastCallTimer = NaN;
    return (...args) => {
      const previous = last;
      last = Date.now();
      if (previous && ((last - previous) <= msec)) {
        clearTimeout(lastCallTimer);
      }
      lastCallTimer = setTimeout(() => {
        fn(...args);
      }, msec);
    };
  };

  // const debounceInputHandle = debounceTimer(showText, 300);
  const debounceInputHandleCapitalize = debounceTimer(inputHandle, 300);

  // page.input.addEventListener('input', debounceInputHandle);
  page.input.addEventListener('input', (event) => {
    debounceInputHandleCapitalize(page.input, page.output);
  });
});
