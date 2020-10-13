'use strict';

{
  const DEBOUNCE_INTERVAL = 500;

  window.debounce = (func) => {
    let isCooldown = false;

    return function (...args) {
      if (isCooldown) {
        return;
      }
      func(...args);
      isCooldown = true;
      setTimeout(() => {
        isCooldown = false;
      }, DEBOUNCE_INTERVAL);
    };
  };
}
