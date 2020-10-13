'use strict';

{
  const KeyboardKeys = {
    ESC: `Escape`,
    ENTER: `Enter`
  };

  const getRandomInt = (min = 0, max = Number.MAX_SAFE_INTEGER) => {
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  };

  const getRandomElem = (array) => array[getRandomInt(0, array.length - 1)];

  const isEscButton = (key) => key === KeyboardKeys.ESC;

  const isEnterButton = (key) => key === KeyboardKeys.ENTER;

  const shuffleArr = (array) => array.sort(() => Math.random() - 0.5);

  window.utils = {
    getRandomElem,
    getRandomInt,
    isEscButton,
    isEnterButton,
    shuffleArr
  };
}
