/* eslint-disable max-len */
// * tour and reservation
import {plural} from './utiles.js';

const URI = 'date.json';

// форматирование строки цены
const getRuPriceFormat = (num) => {
  const ruPriceFormatter = new Intl.NumberFormat('ru', {
    style: 'currency',
    currency: 'RUB',
  });
  return ruPriceFormatter.format(num);
};

// удаленное получение данных о доступных турах
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


// * control
export const tourBooking = async () => {
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

  // tours list
  const toursList = data.map((item, index) => {
    const option = document.createElement('option');
    option.classList.add('tour__option', 'reservation__option');
    option.value = item.date;
    option.textContent = `${item.date} числа`;
    option.dataset.index = index;
    return option;
  });
  // reservation list
  const list = data.map((item, index) => {
    const option = document.createElement('option');
    option.classList.add('tour__option', 'reservation__option');
    option.value = item.date;
    option.textContent = 'Даты ' + item.date;
    option.dataset.index = index;
    option.dataset.price = item.price;
    return option;
  });


  // tourDates.append(...list);
  addOption(tourDates, '', 'Выберите дату');
  tourDates.append(...toursList);


  tourDates.addEventListener('change', event => {
    const target = event.target;
    clearList(tourPeople);
    const selectedIndex = target.selectedIndex;
    const listIndex = target[selectedIndex].dataset.index;
    if (listIndex) {
      const item = data[listIndex];
      addOption(tourPeople, '', 'Количество человек');
      const minPeople = item['min-people'];
      const maxPeople = item['max-people'];
      for (let i = minPeople; i <= maxPeople; i++) {
        addOption(tourPeople, i, i + ' ' + plural(i,
          ['человек', 'человека', 'человек']));
      }
      console.log('tour for', minPeople, maxPeople, item);
    } else {
      console.log('не выбрана дата тура');
    }
  });

  tourPeople.addEventListener('change', event => {
    console.log('tour people', +tourPeople.value);
  });


  addOption(reserveDates, '', 'Дата путешествия');
  reserveDates.append(...list);

  // todo with obj tour = {}
  let date = '';
  let price = '';
  let firstDay;
  let lastDay;
  const dateRegexpTemplate = /\d\d\.\d\d/g;
  reserveDates.addEventListener('change', event => {
    clearList(reservePeople);
    const selectedIndex = reserveDates.selectedIndex;
    const listIndex = reserveDates[selectedIndex].dataset.index;
    if (listIndex) {
      // индекс из выбраного пункта меню
      const item = data[listIndex];
      // дата из массива списка туров
      date = item.date;
      const resDates = date.match(dateRegexpTemplate);
      console.log('resDates: ', resDates);
      firstDay = resDates[0];
      lastDay = resDates[1];
      if (firstDay && lastDay) {
        console.log('GOOD firstDay:', firstDay, 'lastDay:', lastDay);
        firstDay = firstDay.split('.').join(' ');
      } else {
        console.log('bad firstDay:', firstDay, 'lastDay:', lastDay);
        date = item.date;
        firstDay = undefined;
        lastDay = undefined;
      }
      reserveData.textContent = date;

      price = item.price;
      // reservePrice.textContent = price + ' ₽';
      reservePrice.textContent = getRuPriceFormat(price);
      addOption(reservePeople, '', 'Количество человек');
      const minPeople = item['min-people'];
      const maxPeople = item['max-people'];
      for (let i = minPeople; i <= maxPeople; i++) {
        addOption(reservePeople, i, i + ' ' + plural(i,
          ['человек', 'человека', 'человек']));
      }
      // console.log(minPeople, maxPeople);
    } else {
      reserveData.textContent = '';
      reservePrice.textContent = '';
    }
  });

  reservePeople.addEventListener('change', event => {
    const target = event.target;
    // const selectedIndex = target.selectedIndex;
    // const selectedValue = target[selectedIndex].value;
    const selectedValue = target.value;
    if (selectedValue) {
      reserveData.textContent = `${date}, ${selectedValue} ${plural(selectedValue,
        ['человек', 'человека', 'человек'])}`;
      // reservePrice.textContent = price * selectedValue + ' ₽';
      // const ruPriceFormatter = new Intl.NumberFormat('ru', {
      //   style: 'currency',
      //   currency: 'RUB',
      // });
      // reservePrice.textContent = ruPriceFormatter.format(summ);
      const summ = price * selectedValue;
      reservePrice.textContent = getRuPriceFormat(summ);
      console.log(reserveData.textContent, reservePrice.textContent)
    } else {
      reserveData.textContent = date;
      reservePrice.textContent = getRuPriceFormat(price);
    }
  });
  // очищаем
  reserveData.textContent = '';
  reservePrice.textContent = '';

  // const str = 'some123.213212 text 2012.01-01 some more 22.21 text here';
  /*
  const str = '12.11 - 26.11';
  const regexp = /\d{2}\.\d{2}/g;
  const res = str.match(regexp);
  console.log('res: ', res);
  const now = new Date();
  console.log('now: ', now, now.getFullYear());
  const begin = res[0];
  const t = new Date();
  const s = `${t.getFullYear()} ${begin.split('.').join(' ')}`;
  console.log('begin: ', '' + t.getFullYear() + ' ' + begin.split('.').join(' '));
  console.log('begin: ', s, new Date(s).getDate(), new Date(s).getMonth());
  */
};


