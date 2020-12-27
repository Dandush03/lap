const changeInputToUppercase = (e) => {
  const { currentTarget: input } = e;
  input.value = input.value.toUpperCase();
};

export default changeInputToUppercase;
