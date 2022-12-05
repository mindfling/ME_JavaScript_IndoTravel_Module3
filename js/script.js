'use strict';

const toCapitalizeString = (str) =>
  str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();


const createElem = (tag, attr = {}, text) => {
  const elem = document.createElement(tag);
  Object.assign(elem, attr);
  if (text) {
    elem.textContent = text;
  }
  return elem;
};

// динамически подключаем стили ))
const head = document.head;
const style = document.createElement('link');
style.rel = 'stylesheet';
style.href = 'css/blue-style.css';

head.append(style);


// * DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('.page');

  const input = createElem('input', {
    className: 'page__input',
    type: 'text',
    placeholder: 'введите...',
    name: 'page-input-text',
    title: 'Начните вводить текст',
  });

  const paragraph = createElem('p', {
    className: 'page__text',
    innerHTML: '&nbsp;',
  });

  page.append(input, paragraph);
  page.input = input;
  page.paragraph = paragraph;

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

  // input.addEventListener('input', (event) => {
  //   // ПРИ НАЧАЛЕ ВВОДА ТЕКСТА В ПОЛЕ ЗАДЕРЖИВАЕМ ВЫВОД ТЕКСТА НА 300 мс
  //   setTimeout(() => {
  //     inputHandler(input, paragraph);
  //   }, 300);
  // });
});

console.log('Hi');
