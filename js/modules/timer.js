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

  const timerDeadline = timer.dataset.timerDeadline;
  console.log('timerDeadline: ', timerDeadline);
  const time = Date.parse(timerDeadline);
  console.log(time);
  return;
};
