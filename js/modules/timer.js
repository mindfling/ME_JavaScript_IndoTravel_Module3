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
  // ? time is up to now
  const timeNow = new Date();
  const delta = timeDeadline - timeNow; // timeDeadline > timeNow

  if (delta > 0) {
    console.log('До дедлайна еще осталось ', delta);
    const timeLeft = parseInt((timeDeadline.getTime() - timeNow.getTime()) / 1000);

    // const timeLeftSecondsAll = parseInt(delta / 1000);
    // const timeLeftMinutesAll = parseInt(timeLeftSecondsAll / 60);
    // const timeLeftHours = parseInt(timeLeftMinutesAll / 60);
    // console.log('timeLeftSecondsAll: ', timeLeftSecondsAll, 'всего секунд');
    // console.log('timeLeftMinutesAll: ', timeLeftMinutesAll, 'всего минут');
    // console.log('timeLeftHours: ', timeLeftHours, 'часов');

    console.log('timeLeft: ', timeLeft);
    const secondsLeft = timeLeft % 60;
    const minutesLeft = parseInt(timeLeft / 60 % 60);
    const hoursLeft = parseInt(timeLeft / 60 / 60 % 24);
    const daysLeft = parseInt(timeLeft / 60 / 60 / 24);

    console.log('secondsLeft: ', secondsLeft);
    console.log('minutesLeft: ', minutesLeft);
    console.log('hoursLeft: ', hoursLeft);
    console.log('daysLeft: ', daysLeft);

    timerCountMinutes.textContent = zeroBeforeNumber(minutesLeft);
    timerUnitsMinutes.textContent = plural(minutesLeft, ['минута', 'минуты', 'минут']);

    timerCountMinutes.textContent = zeroBeforeNumber(secondsLeft);
    timerUnitsMinutes.textContent = plural(secondsLeft, ['секунда', 'секунды', 'секунд']);

    timerCountHours.textContent = zeroBeforeNumber(hoursLeft);
    timerUnitsHours.textContent = plural(hoursLeft, ['час', 'часа', 'часов']);

    timerCountDays.textContent = zeroBeforeNumber(daysLeft);
    timerUnitsDays.textContent = plural(daysLeft, ['день', 'дня', 'дней']);

    return;
  } else {
    console.log('Время истекло, ', deadline);
    console.log(timeDeadline);
    // timer.style.display = 'none';
    timer.style.opacity = 0;
    return;
  }

  /**
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
  */
};
