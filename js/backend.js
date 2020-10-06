'use strict';

{
  const loadData = (url, onSuccess, onError) => {
    const xhr = new XMLHttpRequest();

    xhr.responseType = `json`;

    xhr.addEventListener(`load`, () => {
      if (xhr.status === 200) {
        window.picturesArr = xhr.response;
        onSuccess();
      } else {
        onError(`Error code: ${xhr.status}. ${xhr.statusText}.`);
      }
    });

    xhr.addEventListener(`error`, () => {
      onError(`Connection error...`);
    });

    xhr.addEventListener(`timeout`, () => {
      onError(`Timeout error...`);
    });

    xhr.timeout = 10000;

    xhr.open(`GET`, url);
    xhr.send();
  };

  window.backend = {
    load: loadData
  };
}
