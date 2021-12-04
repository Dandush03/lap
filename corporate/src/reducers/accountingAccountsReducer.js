import {
  CREATE_BUY_ACCOUNTING_ACCOUNTS, CREATE_INV_ACCOUNTING_ACCOUNTS,
  CREATE_SELL_ACCOUNTING_ACCOUNTS, GET_ACCOUNTING_ACOUNTS, GET_STORE_DATA,
} from 'actions/actionsType';

export default (state = '', action) => {
  switch (action.type) {
    case GET_STORE_DATA:
      return action.payload.accounts;
    case GET_ACCOUNTING_ACOUNTS:
      return { ...action.payload };
    case CREATE_SELL_ACCOUNTING_ACCOUNTS: {
      const { payload } = action;
      const newState = { ...state, sell: [...state.sell, payload] };
      return newState;
    }
    case CREATE_BUY_ACCOUNTING_ACCOUNTS: {
      const { payload } = action;
      const newState = { ...state, buy: [...state.buy, payload] };
      return newState;
    }
    case CREATE_INV_ACCOUNTING_ACCOUNTS: {
      const { payload } = action;
      const newState = { ...state, inv: [...state.inv, payload] };
      return newState;
    }
    default:
      return state;
  }
};
