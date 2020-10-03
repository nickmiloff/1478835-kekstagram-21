'use strict';

const KeyboardKeys = {
  ESC: `Escape`,
  ENTER: `Enter`
};

window.getRandomElem = (array) => array[window.getRandomInt(0, array.length - 1)];

window.getRandomInt = (min = 0, max = Number.MAX_SAFE_INTEGER) => {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

window.isEscButton = (key) => key === KeyboardKeys.ESC;

window.isEnterButton = (key) => key === KeyboardKeys.ENTER;
