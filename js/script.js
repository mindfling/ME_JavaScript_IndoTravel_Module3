'use strict';

// простая функция делает перую букву Заглавной отсальные строчными
const toCapitalizeString = (str) =>
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


document.addEventListener('DOMContentLoaded', () => {
  // DOMContentLoaded после загрузки страницы
  // динамически подключаем стили ))
  const head = document.head;
  const style = document.createElement('link');
  style.rel = 'stylesheet';
  style.href = 'css/darkgreen-style.css';
  head.append(style);
  const page = document.querySelector('.page');
  const input = createElem('input', {
    className: 'page__input',
    type: 'text',
    placeholder: 'Введите текст...',
    name: 'page-input-text',
    title: 'Начните вводить текст',
  });

  // элемента параграф с пустым символом
  const paragraph = createElem('p', {
    className: 'page__text',
    innerHTML: '&nbsp;',
  });

  page.append(input, paragraph);
  page.input = input;
  page.paragraph = paragraph;

  // функция обработчик строки ввода
  const inputHandler = (input, output) => {
    const text = input.value.split(' ')
      .map(word => toCapitalizeString(word))
      .join(' ');
    output.textContent = text;
  };

  // ПРИ НАЧАЛЕ ВВОДА ТЕКСТА В ПОЛЕ ЗАДЕРЖИВАЕМ ВЫВОД ТЕКСТА НА 300 мс
  input.addEventListener('input', (event) => {
    setTimeout(inputHandler, 300, input, paragraph);
  });
});
