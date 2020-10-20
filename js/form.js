'use strict';

const submitButtonNode = document.querySelector(`.img-upload__submit`);

submitButtonNode.addEventListener(`click`, (evt) => {
  if (window.preview.form.checkValidity()) {
    evt.preventDefault();

    const formData = new FormData(window.preview.form);

    window.preview.close();
    window.backend.upload(
        formData,
        window.errors.uploadSuccess,
        window.errors.uploadError
    );
  } else {
    window.preview.hashtagsInput.classList.add(`invalid-input`);

    setTimeout(() => {
      window.preview.hashtagsInput.classList.remove(`invalid-input`);
    }, window.errors.TIMEOUT_IN_MS);
  }
});
