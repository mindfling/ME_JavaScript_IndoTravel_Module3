/* eslint-disable max-len */
// * tour and reservation

import {plural} from './utiles.js';

const URI = 'date.json';


const getDataList = async (url) => {
  if (!url) return;
  const result = await fetch(url);
  const data = result.json();
  return data;
};


const clearSelectList = (parent) => {
  while (parent.lastChild) {
    parent.lastChild.remove();
  }
};

const clearList = parent => {
  parent.replaceChildren();
};

const addOption = (parent, value, text, index, price) => {
  const option = document.createElement('option');
  option.classList.add('tour__option', 'reservation__option');
  option.value = value || '';
  option.textContent = text || value || '';
  if (index) option.dataset.index = index;
  if (price) option.dataset.price = price;
  parent.append(option);
};


// * control ******************************************************
// ! export const control = async () => {
const tourForm = document.querySelector('.tour__form');
const tourDates = tourForm.dates; // * #tour__date
const tourPeople = tourForm.people; // * #tour__people

const reservationForm = document.querySelector('.reservation__form');
const reserveDates = reservationForm.querySelector('#reservation__date'); // * #tour__date
const reservePeople = reservationForm.querySelector('#reservation__people'); // * #tour__people
const reserveData = reservationForm.querySelector('.reservation__data');
const reservePrice = reservationForm.querySelector('.reservation__price');

const data = await getDataList(URI);
console.log('data: ', data);

clearSelectList(tourDates);
clearSelectList(tourPeople);
clearSelectList(reserveDates);
clearSelectList(reservePeople);

tourDates.title = 'Начните с выбора даты тура';
tourPeople.title = 'Выберите дату тура, а потом количество человек';
reserveDates.title = 'Начните с выбора даты тура';
reservePeople.title = 'Выберите дату тура, а потом количество человек';

const list = data.map((item, index) => {
  const option = document.createElement('option');
  option.classList.add('tour__option', 'reservation__option');
  option.value = item.date;
  option.textContent = 'Даты ' + item.date;
  option.dataset.index = index;
  option.dataset.price = item.price;
  return option;
});

addOption(tourDates, '', 'Выберите дату');
tourDates.append(...list);

addOption(reserveDates, '', 'Дата путешествия');
reserveDates.append(...list);

let date = '';
let price = '';
reserveDates.addEventListener('change', event => {
  clearList(reservePeople);
  const selectedIndex = reserveDates.selectedIndex;
  const listIndex = reserveDates[selectedIndex].dataset.index;
  if (listIndex) {
    const item = data[listIndex];
    date = item.date;
    reserveData.textContent = date;
    price = item.price;
    reservePrice.textContent = price + ' ₽';
    addOption(reservePeople, '', 'Количество человек');
    const minPeople = item['min-people'];
    const maxPeople = item['max-people'];
    for (let i = minPeople; i <= maxPeople; i++) {
      addOption(reservePeople, i, i + ' ' + plural(i, ['человек', 'человека', 'человек']));
    }
    console.log(minPeople, maxPeople);
  } else {
    reserveData.textContent = '';
    reservePrice.textContent = '';
  }
});

reservePeople.addEventListener('change', event => {
  const target = event.target;
  const selectedIndex = target.selectedIndex;
  const selectedValue = target[selectedIndex].value;
  if (selectedValue) {
    reserveData.textContent = `${date}, ${selectedValue} ${plural(selectedValue, ['человек', 'человека', 'человек'])}`;
    reservePrice.textContent = price * selectedValue + ' ₽';
  } else {
    reserveData.textContent = date;
  }
});

reserveData.textContent = '';
reservePrice.textContent = '';
// !};

// control();
