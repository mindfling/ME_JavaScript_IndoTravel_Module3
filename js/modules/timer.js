/* eslint-disable max-len */
// * this timer is for IndoTravel
// module for using deadline timer in hero section

import {plural, zeroBeforeNumber} from './utiles.js';


export const heroTimer = document.querySelector('.hero__timer');

export const timerControl = (timer, deadline) => {
  const timerCountDays = timer.querySelector('.timer__count_days');
  const timerUnitsDays = timer.querySelector('.timer__units_days');
  const timerCountHours = timer.querySelector('.timer__count_hours');
  const timerUnitsHours = timer.querySelector('.timer__units_hours');
  const timerCountMinutes = timer.querySelector('.timer__count_minutes');
  const timerUnitsMinutes = timer.querySelector('.timer__units_minutes');


  // ? '15/1/2022' -> '2020-1-15'
  const timerDeadline = timer.dataset.timerDeadline.split('/').reverse().join('-');
  const time = new Date(Date.parse(timerDeadline));

  const minutes = time.getMinutes();
  timerCountMinutes.textContent = zeroBeforeNumber(minutes);
  timerUnitsMinutes.textContent = plural(minutes, ['минута', 'минуты', 'минут']);

  const hours = time.getHours();
  timerCountHours.textContent = zeroBeforeNumber(hours);
  timerUnitsHours.textContent = plural(hours, ['час', 'часа', 'часов']);

  const days = parseInt(Date.parse(time) / 1000 / 60 / 60) % 24;
  timerCountDays.textContent = zeroBeforeNumber(days);
  timerUnitsDays.textContent = plural(days, ['день', 'дня', 'дней']);

  const zeroTime = new Date(2022, 12, 21);
  console.log('zeroTime: ', zeroTime);
  console.log('zeroTime: ', +zeroTime);

  const nowTime = new Date();
  console.log('nowTime: ', nowTime);
  console.log('nowTime: ', +nowTime);

  const delta = +zeroTime - +nowTime;
  console.log('delta', delta,
    parseInt(delta / 1000) % 60,
    parseInt(delta / 1000 / 60) % 60);
  console.log('delta', delta,
    new Date(delta).getSeconds(),
    new Date(delta).getMinutes(),
    new Date(delta).getHours(),
  );

  return;
};
