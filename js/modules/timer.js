// * this timer is for IndoTravel
// module for using deadline timer in hero section

import {plural} from './utiles.js';
console.log('plural: ', plural);

export const timer = document.querySelector('.timer');


export const timerControl = (timer, deadline) => {
  console.log('timer is good');
  console.log('timer: ', timer);

  const heroTimer = document.querySelector('.hero__timer');
  console.log('heroTimer: ', heroTimer);

  const timerCountDays = heroTimer.querySelector('.timer__count_days');
  const timerUnitsDays = heroTimer.querySelector('.timer__units_days');
  const timerCountHours = heroTimer.querySelector('.timer__count_hours');
  const timerUnitsHours = heroTimer.querySelector('.timer__units_hours');
  const timerCountMinutes = heroTimer.querySelector('.timer__count_minutes');
  const timerUnitsMinutes = heroTimer.querySelector('.timer__units_minutes');

  console.log('timerCountDays: ', timerCountDays);
  console.log('timerUnitsDays: ', timerUnitsDays);
  console.log('timerCountHours: ', timerCountHours);
  console.log('timerUnitsHours: ', timerUnitsHours);
  console.log('timerCountMinutes: ', timerCountMinutes);
  console.log('timerUnitsMinutes: ', timerUnitsMinutes);

  const timerDeadline = timer.dataset.timerDeadline;
  const timerDeadlineStr = timerDeadline.split('/').reverse().join('-');
  const timeDead = Date.parse(timerDeadlineStr);
  const time = (new Date(timeDead + 100000));

  console.log('timer: ', timer);
  console.log('heroTimer: ', heroTimer);
  console.log('timerDeadline: ', timerDeadline);
  console.log('timerDeadlineStr: ', timerDeadlineStr);
  console.log('timer is good', Date.parse(timerDeadlineStr));
  console.log('timeDead: ', timeDead);
  console.log('time: ', time);
  console.log(time.getDate(),
    time.getMonth() + 1,
    time.getFullYear(),
    time.getHours(),
    time.getMinutes(), time.getSeconds());

  timerCountMinutes.textContent = time.getMinutes();
  console.log(timerCountMinutes.textContent);

  return;
};
