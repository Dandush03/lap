import Cookies from 'js-cookie';
import { GET_LOCALE } from './actionsType';

const getLocaleSuccessfull = (locale) => ({
  type: GET_LOCALE,
  payload: locale,
});

const getLocale = () => {
  const locale = Cookies.get('locale');
  return ((dispatch) => {
    dispatch(getLocaleSuccessfull(locale || 'es'));
  });
};
export default getLocale;
