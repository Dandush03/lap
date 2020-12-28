import $ from 'jquery';

const changeInputToUppercase = (e) => {
  const { currentTarget: input } = e;
  input.value = input.value.toUpperCase();
};

const insertSpaceAndValidateNumber = (e) => {
  const { keyCode, key, target: { value } } = e;
  const { length } = value;
  if (keyCode === 13) return true;

  if (keyCode === 8) {
    if (length === 3 || length === 9 || length === 15) e.target.value = value.slice(0, -1);
    return true;
  }

  if (Number.isNaN(parseInt(key, 10))) {
    return e.preventDefault();
  }

  if (length === 1 || length === 7 || length === 13) e.target.value += '−';

  return true;
};

const dragEnterHandler = () => {
  const file = $('#file_uploader')[0];
  const label = $('#file_label')[0];
  if (file) {
    file.parentNode.classList.add('drop-zone');
    label.classList.add('drop-zone-label');
  }
};

const dragLeaveHandler = (e) => {
  const file = $('#file_uploader')[0];
  const label = $('#file_label')[0];
  if (e.target === file) {
    file.parentNode.classList.remove('drop-zone');
    label.classList.remove('drop-zone-label');
  }
};

const dragEndHandler = () => {
  const file = $('#file_uploader')[0];
  const label = $('#file_label')[0];
  if (file) {
    file.parentNode.classList.remove('drop-zone');
    label.classList.remove('drop-zone-label');
  }
};

const changeImageHandler = () => {
  const file = $('#file_uploader')[0];
  const img = $('#file_img')[0];

  img.src = URL.createObjectURL(file.files[0]);
  img.style = 'opacity: 1';
  const label = $('#file_label')[0];
  label.lastChild.style = 'opacity: 0';
};

export {
  changeInputToUppercase, insertSpaceAndValidateNumber,
  dragEnterHandler, dragLeaveHandler, dragEndHandler, changeImageHandler,
};
