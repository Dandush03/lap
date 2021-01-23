// import $ from 'jquery';

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
  const file = document.getElementById('file_uploader');
  const label = document.getElementById('file_label');
  // const file = $('#file_uploader')[0];
  // const label = $('#file_label')[0];
  if (file) {
    file.parentNode.classList.add('drop-zone');
    label.classList.add('drop-zone-label');
  }
};

const dragLeaveHandler = (e) => {
  const file = document.getElementById('file_uploader');
  const label = document.getElementById('file_label');
  // const file = $('#file_uploader')[0];
  // const label = $('#file_label')[0];
  if (e.target === file) {
    file.parentNode.classList.remove('drop-zone');
    label.classList.remove('drop-zone-label');
  }
};

const dragEndHandler = () => {
  const file = document.getElementById('file_uploader');
  const label = document.getElementById('file_label');
  // const file = $('#file_uploader')[0];
  // const label = $('#file_label')[0];
  if (file) {
    file.parentNode.classList.remove('drop-zone');
    label.classList.remove('drop-zone-label');
  }
};

const changeImageHandler = () => {
  const file = document.getElementById('file_uploader');
  const img = document.getElementById('file_img');
  const label = document.getElementById('file_label');
  // const file = $('#file_uploader')[0];
  // const img = $('#file_img')[0];
  // const label = $('#file_label')[0];
  img.src = URL.createObjectURL(file.files[0]);
  img.style = 'opacity: 1';
  label.lastChild.style = 'opacity: 0';
};

// const insertAt = (str, sub, pos) => `${str.slice(0, pos)}${sub}${str.slice(pos)}`;

const onlyNumber = (e) => {
  const { keyCode, key } = e;
  if (keyCode === 8 || keyCode === 13 || keyCode === 110 || keyCode === 190) {
    return true;
  }

  if (Number.isNaN(parseInt(key, 10))) {
    return e.preventDefault();
  }

  return true;
};

const currencyHandler = (e) => {
  const { target } = e;

  if (target.value.match(/\.+/g)) {
    target.value = target.value
      .replace(/,/g, '')
      .replace(/(\B(?=(\d{3})+(?!\d)\.))/g, ',')
      .substring(0, target.value.lastIndexOf('.') + 3);
  } else {
    target.value = target.value.replace(/,/g, '').replace(/(\B(?=(\d{3})+(?!\d)))/g, ',');
  }

  return true;
};

export {
  changeInputToUppercase, insertSpaceAndValidateNumber, currencyHandler, onlyNumber,
  dragEnterHandler, dragLeaveHandler, dragEndHandler, changeImageHandler,
};
