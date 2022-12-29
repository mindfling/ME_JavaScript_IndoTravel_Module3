/* eslint-disable max-len */
// eslint-disable-next-line strict
'use strict';

// * do with raf debounce
const debounce = (fn) => {
  let raf = false;
  return (...args) => {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      fn(...args);
      raf = false;
    });
  };
};

// * preloader overlay *
const flySize = 100;
const flyOverlay = document.createElement('div');
flyOverlay.classList.add('overlay');
flyOverlay.style.cssText = `
  display: block;
  position: fixed;
  background-color: rgba(0,0,0,0.98);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 0;
  z-index: 999;
  transition: all 200ms ease;
`;
// * preloader fly *
const fly = document.createElement('div');
fly.classList.add('fly', 'fly_fixed');
fly.style.cssText = `
  display: block;
  position: fixed;
  width: ${flySize}px;
  height: ${flySize}px;
  top: calc(50% - ${flySize / 2}px);
  left: 0;
  background: url(./img/airplane.svg) center center / cover no-repeat;
  background-color: transparent;
  z-index: 99;
  opacity: 0;
  transition: all 100ms ease;
`;

flyOverlay.append(fly);
document.body.append(flyOverlay);
fly.style.rotate = `90deg`;

const durationOpacity = 200; // 300ms
let startOpacity = NaN;
let opacityProgress = 0;
let currentOpacity = 1;
const hideOverlay = (timestamp) => {
  startOpacity = startOpacity || timestamp;
  opacityProgress = (timestamp - startOpacity) / durationOpacity;
  currentOpacity = 1 - opacityProgress;
  flyOverlay.style.opacity = currentOpacity;
  if (currentOpacity > 0) {
    requestAnimationFrame(hideOverlay);
  } else {
    startOpacity = NaN;
    flyOverlay.remove();
  }
  return;
};


const durationFly = 1000; // * 1s
let percentProgress = 0;
let startTime = NaN;
let leftShift = 0;
const stepFly = (timestemp) => {
  if (!startTime) {
    startTime = timestemp;
  }
  percentProgress = (timestemp - startTime) / durationFly;
  const scrollWidth = document.documentElement.scrollWidth;
  const maxShift = scrollWidth - fly.clientWidth;
  leftShift = maxShift * percentProgress;
  fly.style.translate = `${leftShift}px 0`;
  if (percentProgress < 1) {
    flyOverlay.style.opacity = 1;
    if (percentProgress < 0.2) {
      // самолет появляется
      fly.style.opacity = (5 * percentProgress);
    } else if (percentProgress > 0.8) {
      // самолет исчезает
      fly.style.opacity = ((1 - percentProgress) * 5);
    } else {
      fly.style.opacity = 1;
    }
    // requestAnimationFrame(stepFly); // no debounce
    requestAnimationFrame(debounceFly); // with debounce
  } else {
    startTime = NaN;
    requestAnimationFrame(hideOverlay);
  }
  return;
};

// requestAnimationFrame(stepFly);
// * new debounce fly
const debounceFly = debounce(stepFly);
requestAnimationFrame(debounceFly);
