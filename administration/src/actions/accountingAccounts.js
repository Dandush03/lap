import axios from 'axios';
import {
  CREATE_BUY_ACCOUNTING_ACCOUNTS,
  CREATE_INV_ACCOUNTING_ACCOUNTS,
  CREATE_SELL_ACCOUNTING_ACCOUNTS,
  FINISH_FETCHING, GET_ACCOUNTING_ACOUNTS,
  RENEW_CSRF_PROTECTION, START_FETCHING,
} from './actionsType';

const renewCSRFProtection = (json) => ({
  type: RENEW_CSRF_PROTECTION,
  payload: json,
});

const getAccountsSuccessfull = (json) => ({
  type: GET_ACCOUNTING_ACOUNTS,
  payload: json,
});

const createAccountingGroupSuccessfull = (json) => {
  const types = {
    in: CREATE_SELL_ACCOUNTING_ACCOUNTS,
    out: CREATE_BUY_ACCOUNTING_ACCOUNTS,
    inv: CREATE_INV_ACCOUNTING_ACCOUNTS,
  };
  return ({
    type: types[json.category],
    payload: json,
  });
};

const getAccounts = () => {
  const url = '/api/admin/accounting_accounts';
  return ((dispatch) => {
    dispatch({ type: START_FETCHING });
    axios
      .get(url)
      .then((response) => {
        if (response.status === 200) dispatch(getAccountsSuccessfull(response.data));
      })
      .then(() => dispatch({ type: FINISH_FETCHING }));
  });
};

const createAccount = (data, errors, close) => {
  const url = '/api/admin/accounting_accounts';
  return ((dispatch) => {
    dispatch({ type: START_FETCHING });
    axios
      .post(url, data, { withCredentials: true })
      .then((response) => {
        const { status, data: { message, account, csrf } } = response;
        if (status === 200) {
          dispatch(renewCSRFProtection(csrf));
          return errors(message);
        }
        errors(null);
        close();
        dispatch(createAccountingGroupSuccessfull(account));
        return dispatch(renewCSRFProtection(csrf));
      })
      .then(() => dispatch({ type: FINISH_FETCHING }));
  });
};

export { createAccount, getAccounts };
