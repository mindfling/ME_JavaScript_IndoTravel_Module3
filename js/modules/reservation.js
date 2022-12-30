/* eslint-disable max-len */
// * module load reservation information

const URI = 'date.json';

// получаем удаленный список
const getListReservation = async (URI) => {
  const result = await fetch(URI);
  const list = await result.json();
  return list;
};

const clearSelectList = (parent) => {
  while (parent.lastChild) {
    parent.lastChild.remove();
  }
  return parent;
};

const reservationForm = document.querySelector('.reservation__form');
const reserveDate = reservationForm.querySelector('#reservation__date');
const reservePeople = reservationForm.querySelector('#reservation__people');
const reserveData = reservationForm.querySelector('.reservation__data');
const reservePrice = reservationForm.querySelector('.reservation__price');


const addOption = (parent, value = '', text = '', index, price) => {
  const option = document.createElement('option');
  option.classList.add('tour__option', 'reservation__option');
  option.value = value || '';
  option.textContent = text || '';
  if (index) option.dataset.index = index;
  if (price) option.dataset.price = price;
  parent.append(option);
};

// todo do it with map list

// 1st select option
const addDefaultOption = (parent, value = '', text = '') => {
  const option = document.createElement('option');
  option.classList.add('tour__option');
  option.value = value;
  option.textContent = text || 'Дата путешествия';
  parent.append(option);
};

// * reservationControl
export const reservationControl = async () => {
  clearSelectList(reserveDate);
  addDefaultOption(reserveDate, '', 'Дата путешествия');

  clearSelectList(reservePeople);
  addDefaultOption(reservePeople, '', 'Количество человек');

  // other selects
  const list = await getListReservation(URI);
  list.forEach((item, index) => {
    addOption(reserveDate, item.date, 'даты ' + item.date, index, item.price);
  });

  // const minPeople = list[0]['min-people'];
  // const maxPeople = list[0]['max-people'];
  // for (let i = minPeople; i <= maxPeople; i++) {
  //   addOption(reservePeople, i, i + ' человек');
  // }


  reserveDate.addEventListener('change', (event) => {
    const target = event.target;
    const selectedIndex = reserveDate.selectedIndex; //
    const listIndex = target[selectedIndex].dataset.index; // индекс номер списка
    console.log('selectedIndex: ', selectedIndex);
    console.log('listIndex: ', listIndex);
    reservePeople.replaceChildren(); // очищаем
    if (listIndex) {
      // при каждом новом выборе даты тура перерендериваем Количество человек
      const minPeople = list[listIndex]['min-people'];
      const maxPeople = list[listIndex]['max-people'];
      for (let i = minPeople; i <= maxPeople; i++) {
        addOption(reservePeople, i, i + ' человек');
      }
      // reserveData.textContent = list[listIndex].date + ' ' + list[listIndex]['max-people'] + ' человек';
      reserveData.textContent = list[listIndex].date;
      reservePrice.textContent = list[listIndex].price + ' ₽';
    }
  });
};
