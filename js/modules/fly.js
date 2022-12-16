/* eslint-disable max-len */
// * test fly vertical airplane move with vertical

export const flyControl = () => {
  const fly = document.createElement('div');
  fly.classList.add('fly', 'fly_fixed', 'fly_vertical');
  const flySize = 50;
  let top = 0;
  fly.style.cssText = `
    display: block;
    position: fixed;
    width: ${flySize}px;
    height: ${flySize}px;
    top: ${top};
    right: 0;
    z-index: 50;
    opacity: 1;
    background: url(./img/airplane.svg) center center / cover no-repeat;
    background-color: transparent;
    transform: rotateZ(180deg);
    cursor: pointer;
  `;

  document.body.append(fly);

  const calcPositionFly = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    const maxDown = clientHeight - fly.clientHeight;
    const maxScroll = scrollHeight - clientHeight;
    const percentScroll = (window.pageYOffset * 100) / maxScroll;
    top = maxDown * percentScroll / 100;
    fly.style.transform = 'translateY(' + top + 'px) rotate(180deg)';
    return;
  };

  window.addEventListener('scroll', (event) => {
    requestAnimationFrame(calcPositionFly);
  });
};
