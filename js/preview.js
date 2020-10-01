'use strict';

const previewNodes = {
  input: document.querySelector(`#upload-file`),
  modal: document.querySelector(`.img-upload__overlay`),
  img: document.querySelector(`.img-upload__preview img`),
  closeButton: document.querySelector(`.img-upload__cancel`),
  hashtagsInput: document.querySelector(`.text__hashtags`),
  descriptionTextarea: document.querySelector(`.text__description`)
};

function previewEscKeydownHandler(evt) {
  if (window.isEscButton(evt.key) && document.activeElement !== previewNodes.hashtagsInput && document.activeElement !== previewNodes.descriptionTextarea) {
    closePreview();
  }
}

function openPreview() {
  document.body.classList.add(`modal-open`);
  previewNodes.modal.classList.remove(`hidden`);
  window.slider.node.classList.add(`hidden`);

  window.setScaleValue();

  document.addEventListener(`keydown`, previewEscKeydownHandler);
}

function closePreview() {
  previewNodes.input.value = ``;
  document.body.classList.remove(`modal-open`);
  previewNodes.modal.classList.add(`hidden`);

  window.slider.setValue();
  previewNodes.img.removeAttribute(`style`);

  document.removeEventListener(`keydown`, previewEscKeydownHandler);
}

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
  img: previewNodes.img,
  hashtagsInput: previewNodes.hashtagsInput,
  descriptionTextarea: previewNodes.descriptionTextarea
};
