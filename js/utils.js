'use strict';

{
  const KeyboardKeys = {
    ESC: `Escape`,
    ENTER: `Enter`
  };
  const DEBOUNCE_INTERVAL = 500;

  const getRandomInt = (min = 0, max = Number.MAX_SAFE_INTEGER) => {
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  };

  const getRandomElem = (array) => array[getRandomInt(0, array.length - 1)];

  const isEscButton = (key) => key === KeyboardKeys.ESC;

  const isEnterButton = (key) => key === KeyboardKeys.ENTER;

  const shuffleArr = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  };

  const debounceDecorator = (func) => {
    let lastTimeout = null;

    return function (...args) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(() => {
        func(...args);
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.utils = {
    getRandomElem,
    getRandomInt,
    isEscButton,
    isEnterButton,
    shuffleArr,
    debounceDecorator
  };
}
