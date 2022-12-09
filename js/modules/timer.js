/* eslint-disable max-len */
// * this timer is for IndoTravel
// module for using deadline timer in hero section

import {plural, zeroBeforeNumber} from './utiles.js';

// * функция контроля обратного отсчета таймера акции
export const timerControl = (timer, banner) => {
  // получаем элементы таймера
  const timerItemDays = timer.querySelector('.timer__item_days');
  const timerCountDays = timerItemDays.querySelector('.timer__count_days');
  const timerUnitsDays = timerItemDays.querySelector('.timer__units_days');

  const timerCountHours = timer.querySelector('.timer__count_hours');
  const timerUnitsHours = timer.querySelector('.timer__units_hours');

  const timerCountMinutes = timer.querySelector('.timer__count_minutes');
  const timerUnitsMinutes = timer.querySelector('.timer__units_minutes');

  const timerItemSeconds = timer.querySelector('.timer__item_seconds');
  const timerCountSeconds = timerItemSeconds.querySelector('.timer__count_seconds');
  const timerUnitsSeconds = timerItemSeconds.querySelector('.timer__units_seconds');

  const timerRemove = (elem) => {
    elem.style.display = 'none';
  };
  const bannerRemove = (elem) => {
    elem.style.display = 'none';
    elem.style.opacity = 0;
    elem.innerHTML = '&nbsp;<br>&nbsp;';
  };

  // ? parse ? '15/1/2022 21:55' -> '2020-1-15 21:55'
  const deadline = timer.dataset.deadline.split(' ').map(item => item.split('/').reverse().join('-')).join(' ');
  console.log('deadline: ', deadline);

  const timeDeadline = new Date(Date.parse(deadline));

  const timeout = 10000; // ? изменяем таймаут интервала = 10с для минут

  const timerHandle = (timeDeadline, intervalID, timeout = 1000) => {
    console.log('timeDeadline inside timerHandle: ', timeDeadline);
    console.log('timeout inside timerHandle: ', timeout);
    const timeNow = new Date();
    const delta = timeDeadline.getTime() - timeNow.getTime();
    if (delta > 0) {
      console.log('До дедлайна еще осталось ', delta, 'ms');

      const timeLeft = parseInt((timeDeadline.getTime() - timeNow.getTime()) / 1000); // secondsAll
      const secondsLeft = parseInt(timeLeft % 60);
      const minutesLeft = parseInt(timeLeft / 60 % 60);
      const hoursLeft = parseInt(timeLeft / 60 / 60 % 24);
      const hoursLeftAll = timeLeft / 60 / 60;
      const daysLeft = parseInt(timeLeft / 60 / 60 / 24);

      console.log('timeLeft: ', timeLeft);
      console.log('secondsLeft: ', secondsLeft);
      console.log('minutesLeft: ', minutesLeft);
      console.log('hoursLeft: ', hoursLeft);
      console.log('daysLeft: ', daysLeft);

      console.log('secondTimeout: ', intervalID);
      console.log('hoursLeftAll: ', hoursLeftAll);

      if (hoursLeftAll >= 24) {
        console.log('больше суток в запасе');
        timerItemDays.style.display = 'flex';
        timerCountDays.textContent = zeroBeforeNumber(daysLeft);
        timerUnitsDays.textContent = plural(daysLeft, ['день', 'дня', 'дней']);
        timerItemSeconds.style.display = 'none';
        timeout = 10000;
      } else {
        console.warn('меньше суток');
        timerItemSeconds.style.display = 'flex';
        timerCountSeconds.textContent = zeroBeforeNumber(secondsLeft);
        timerUnitsSeconds.textContent = plural(secondsLeft, ['секунда', 'секунды', 'секунд']);
        timerItemDays.style.display = 'none';
        timeout = 1000;
      }

      timerCountMinutes.textContent = zeroBeforeNumber(minutesLeft);
      timerUnitsMinutes.textContent = plural(minutesLeft, ['минута', 'минуты', 'минут']);

      timerCountHours.textContent = zeroBeforeNumber(hoursLeft);
      timerUnitsHours.textContent = plural(hoursLeft, ['час', 'часа', 'часов']);

      // todo
      setTimeout(timerHandle, timeout, timeDeadline, intervalID, timeout);
      return;
    } else {
      console.log('Время истекло, ', deadline + ',', timeDeadline);
      timerRemove(timer);
      bannerRemove(banner);
      // todo ID
      clearTimeout(intervalID);
      console.log('очищен secondTimeout: ', intervalID);
      return;
    }
  };

  // todo timeout, timerID
  const secondTimeout = setTimeout(() => {
    timerHandle(timeDeadline, secondTimeout, timeout);
  }, 0);
};

