'use strict';

{
  const previewNodes = {
    input: document.querySelector(`#upload-file`),
    modal: document.querySelector(`.img-upload__overlay`),
    img: document.querySelector(`.img-upload__preview img`),
    closeButton: document.querySelector(`.img-upload__cancel`),
    hashtagsInput: document.querySelector(`.text__hashtags`),
    descriptionTextarea: document.querySelector(`.text__description`)
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

    window.scale.set();

    document.addEventListener(`keydown`, previewEscKeydownHandler);
  };

  const closePreview = () => {
    previewNodes.input.value = ``;
    previewNodes.hashtagsInput.value = ``;
    previewNodes.descriptionTextarea.value = ``;
    document.body.classList.remove(`modal-open`);
    previewNodes.modal.classList.add(`hidden`);

    window.slider.setValue();
    previewNodes.img.removeAttribute(`style`);

    document.removeEventListener(`keydown`, previewEscKeydownHandler);
  };

  previewNodes.input.addEventListener(`change`, () => {
    const imgFile = previewNodes.input.files[0];
    const imgReader = new FileReader();

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
    hashtagsInput: previewNodes.hashtagsInput,
    descriptionTextarea: previewNodes.descriptionTextarea
  };
}
