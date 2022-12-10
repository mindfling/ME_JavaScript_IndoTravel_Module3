// 'use strict';


// * функция для добавления нуля 0 перед цифрой
const zeroBeforeNumber = (number) =>
  ((number >= 10) ? `${number}` : `0${number}`);

// https://proweb63.ru/help/js/declension-in-js
// * функция для окончания числительных
const plural = (number, text, cases = [2, 0, 1, 1, 1, 2]) =>
  text[((number % 100 > 4) && (number % 100 < 20)) ? 2 :
    cases[(number % 10 < 5) ? (number % 10) : 5]];

// * create element
const createElement = (tag, param = {}, text) => {
  const element = document.createElement(tag);
  Object.assign(element, param);
  if (text) {
    element.textContent = text;
  }
  return element;
};


const timerPlugin = () => {
  // сделаем плагин
  const timer = document.querySelector('[data-timer-deadline]');
  timer.classList.add('timer');
  const banner = document.querySelector('.hero__text');


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

  const timerItemHours = createElement('p', {
    className: 'timer__item timer__item_hours',
  });
  const timerCountHours = createElement('span', {
    className: 'timer__count timer__count_hours',
  }, '00');
  const timerUnitsHours = createElement('span', {
    className: 'timer__units timer__units_hours',
  }, 'час');

  const timerItemMinutes = createElement('p', {
    className: 'timer__item timer__item_minutes',
  });
  const timerCountMinutes = createElement('span', {
    className: 'timer__count timer__count_minutes',
  }, '00');
  const timerUnitsMinutes = createElement('span', {
    className: 'timer__units timer__units_minutes',
  }, 'минут');

  const timerItemSeconds = createElement('p', {
    className: 'timer__item timer__item_seconds',
  });
  const timerCountSeconds = createElement('span', {
    className: 'timer__count timer__count_seconds',
  }, '00');
  const timerUnitsSeconds = createElement('span', {
    className: 'timer__units timer__units_seconds',
  }, 'сек');


  timerItemDays.append(timerCountDays, timerUnitsDays);
  timerItemHours.append(timerCountHours, timerUnitsHours);
  timerItemMinutes.append(timerCountMinutes, timerUnitsMinutes);
  timerItemSeconds.append(timerCountSeconds, timerUnitsSeconds);
  timer.append(
    timerTitle,
    // timerItemDays,
    timerItemHours,
    timerItemMinutes,
    // timerItemSeconds,
  );


  const deadline = timer.dataset.timerDeadline.split(' ').map(str =>
    str.split('/').reverse().join('-')).join(' ');
  const timeDeadline = new Date(Date.parse(deadline));

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

      console.log(
        'timeLeft: ', timeLeft,
        'secondsLeft: ', secondsLeft,
        'minutesLeft: ', minutesLeft,
        'hoursLeft: ', hoursLeft,
        'hoursLeftAll: ', hoursLeftAll,
        'daysLeft: ', daysLeft,
      );
      console.log('До дедлайна еще осталось ', delta, 'ms');

      timerCountMinutes.textContent = zeroBeforeNumber(minutesLeft);
      timerUnitsMinutes.textContent = plural(minutesLeft,
        ['минута', 'минуты', 'минут']);

      timerCountHours.textContent = zeroBeforeNumber(hoursLeft);
      timerUnitsHours.textContent = plural(hoursLeft, ['час', 'часа', 'часов']);

      if (hoursLeftAll >= 24) {
        console.log('больше суток в запасе\n\n');
        // отобразить дни
        timerTitle.after(timerItemDays);
        timerCountDays.textContent = zeroBeforeNumber(daysLeft);
        timerUnitsDays.textContent = plural(daysLeft, ['день', 'дня', 'дней']);
        // скрыть секунды
        timerItemSeconds.remove();
        // timeout 5s
        setTimeout(timerHandle, 5000, timeDeadline);
      } else {
        console.log('меньше суток до', deadline);
        // скрыть дни
        timerItemDays.remove(); // todo
        // отобразить секунды
        timerItemMinutes.after(timerItemSeconds);
        timerCountSeconds.textContent = zeroBeforeNumber(secondsLeft);
        timerUnitsSeconds.textContent = plural(secondsLeft,
          ['секунда', 'секунды', 'секунд']);
        // timeout 1s
        setTimeout(timerHandle, 1000, timeDeadline);
      }

      return;
    } else {
      console.log('Время истекло, ', deadline + ',', timeDeadline);
      timerRemove(timer);
      bannerRemove(banner);
      return;
    }
  };

  // todo timeout
  setTimeout(() => {
    timerHandle(timeDeadline);
  }, 0);
};


document.addEventListener('DOMContentLoaded', timerPlugin);
