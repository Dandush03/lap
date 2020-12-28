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

export { changeInputToUppercase, insertSpaceAndValidateNumber };
