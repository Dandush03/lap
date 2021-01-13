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

const insertAt = (str, sub, pos) => `${str.slice(0, pos)}${sub}${str.slice(pos)}`;

const currencyHandler = (e) => {
  const { keyCode, key, target } = e;
  const { value: { length } } = target;
  if (keyCode === 8) {
    if (length === 4) {
      const str = `0${target.value.replace('.', '')}`;
      const tempValue = insertAt(str, '.', 1);
      target.value = tempValue;
      return 0;
    }

    const tempValue = insertAt(target.value.replace('.', ''), '.', length - 4);
    target.value = tempValue;
    return true;
  }

  if (keyCode === 13) {
    return true;
  }

  if (Number.isNaN(parseInt(key, 10))) {
    return e.preventDefault();
  }

  if (length === 0) {
    target.value = '0.0';
    return true;
  }

  if (length === 4) {
    if (target.value.slice(2, 3) === '0' && target.value.slice(0, 1) === '0') {
      target.value = `0.${target.value.slice(-1)}`;
      return true;
    }

    if (target.value.slice(0, 1) === '0') {
      target.value = `${target.value.slice(2, 3)}.${target.value.slice(-1)}`;
      return true;
    }
  }

  const tempValue = insertAt(target.value.replace('.', ''), '.', length - 2);
  target.value = tempValue;
  return true;
};

export {
  changeInputToUppercase, insertSpaceAndValidateNumber, currencyHandler,
  dragEnterHandler, dragLeaveHandler, dragEndHandler, changeImageHandler,
};
