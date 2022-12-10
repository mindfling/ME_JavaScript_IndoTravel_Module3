// ** timer plugin js for .timer and .banner
// eslint-disable-next-line strict
'use strict';

//  функция для добавления нуля 0 перед цифрой
const zeroBeforeNumber = (number) =>
  ((number >= 10) ? `${number}` : `0${number}`);

//  функция для окончания числительных
// https://proweb63.ru/help/js/declension-in-js
const plural = (number, text, cases = [2, 0, 1, 1, 1, 2]) =>
  text[((number % 100 > 4) && (number % 100 < 20)) ? 2 :
    cases[(number % 10 < 5) ? (number % 10) : 5]];

//  функция создания dom элемента create element
const createElement = (tag, param = {}, text) => {
  const element = document.createElement(tag);
  Object.assign(element, param);
  if (text) {
    element.textContent = text;
  }
  return element;
};

//  сделаем плагин
const timerPlugin = () => {
  let timer = document.querySelector('.timer');
  if (!timer) {
    timer = document.querySelector('.hero__timer');
  }
  if (!timer) {
    timer = document.querySelector('[data-timer-deadline]');
  }
  timer.classList.add('timer');
  const banner = document.querySelector('.hero__text');

  // todo create
  const timerTitle = createElement('p', {
    className: 'timer__title',
  }, 'До конца акции осталось:');

  const timerItemDays = createElement('p', {
    className: 'timer__item timer__item_days',
  });
  const timerCountDays = createElement('span', {
    className: 'timer__count timer__count_days',
  }, '00');
  const timerUnitsDays = createElement('span', {
    className: 'timer__units timer__units_days',
  }, 'дни');

  timerItemDays.append(timerCountDays, timerUnitsDays);

  const timerItemHours = createElement('p', {
    className: 'timer__item timer__item_hours',
  });
  const timerCountHours = createElement('span', {
    className: 'timer__count timer__count_hours',
  }, '00');
  const timerUnitsHours = createElement('span', {
    className: 'timer__units timer__units_hours',
  }, 'час');

  timerItemHours.append(timerCountHours, timerUnitsHours);

  const timerItemMinutes = createElement('p', {
    className: 'timer__item timer__item_minutes',
  });
  const timerCountMinutes = createElement('span', {
    className: 'timer__count timer__count_minutes',
  }, '00');
  const timerUnitsMinutes = createElement('span', {
    className: 'timer__units timer__units_minutes',
  }, 'минут');

  timerItemMinutes.append(timerCountMinutes, timerUnitsMinutes);

  const timerItemSeconds = createElement('p', {
    className: 'timer__item timer__item_seconds',
  });
  const timerCountSeconds = createElement('span', {
    className: 'timer__count timer__count_seconds',
  }, '00');
  const timerUnitsSeconds = createElement('span', {
    className: 'timer__units timer__units_seconds',
  }, 'сек');

  timerItemSeconds.append(timerCountSeconds, timerUnitsSeconds);

  timer.append(
    timerTitle,
    timerItemHours,
    timerItemMinutes,
  );

  const deadline = timer.dataset.timerDeadline.split(' ').map(str =>
    str.split('/').reverse().join('-')).join(' ');
  const timeDeadline = new Date(Date.parse(deadline));

  // todo control

  const timerRemove = (elem) => {
    elem.style.display = 'none';
  };

  const bannerRemove = (elem) => {
    // ? elem.style.display = 'none';
    elem.style.opacity = 0;
    elem.innerHTML = '&nbsp;<br>&nbsp;';
  };

  const timerHandle = (timeDeadline) => {
    const timeNow = new Date();
    const delta = timeDeadline.getTime() - timeNow.getTime();

    if (delta > 0) {
      const timeLeft = parseInt((timeDeadline.getTime() -
        timeNow.getTime()) / 1000); // all seconds
      const secondsLeft = parseInt(timeLeft % 60);
      const minutesLeft = parseInt(timeLeft / 60 % 60);
      const hoursLeft = parseInt(timeLeft / 60 / 60 % 24);
      const hoursLeftAll = timeLeft / 60 / 60;
      const daysLeft = parseInt(timeLeft / 60 / 60 / 24);

      timerCountMinutes.textContent = zeroBeforeNumber(minutesLeft);
      timerUnitsMinutes.textContent = plural(minutesLeft,
        ['минута', 'минуты', 'минут']);

      timerCountHours.textContent = zeroBeforeNumber(hoursLeft);
      timerUnitsHours.textContent = plural(hoursLeft, ['час', 'часа', 'часов']);

      if (hoursLeftAll >= 24) {
        // больше суток в запасе
        timerTitle.after(timerItemDays); // отобразить дни
        timerCountDays.textContent = zeroBeforeNumber(daysLeft);
        timerUnitsDays.textContent = plural(daysLeft, ['день', 'дня', 'дней']);
        timerItemSeconds.remove(); // скрыть секунды // todo
        // timeout 5s
        setTimeout(timerHandle, 5000, timeDeadline);
      } else {
        // меньше суток дедлайна
        timerItemDays.remove(); // скрыть дни // todo
        timerItemMinutes.after(timerItemSeconds); // отобразить секунды
        timerCountSeconds.textContent = zeroBeforeNumber(secondsLeft);
        timerUnitsSeconds.textContent = plural(secondsLeft,
          ['секунда', 'секунды', 'секунд']);
        // timeout 1s
        setTimeout(timerHandle, 1000, timeDeadline);
      }
    } else {
      // Время истекло !!!
      timerRemove(timer);
      bannerRemove(banner);
    }
    return;
  };

  setTimeout(() => {
    timerHandle(timeDeadline);
  }, 0);
};

// запускаем после полной загрузки страницы
document.addEventListener('DOMContentLoaded', timerPlugin);
