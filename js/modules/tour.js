// * module for booking at #tour

const URI = 'date.json';

const tourSection = document.getElementById('tour');
const tourForm = tourSection.querySelector('.tour__form');
const tourDate = tourForm.dates; // * #tour__date
const tourPeople = tourForm.people; // * #tour__people

// получаем удаленный список АСИНХРОННО
const getListReservation = async (uri) => {
  const result = await fetch(uri);
  const data = await result.json();
  return data;
};

const addSelectOption = ({
  parent,
  classNameList,
  value,
  text,
  index,
}) => {
  const option = document.createElement('option');
  option.classList.add(...classNameList);
  option.value = value || '';
  option.textContent = (text || value || '');
  if (index) option.dataset.index = index || 0;
  parent.append(option);
  return parent;
};

const addSelectDefaultDates = (parent) => {
  // parent = tourDate
  addSelectOption({
    parent,
    classNameList: ['tour__option', 'tour__date-text'],
    value: '',
    text: 'Выберите дату',
  });
};

const addSelectDefaultPeople = (parent) => {
  // parent = tourPeople
  addSelectOption({
    parent,
    classNameList: ['tour__option', 'tour__people-text'],
    value: '',
    text: 'Количество человек',
  });
};

// заполняем даты туров
const renderDatesList = (parent, data) => {
  data.forEach((item, index) => {
    addSelectOption({
      parent,
      classNameList: ['tour__option'],
      value: index + 1,
      text: item.date + ' даты',
      // index: index + 1,
    });
  });
};

// заполняем select количество человек min..max для тура номер data[j]
const renderPeopleList = (parent, tour) => {
  const minPeople = tour['min-people'];
  const maxPeople = tour['max-people'];
  for (let i = minPeople; i <= maxPeople; i++) {
    addSelectOption({
      parent,
      classNameList: ['tour__option'],
      value: i,
      text: i + ' человек',
    });
  }
};


// * tour control all func
export const tourControl = async () => {
  // очищаем оба списка
  tourDate.replaceChildren();
  tourPeople.replaceChildren();
  // подсказка
  tourDate.title = 'Начните с выбора даты тура';
  tourPeople.title = 'Выберите дату тура, а потом количество человек';
  // первая строка даты списка
  addSelectDefaultDates(tourDate);
  // получаем список
  const data = await getListReservation(URI);
  // один раз рендерим список даты туров
  renderDatesList(tourDate, data);
  // вешаем событие select
  tourDate.addEventListener('change', (event) => {
    const target = event.target;
    const listIndex = target.value; // индекс номер списка
    tourPeople.replaceChildren(); // очищаем
    if (listIndex) {
      // при каждом новом выборе даты тура перерендериваем Количество человек
      addSelectDefaultPeople(tourPeople);
      renderPeopleList(tourPeople, data[listIndex - 1]);
    }
  });
};
