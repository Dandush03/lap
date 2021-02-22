import axios from 'axios';
import {
  FINISH_FETCHING, CREATE_EXCHANGE, START_FETCHING, RENEW_CSRF_PROTECTION,
} from './actionsType';

const renewCSRFProtection = (json) => ({
  type: RENEW_CSRF_PROTECTION,
  payload: json,
});

const createExchangeSuccessfull = (json) => ({
  type: CREATE_EXCHANGE,
  payload: json,
});

const createExchange = (data, errors, close) => {
  const url = '/api/admin/exchanges';
  return ((dispatch) => {
    dispatch({ type: START_FETCHING });
    axios
      .post(url, data, { withCredentials: true })
      .then((response) => {
        const { status, data: { message, exchange, csrf } } = response;
        if (status === 200) {
          dispatch(renewCSRFProtection(csrf));
          return errors(message);
        }
        errors(null);
        close();
        dispatch(createExchangeSuccessfull(exchange));
        return dispatch(renewCSRFProtection(csrf));
      })
      .then(() => dispatch({ type: FINISH_FETCHING }));
  });
};

export default createExchange;
