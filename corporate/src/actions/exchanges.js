import axios from 'axios';
import {
  FINISH_FETCHING, CREATE_EXCHANGE, START_FETCHING, TOAST_MESSAGE, GET_EXCHANGE,
} from './actionsType';

const createExchangeSuccessfully = (json) => ({
  type: CREATE_EXCHANGE,
  payload: json,
});

const getExchangeRatesSuccessfully = (json) => ({
  type: GET_EXCHANGE,
  payload: json,
});

export const getExchangeRates = (rowsPerPage, page) => {
  const url = '/api/v1/corporate/exchanges';
  return ((dispatch) => {
    dispatch({ type: START_FETCHING });
    axios
      .get(url, { params: { rowsPerPage, page }, withCredentials: true })
      .then((response) => {
        const { data: { exchanges_list: exchangeList } } = response;
        dispatch(getExchangeRatesSuccessfully(exchangeList));
        return page;
      })
      .catch(() => {
        const toast = {
          type: 'error',
        };
        dispatch({ type: TOAST_MESSAGE, payload: { ...toast } });
      });
    dispatch({ type: FINISH_FETCHING });
  });
};

export const createExchange = (data, errors, close) => {
  const url = '/api/v1/corporate/exchanges';
  return ((dispatch) => {
    dispatch({ type: START_FETCHING });
    axios
      .post(url, data, { withCredentials: true })
      .then((response) => {
        const { status, data: { toast, exchange } } = response;
        if (status === 200) {
          dispatch({ type: TOAST_MESSAGE, payload: { ...toast } });
          return errors(toast.message);
        }
        errors(null);
        close();
        dispatch({ type: TOAST_MESSAGE, payload: { ...toast } });
        return dispatch(createExchangeSuccessfully(exchange));
      })
      .then(() => dispatch({ type: FINISH_FETCHING }));
  });
};
