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


  // ? parse ? '15/1/2022' -> '2020-1-15'
  const deadline = timer.dataset.deadline.split('/').reverse().join('-');
  const timeDeadline = new Date(Date.parse(deadline));

  const timeout = 1000; // ? изменяем таймаут интервала
  const timerHandle = (timeDeadline, intervalID) => {
    const timeNow = new Date();
    const delta = timeDeadline.getTime() - timeNow.getTime();
    if (delta > 0) {
      console.log('До дедлайна еще осталось ', delta, 'ms');
      const timeLeft = parseInt((timeDeadline.getTime() - timeNow.getTime()) / 1000);
      const secondsLeft = parseInt(timeLeft % 60);
      const minutesLeft = parseInt(timeLeft / 60 % 60);
      const hoursLeft = parseInt(timeLeft / 60 / 60 % 24);
      const daysLeft = parseInt(timeLeft / 60 / 60 / 24);

      console.log('timeLeft: ', timeLeft);
      console.log('secondsLeft: ', secondsLeft);
      console.log('minutesLeft: ', minutesLeft);
      console.log('hoursLeft: ', hoursLeft);
      console.log('daysLeft: ', daysLeft);

      // timerCountSeconds.textContent = zeroBeforeNumber(secondsLeft);
      // timerUnitsSeconds.textContent = plural(secondsLeft, ['секунда', 'секунды', 'секунд']);
      timerCountMinutes.textContent = zeroBeforeNumber(minutesLeft);
      timerUnitsMinutes.textContent = plural(minutesLeft, ['минута', 'минуты', 'минут']);
      timerCountHours.textContent = zeroBeforeNumber(hoursLeft);
      timerUnitsHours.textContent = plural(hoursLeft, ['час', 'часа', 'часов']);
      timerCountDays.textContent = zeroBeforeNumber(daysLeft);
      timerUnitsDays.textContent = plural(daysLeft, ['день', 'дня', 'дней']);
      console.log('secondInterval: ', intervalID);
      return;
    } else {
      console.log('Время истекло, ', deadline + ',', timeDeadline);
      timer.style.opacity = .2;
      if (intervalID) {
        console.log('очищаем secondInterval: ', intervalID);
        clearInterval(intervalID);
      }
      return;
    }
  };
  timerHandle(timeDeadline);

  const secondInterval = setInterval(() => {
    timerHandle(timeDeadline, secondInterval);
  // ? 60*1000 минутный интервал
  }, timeout);
};
