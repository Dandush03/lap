import * as R from 'ramda';

const isToday = (date) => {
  const today = new Date();
  const tempDate = new Date(date);
  return tempDate.getUTCDate() === today.getUTCDate()
    && tempDate.getUTCMonth() === today.getUTCMonth()
    && tempDate.getUTCFullYear() === today.getUTCFullYear();
};

const isExchangeUpdate = R.cond([
  [R.isEmpty, R.always(false)],
  [R.T, R.all(R.pipe(R.prop('created_at'), isToday))],
]);

export default isExchangeUpdate;
