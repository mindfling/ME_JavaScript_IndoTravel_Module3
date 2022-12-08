/* eslint-disable max-len */
// * this timer is for IndoTravel
// module for using deadline timer in hero section

import {plural, zeroBeforeNumber} from './utiles.js';


export const timerControl = (timer) => {
  // получаем элементы таймера
  const timerCountDays = timer.querySelector('.timer__count_days');
  const timerUnitsDays = timer.querySelector('.timer__units_days');
  const timerCountHours = timer.querySelector('.timer__count_hours');
  const timerUnitsHours = timer.querySelector('.timer__units_hours');
  const timerCountMinutes = timer.querySelector('.timer__count_minutes');
  const timerUnitsMinutes = timer.querySelector('.timer__units_minutes');
  const timerCountSeconds = timer.querySelector('.timer__count_seconds');
  console.log('timerCountSeconds: ', timerCountSeconds);
  const timerUnitsSeconds = timer.querySelector('.timer__units_seconds');


  // ? parse ? '15/1/2022 21:55' -> '2020-1-15 21:55'
  const deadline = timer.dataset.deadline.split(' ').map(item => item.split('/').reverse().join('-')).join(' ');
  console.log('deadline: ', deadline);
  const timeDeadline = new Date(Date.parse(deadline));

  const timeout = 10000; // ? изменяем таймаут интервала = 10с
  const timerHandle = (timeDeadline, intervalID) => {
    const timeNow = new Date();
    const delta = timeDeadline.getTime() - timeNow.getTime();
    if (delta > 0) {
      console.log('До дедлайна еще осталось ', delta, 'ms');
      const timeLeft = parseInt((timeDeadline.getTime() - timeNow.getTime()) / 1000); // secondsAll
      const secondsLeft = parseInt(timeLeft % 60);
      const minutesLeft = parseInt(timeLeft / 60 % 60);
      const hoursLeft = parseInt(timeLeft / 60 / 60 % 24);
      const daysLeft = parseInt(timeLeft / 60 / 60 / 24);

      console.log('timeLeft: ', timeLeft);
      console.log('secondsLeft: ', secondsLeft);
      console.log('minutesLeft: ', minutesLeft);
      console.log('hoursLeft: ', hoursLeft);
      console.log('daysLeft: ', daysLeft);

      timerCountSeconds.textContent = zeroBeforeNumber(secondsLeft);
      timerUnitsSeconds.textContent = plural(secondsLeft, ['секунда', 'секунды', 'секунд']);
      timerCountMinutes.textContent = zeroBeforeNumber(minutesLeft);
      timerUnitsMinutes.textContent = plural(minutesLeft, ['минута', 'минуты', 'минут']);
      timerCountHours.textContent = zeroBeforeNumber(hoursLeft);
      timerUnitsHours.textContent = plural(hoursLeft, ['час', 'часа', 'часов']);
      timerCountDays.textContent = zeroBeforeNumber(daysLeft);
      timerUnitsDays.textContent = plural(daysLeft, ['день', 'дня', 'дней']);
      console.log('secondTimeout: ', intervalID);
      setTimeout(timerHandle, 1000, timeDeadline);
      return;
    } else {
      console.log('Время истекло, ', deadline + ',', timeDeadline);
      timer.style.opacity = .2;
      // todo ID
      if (intervalID) {
        console.log('очищаем secondTimeout: ', intervalID);
        clearTimeout(intervalID);
        console.log('очищен secondTimeout: ', intervalID);
      }
      return;
    }
  };

  const secondTimeout = setTimeout(() => {
    timerHandle(timeDeadline, secondTimeout);
  }, 0);
};
