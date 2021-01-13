import axios from 'axios';
import { GET_I18N } from './actionsType';

const getI18nSuccessfull = (json) => ({
  type: GET_I18N,
  payload: json,
});

const getI18n = () => {
  const url = '/api/admin/i18n';
  return ((dispatch) => {
    axios
      .get(url)
      .then((response) => dispatch(getI18nSuccessfull(response.data)));
  });
};
export default getI18n;
