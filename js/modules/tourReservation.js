// todo !!!!!!
/* eslint-disable padded-blocks */
/* eslint-disable no-trailing-spaces */
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

const getParsedDates = (dates) => {
  if (!dates) {
    console.log('wrong dates');
    return;
  }
  const dateRegexp = /\d{2}\.\d{2}/g;
  const resDates = dates.match(dateRegexp);
  console.log('resDates: ', resDates);
  let firstDay = resDates[0];
  let lastDay = resDates[1];

  if (firstDay && lastDay) {
    console.log('GOOD firstDay:', firstDay, 'lastDay:', lastDay);
    const year = (new Date()).getFullYear();
    firstDay = `${year} ${firstDay.split('.').reverse().join(' ')}`;
    lastDay = lastDay.split('.').reverse().join(' ') + ' ' + year;
    
    console.log('GOOD firstDay:', firstDay, 'lastDay:', lastDay, year);

    const ruDateOptions = {
      day: 'numeric',
      month: 'long',
    };
    const dateFormatter = 
      new Intl.DateTimeFormat('ru', ruDateOptions);
    dates = `${dateFormatter.format(new Date(firstDay))} - ${dateFormatter.format(new Date(lastDay))}`;
  } else {
    console.log('bad firstDay:', firstDay, 'lastDay:', lastDay);
    dates = 'default';
    firstDay = undefined;
    lastDay = undefined;
  }
  console.log('dates: ', dates);
  return dates;
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
  // console.log('data: ', data);

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
  const reservationsList = data.map((item, index) => {
    const option = document.createElement('option');
    option.classList.add('tour__option', 'reservation__option');
    option.value = item.date;
    option.textContent = 'Даты ' + item.date;
    option.dataset.index = index;
    option.dataset.price = item.price;
    return option;
  });

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
  reserveDates.append(...reservationsList);

  let dates = '';
  let price = '';
  // const rubleSymbol = '₽';
  reserveDates.addEventListener('change', event => {
    clearList(reservePeople);

    const selectedIndex = reserveDates.selectedIndex;
    const listIndex = reserveDates[selectedIndex].dataset.index;

    if (listIndex) {
      // индекс из выбраного пункта меню
      const tour = data[listIndex];
      // дата из массива списка туров
      dates = tour.date;
      price = tour.price;
      dates = getParsedDates(dates);
      reserveData.textContent = dates;
      reservePrice.textContent = getRuPriceFormat(price);
      addOption(reservePeople, '', 'Количество человек');
      const minPeople = tour['min-people'];
      const maxPeople = tour['max-people'];
      for (let i = minPeople; i <= maxPeople; i++) {
        addOption(reservePeople, i, i + ' ' + plural(i,
          ['человек', 'человека', 'человек']));
      }
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
      reserveData.textContent = `${dates}, ${selectedValue} ${plural(selectedValue,
        ['человек', 'человека', 'человек'])}`;
      // reservePrice.textContent = price * selectedValue + ' ₽';
      // const ruPriceFormatter = new Intl.NumberFormat('ru', {
      //   style: 'currency',
      //   currency: 'RUB',
      // });
      // reservePrice.textContent = ruPriceFormatter.format(summ);
      const summ = price * selectedValue;
      // reserveData.textContent = date;
      reservePrice.textContent = getRuPriceFormat(summ);
      console.log(reserveData.textContent, reservePrice.textContent);
    } else {
      console.log('date без Количества человек', dates);
      reserveData.textContent = dates;
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


