'use strict';

const HASHTAGS_MAX_COUNT = 5;

function getNonUniqElements(array) {
  const unUniqElementsSet = new Set();

  array.forEach((element, index) => {
    if (array.indexOf(element, index + 1) > 0) {
      unUniqElementsSet.add(element);
    }
  });

  return Array.from(unUniqElementsSet).join(`, `);
}

function HashtagsErrorObj(arr) {
  const hashtagsArr = arr;

  return {
    general: [
      {
        messageTemplate: `Превышено максимальное кол-во хеш-тегов: 5.`,
        testError() {
          if (hashtagsArr.length > HASHTAGS_MAX_COUNT) {
            return `${this.messageTemplate} Вы ввели: ${hashtagsArr.length} хэш-тегов.`;
          }
          return null;
        },
      },
      {
        messageTemplate: `Один и тот же хэш-тег не может быть использован дважды.`,
        testError() {
          const hashtagsSet = new Set(hashtagsArr);

          if (hashtagsArr.length !== hashtagsSet.size) {
            return `${this.messageTemplate} Проверьте: "${getNonUniqElements(hashtagsArr)}."`;
          }
          return null;
        },
      }
    ],
    local: [
      {
        messageTemplate: `Хэш-тег должен начинаться с символа "#".`,
        elements: [],
        testError(hashtag) {
          if (hashtag[0] !== `#`) {
            this.elements.push(hashtag);
          }
        },
      },
      {
        messageTemplate: `Хэш-тег должен состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.`,
        elements: [],
        testError(hashtag) {
          if (!/^[#a-zа-я0-9][a-zа-я0-9]{0,}$/.test(hashtag)) {
            this.elements.push(hashtag);
          }
        }
      },
      {
        messageTemplate: `Хеш-тег не может состоять только из одной решётки.`,
        elements: [],
        testError(hashtag) {
          if (hashtag[0] === `#` && hashtag.length === 1) {
            this.elements.push(hashtag);
          }
        }
      },
      {
        messageTemplate: `Максимальная длина одного хэш-тега 20 символов.`,
        elements: [],
        testError(hashtag) {
          if (hashtag.length > 20) {
            this.elements.push(hashtag);
          }
        }
      }
    ],
    getErrorMessage() {
      const errorsArr = [];

      if (hashtagsArr[0] === `` && hashtagsArr.length === 1) {
        return ``;
      }

      for (const error of this.general) {
        const errorMessage = error.testError(hashtagsArr);

        if (errorMessage) {
          return errorMessage;
        }
      }

      hashtagsArr.forEach((hashtag) => {
        for (const error of this.local) {
          error.testError(hashtag);
        }
      });

      for (const error of this.local) {
        if (error.elements.length > 0) {
          errorsArr.push(`${error.messageTemplate} Ошибка в этих хэш-тегах: "${error.elements.join(`, `)}".`);
        }
      }

      if (errorsArr.length > 0) {
        return errorsArr.join(` `);
      }
      return ``;
    }
  };
}

window.preview.hashtagsInput.addEventListener(`input`, () => {
  const hashtagsArr = window.preview.hashtagsInput.value.trim().toLowerCase().split(` `);
  const hashtagsErrorObj = new HashtagsErrorObj(hashtagsArr);

  window.preview.hashtagsInput.setCustomValidity(hashtagsErrorObj.getErrorMessage());
});
