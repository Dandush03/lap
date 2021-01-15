import axios from 'axios';
import { FINISH_FETCHING, GET_ACCOUNTING_ACOUNTS, START_FETCHING } from './actionsType';

const getAccountsSuccessfull = (json) => ({
  type: GET_ACCOUNTING_ACOUNTS,
  payload: json,
});

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

export default getAccounts;
