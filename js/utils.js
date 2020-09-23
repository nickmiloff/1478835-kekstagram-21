'use strict';

window.getRandomInt = function (min = 0, max = Number.MAX_SAFE_INTEGER) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

window.getRandomElem = function (array) {
  return array[window.getRandomInt(0, array.length - 1)];
};
