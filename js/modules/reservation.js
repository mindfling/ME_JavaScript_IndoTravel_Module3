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

const reservation = document.getElementById('reservation');
const reservationForm = reservation.querySelector('.reservation__form');
const reserveDate = reservationForm.querySelector('#reservation__date');
const reservePeople = reservationForm.querySelector('#reservation__people');
const reservationData = reservationForm.querySelector('.reservation__data');
const reservationPrice = reservationForm.querySelector('.reservation__price');

const addTourOption = (parent, value = '', text = '') => {
  const option = document.createElement('option');
  option.classList.add('tour__option', 'reservation__option');
  option.value = value || '';
  option.textContent = text || '';
  parent.append(option);
};

// 1st select option
const addDefaultTourOption = (parent, value = '', text = '') => {
  const option = document.createElement('option');
  option.classList.add('tour__option');
  option.value = value;
  option.textContent = text || 'Дата путешествия';
  parent.append(option);
};

// * reservationControl
export const reservationControl = async () => {
  clearSelectList(reserveDate);
  addDefaultTourOption(reserveDate, '', 'Дата путешествия');

  clearSelectList(reservePeople);
  addDefaultTourOption(reservePeople, '', 'Количество человек');

  // other selects
  const list = await getListReservation(URI);
  list.forEach(item => {
    // console.log(`Дата маршрута: ${item.date} ` + `от ${item['min-people']} до ${item['max-people']} человек`);
    addTourOption(reserveDate, item.date, 'даты ' + item.date);
  });

  const minPeople = list[0]['min-people'];
  const maxPeople = list[0]['max-people'];
  for (let i = minPeople; i <= maxPeople; i++) {
    addTourOption(reservePeople, i, i + ' человек');
  }

  reservationData.textContent = list[0].date + ' ' + list[0]['max-people'] + ' человек';
  reservationPrice.textContent = list[0].price + ' ₽';
};
