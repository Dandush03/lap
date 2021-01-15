import { GET_ACCOUNTING_ACOUNTS } from '../actions/actionsType';

export default (state = '', action) => {
  switch (action.type) {
    case GET_ACCOUNTING_ACOUNTS:
      return { ...action.payload };
    default:
      return state;
  }
};
