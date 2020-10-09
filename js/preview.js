'use strict';

{
  const previewNodes = {
    input: document.querySelector(`#upload-file`),
    modal: document.querySelector(`.img-upload__overlay`),
    img: document.querySelector(`.img-upload__preview img`),
    closeButton: document.querySelector(`.img-upload__cancel`),
    hashtagsInput: document.querySelector(`.text__hashtags`),
    descriptionTextarea: document.querySelector(`.text__description`),
    form: document.querySelector(`.img-upload__form`)
  };

  const previewEscKeydownHandler = (evt) => {
    if (window.utils.isEscButton(evt.key) &&
    document.activeElement !== previewNodes.hashtagsInput &&
    document.activeElement !== previewNodes.descriptionTextarea) {
      closePreview();
    }
  };

  const openPreview = () => {
    document.body.classList.add(`modal-open`);
    previewNodes.modal.classList.remove(`hidden`);
    window.slider.node.classList.add(`hidden`);

    document.addEventListener(`keydown`, previewEscKeydownHandler);
  };

  const closePreview = () => {
    previewNodes.form.reset();
    document.body.classList.remove(`modal-open`);
    previewNodes.modal.classList.add(`hidden`);

    window.slider.setValue();
    previewNodes.img.removeAttribute(`style`);

    document.removeEventListener(`keydown`, previewEscKeydownHandler);
  };

  previewNodes.input.addEventListener(`change`, () => {
    const imgFile = previewNodes.input.files[0];
    const imgReader = new FileReader();

    window.scale.set();

    imgReader.onloadend = () => {
      previewNodes.img.src = imgReader.result;
      openPreview();
    };

    if (imgFile) {
      imgReader.readAsDataURL(imgFile);
    }
  });

  previewNodes.closeButton.addEventListener(`click`, closePreview);

  window.preview = {
    close: closePreview,
    img: previewNodes.img,
    form: previewNodes.form,
    hashtagsInput: previewNodes.hashtagsInput,
    descriptionTextarea: previewNodes.descriptionTextarea
  };
}
