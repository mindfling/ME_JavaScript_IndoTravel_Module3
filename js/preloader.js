/* eslint-disable max-len */
// eslint-disable-next-line strict
'use strict';

// * preloader overlay *
const docEl = document.documentElement;
const flySize = 50;
const clientCenter = Math.ceil((docEl.clientHeight - flySize) / 2);

const flyOverlay = document.createElement('div');
flyOverlay.classList.add('overlay');
flyOverlay.style.cssText = `
  display: block;
  position: fixed;
  background-color: rgba(0,0,0,0.96);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 1;
  z-index: 999;
  `;

const fly = document.createElement('div');
fly.classList.add('fly', 'fly_fixed');
fly.style.cssText = `
  display: block;
  position: fixed;
  width: 50px;
  height: 50px;
  top: calc(50% - 25px);
  left: 0;
  background: url(./img/airplane.svg) center center / cover no-repeat;
  background-color: transparent;
  z-index: 99;
  opacity: 1;
`;

flyOverlay.append(fly);
document.body.append(flyOverlay);

const durationOpacity = 200; // 300ms
let startOpacity = NaN;
let opacityProgress = 0;
let currentOpacity = 1;
const hideOverlay = (timestamp) => {
  startOpacity = startOpacity || timestamp;
  opacityProgress = (timestamp - startOpacity) / durationOpacity;
  currentOpacity = 1 - opacityProgress;
  console.log('currentOpacity: ', currentOpacity);
  flyOverlay.style.opacity = currentOpacity;
  if (currentOpacity > 0) {
    requestAnimationFrame(hideOverlay);
  } else {
    startOpacity = NaN;
    flyOverlay.remove();
  }
  return;
};

const durationFly = 2000; // 2s
let percentProgress = 0; // * 0% -> 100%
let startTime = NaN;
// * do with progress %%
let shift = 0;
let animationCount = 0;
fly.style.rotate = `90deg`;
// todo with debounce
const stepFly = (timestemp) => {
  console.log('startTime: ', startTime);
  if (!startTime) {
    startTime = timestemp;
  }
  percentProgress = (timestemp - startTime) / durationFly;
  console.log('timestemp: ', timestemp);
  console.log('steps:', animationCount++);
  const scrollWidth = docEl.scrollWidth;
  const maxShift = scrollWidth - fly.clientWidth;
  shift = maxShift * percentProgress;
  fly.style.translate = `${shift}px 0`;
  if (percentProgress < 1) {
    requestAnimationFrame(stepFly);
    if (percentProgress > 0.9) {
      requestAnimationFrame(hideOverlay);
    }
  } else {
    startTime = NaN;
    // requestAnimationFrame(hideOverlay);
  }
  return;
};

requestAnimationFrame(stepFly);