// * create element
export const createElement = (tag, param = {}, text) => {
  const element = document.createElement(tag);
  Object.assign(element, param);
  if (text) {
    element.textContent = text;
  }
  return element;
};

export const timerPlugin = (timer, banner) => {
  // сделаем плагин
  timer = document.querySelector('[data-timer-deadline]');
  console.log('timer: ', timer);

  timer.classList.add('timer');

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
    timerItemDays,
    timerItemHours,
    timerItemMinutes,
    timerItemSeconds,
  );

  const deadlineOrig = timer.dataset.timerDeadline;
  const deadline = deadlineOrig.split(' ').map(str => str.split('/').reverse().join('-')).join(' ');
  console.log('deadline: ', deadline);
  const timeDeadline = new Date(Date.parse(deadline));
  console.log('timeDeadline: ', timeDeadline);

  const timerRemove = (elem) => {
    elem.style.display = 'none';
  };
  const bannerRemove = (elem) => {
    elem.style.display = 'none';
    elem.style.opacity = 0;
    elem.innerHTML = '&nbsp;<br>&nbsp;';
  };

  const timerHandle = (timeDeadline, intervalID, timeout = 1000) => {
    console.log('timeDeadline inside timerHandle: ', timeDeadline);
    console.log('timeout inside timerHandle: ', timeout);
    const timeNow = new Date();
    const delta = timeDeadline.getTime() - timeNow.getTime();
    if (delta > 0) {
      console.log('До дедлайна еще осталось ', delta, 'ms');

      const timeLeft = parseInt((timeDeadline.getTime() - timeNow.getTime()) / 1000); // secondsAll
      const secondsLeft = parseInt(timeLeft % 60);
      const minutesLeft = parseInt(timeLeft / 60 % 60);
      const hoursLeft = parseInt(timeLeft / 60 / 60 % 24);
      const hoursLeftAll = timeLeft / 60 / 60;
      const daysLeft = parseInt(timeLeft / 60 / 60 / 24);

      console.log('timeLeft: ', timeLeft);
      console.log('secondsLeft: ', secondsLeft);
      console.log('minutesLeft: ', minutesLeft);
      console.log('hoursLeft: ', hoursLeft);
      console.log('daysLeft: ', daysLeft);

      console.log('secondTimeout: ', intervalID);
      console.log('hoursLeftAll: ', hoursLeftAll);

      if (hoursLeftAll >= 24) {
        console.log('больше суток в запасе');
        timerItemDays.style.display = 'flex';
        timerCountDays.textContent = zeroBeforeNumber(daysLeft);
        timerUnitsDays.textContent = plural(daysLeft, ['день', 'дня', 'дней']);
        timerItemSeconds.style.display = 'none';
        timeout = 10000;
      } else {
        console.warn('меньше суток');
        timerItemSeconds.style.display = 'flex';
        timerCountSeconds.textContent = zeroBeforeNumber(secondsLeft);
        timerUnitsSeconds.textContent = plural(secondsLeft, ['секунда', 'секунды', 'секунд']);
        timerItemDays.style.display = 'none';
        timeout = 1000;
      }

      timerCountMinutes.textContent = zeroBeforeNumber(minutesLeft);
      timerUnitsMinutes.textContent = plural(minutesLeft, ['минута', 'минуты', 'минут']);

      timerCountHours.textContent = zeroBeforeNumber(hoursLeft);
      timerUnitsHours.textContent = plural(hoursLeft, ['час', 'часа', 'часов']);

      setTimeout(timerHandle, 1000, timeDeadline);
      return;
    } else {
      console.log('Время истекло, ', deadline + ',', timeDeadline);
      timerRemove(timer);
      bannerRemove(banner);
      console.log('очищен secondTimeout');
      return;
    }
  };

  // todo timeout, timerID
  setTimeout(() => {
    timerHandle(timeDeadline);
  }, 0);
};
