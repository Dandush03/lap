import axios from 'axios';
import {
  FINISH_FETCHING, GET_TAXES, START_FETCHING,
} from './actionsType';

const getTaxesSuccessfull = (json) => ({
  type: GET_TAXES,
  payload: json,
});

const getTaxes = () => {
  const url = '/api/admin/taxes';
  return ((dispatch) => {
    dispatch({ type: START_FETCHING });
    axios
      .get(url)
      .then((response) => {
        if (response.status === 200) dispatch(getTaxesSuccessfull(response.data));
      })
      .then(() => dispatch({ type: FINISH_FETCHING }));
  });
};

export default getTaxes;
