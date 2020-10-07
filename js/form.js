'use strict';

{
  const submitButtonNode = document.querySelector(`.img-upload__submit`);
  const formNode = document.querySelector(`.img-upload__form`);

  submitButtonNode.addEventListener(`click`, (evt) => {
    if (formNode.checkValidity()) {
      evt.preventDefault();

      const formData = new FormData(formNode);

      window.preview.close();
      window.backend.upload(
          `https://21.javascript.pages.academy/kekstagram`,
          formData,
          window.errors.uploadSuccess,
          window.errors.uploadError
      );
    }
  });
}
