'use strict';

const HASHTAGS_MAX_COUNT = 5;
const DESCRIPTION_MAX_LENGTH = 140;
const validHashtagTemplate = /^#[A-Za-z0-9]{1,19}$/;

function validateHashtags(hastagsArr) {
  if (hastagsArr.length <= HASHTAGS_MAX_COUNT) {
    const errorsArr = [];

    hastagsArr.forEach((hashtag) => {
      if (!validHashtagTemplate.test(hashtag) && hashtag !== ``) {
        errorsArr.push(hashtag);
      }
    });

    if (errorsArr.length > 0) {
      const resultString = errorsArr.join(`, `);
      return `Допущена ошибка в написании хештега. Проверьте: "${resultString}"`;
    }
  } else {
    return `Превышено максимальное кол-во хэштегов: ${HASHTAGS_MAX_COUNT}. Вы ввели: ${hastagsArr.length} хештегов.`;
  }
  return ``;
}

window.preview.hashtagsInput.addEventListener(`input`, () => {
  const hashtagsArr = window.preview.hashtagsInput.value.split(` `);
  const hashtagsErrorMessage = validateHashtags(hashtagsArr);

  window.preview.hashtagsInput.setCustomValidity(hashtagsErrorMessage);
});

window.preview.descriptionTextarea.addEventListener(`input`, () => {
  const descriptionLength = window.preview.descriptionTextarea.value.length;
  const descriptionErrorMessage = descriptionLength > DESCRIPTION_MAX_LENGTH ? `Первышено максимальное кол-во символов: ${DESCRIPTION_MAX_LENGTH}. Вы ввели ${descriptionLength} символов.` : ``;

  window.preview.descriptionTextarea.setCustomValidity(descriptionErrorMessage);
});
