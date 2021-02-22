const isToday = (someDate) => {
  const today = new Date();
  return someDate.getDate() === today.getDate()
    && someDate.getMonth() === today.getMonth()
    && someDate.getFullYear() === today.getFullYear();
};

const isExchangeUpdate = (arr) => arr.some((el) => {
  const date = new Date(el.created_at);
  return isToday(date);
});

export default isExchangeUpdate;
