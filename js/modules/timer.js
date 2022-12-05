/* eslint-disable max-len */
// * this timer is for IndoTravel
// module for using deadline timer in hero section

import {plural} from './utiles.js';
/**
// todo test plural
for (let i = 0; i < 111; i++) {
  console.log('plural ', i,
    plural(i, ['1,21,31яблоко', '2,3,4,яблока', '0,5,6,7,8,9,10,11,12..20,яблок']));
    plural(i, ['яблоко', 'яблока', 'яблок']));
}
 */

// export const timer = document.querySelector('.timer');
export const heroTimer = document.querySelector('.hero__timer');
// console.log('heroTimer: ', heroTimer);


export const timerControl = (timer, deadline) => {
  const timerCountDays = timer.querySelector('.timer__count_days');
  const timerUnitsDays = timer.querySelector('.timer__units_days');
  const timerCountHours = timer.querySelector('.timer__count_hours');
  const timerUnitsHours = timer.querySelector('.timer__units_hours');
  const timerCountMinutes = timer.querySelector('.timer__count_minutes');
  const timerUnitsMinutes = timer.querySelector('.timer__units_minutes');

  // console.log('timerCountDays: ', timerCountDays);
  // console.log('timerUnitsDays: ', timerUnitsDays);
  // console.log('timerCountHours: ', timerCountHours);
  // console.log('timerUnitsHours: ', timerUnitsHours);
  // console.log('timerCountMinutes: ', timerCountMinutes);
  // console.log('timerUnitsMinutes: ', timerUnitsMinutes);

  const timerDeadline = timer.dataset.timerDeadline;
  const timerDeadlineStr = timerDeadline.split('/').reverse().join('-');
  const timeDead = Date.parse(timerDeadlineStr);
  const time = (new Date(timeDead)); // todo here

  console.log('timerDeadline: ', timerDeadline);
  console.log('timerDeadlineStr: ', timerDeadlineStr);

  console.log('timeDead: ', timeDead);
  console.log('time конца: ', time);
  console.log('parse конца: ', Date.parse(time));
  console.log(
    time.getFullYear() + '-' +
    (time.getMonth() + 1) + '-' +
    time.getDate(),
    time.getHours(), ':',
    time.getMinutes(), ':',
    time.getSeconds(),
  );

  const minutes = time.getMinutes();
  timerCountMinutes.textContent = (minutes >= 10) ? `${minutes}` : `0${minutes}`;
  timerUnitsMinutes.textContent = plural(minutes, ['минута', 'минуты', 'минут']);

  const hours = time.getHours();
  timerCountHours.textContent = (hours < 10) ? `0${hours}` : `${hours}`;
  timerUnitsHours.textContent = plural(hours, ['час', 'часа', 'часов']);

  const days = parseInt(Date.parse(time) / 1000 / 60 / 60) % 24;
  timerCountDays.textContent = days > 9 ? days : '0' + days;
  timerUnitsDays.textContent = plural(days, ['день', 'дня', 'дней']);
  console.log('timerCountDays.textContent: ', timerCountDays.textContent, timerUnitsDays.textContent);

  return;
};
