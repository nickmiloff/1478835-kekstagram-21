'use strict';

const Url = {
  LOAD: `https://21.javascript.pages.academy/kekstagram/data`,
  UPLOAD: `https://21.javascript.pages.academy/kekstagram`
};
const TIMEOUT_IN_MS = 100000;
const errorCodesObj = {
  400: `Неверный запрос (400).`,
  401: `Не авторизованный пользователь (401).`,
  402: `Необходима оплата (402).`,
  403: `Запрещено (не уполномочен) (403).`,
  404: `Не найдено (404).`,
  405: `Метод не поддерживается (405).`,
  406: `Неприемлемо (406).`,
  407: `Необходима аутентификация прокси (407).`,
  408: `Истекло время ожидания (408).`,
  409: `Конфликт (409).`,
  410: `Удалён (410).`,
  411: `Необходима длина (411).`,
  412: `Условие ложно (412).`,
  413: `Полезная нагрузка слишком велика (413).`,
  414: `URI слишком длинный (414).`,
  415: `Ееподдерживаемый тип данных (415).`,
  416: `Диапазон не достижим (416).`,
  417: `Ожидание не удалось (417).`,
  418: `Я — чайник (418).`,
  419: `Ошибка проверки CSRF (419).`,
  421: `Неправильный запрос (421).`,
  422: `Необрабатываемый экземпляр (422).`,
  423: `Заблокировано (423).`,
  424: `Невыполненная зависимость (424).`,
  425: `Слишком рано (425).`,
  426: `Необходимо обновление (426).`,
  428: `Необходимо предусловие (428).`,
  429: `Слишком много запросов (429).`,
  431: `Поля заголовка запроса слишком большие (431).`,
  449: `Повторить с (449).`,
  451: `Недоступно по юридическим причинам (451).`,
  499: `Клиент закрыл соединение (499).`
};

const createXhr = (onSuccess, onError) => {
  const xhr = new XMLHttpRequest();

  xhr.responseType = `json`;

  xhr.addEventListener(`load`, () => {
    const statusFirstNum = xhr.status.toString()[0];
    let errorMessage;

    switch (statusFirstNum) {
      case `2`:
        window.picturesArr = xhr.response;
        onSuccess();
        break;

      case `4`:
        errorMessage = errorCodesObj[xhr.status];
        break;

      default:
        errorMessage = `${xhr.statusText} (${xhr.status}).`;
        break;
    }

    if (errorMessage) {
      onError(errorMessage);
    }
  });

  xhr.addEventListener(`error`, () => {
    onError(`Ошибка соединения (001).`);
  });

  xhr.addEventListener(`timeout`, () => {
    onError(`Превышено время ожидания ответа от сервера (002).`);
  });

  xhr.timeout = TIMEOUT_IN_MS;

  return xhr;
};

const loadData = (onSuccess, onError) => {
  const loadXhr = createXhr(onSuccess, onError);

  loadXhr.open(`GET`, Url.LOAD);
  loadXhr.send();
};

const uploadData = (data, onSuccess, onError) => {
  const uploadXhr = createXhr(onSuccess, onError);

  uploadXhr.open(`POST`, Url.UPLOAD);
  uploadXhr.send(data);
};

window.backend = {
  load: loadData,
  upload: uploadData
};
