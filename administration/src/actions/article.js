import axios from 'axios';
import {
  CREATE_ARTICLE, FINISH_FETCHING, RENEW_CSRF_PROTECTION, START_FETCHING,
} from './actionsType';

const createArticleSuccessfuly = (json) => ({
  type: CREATE_ARTICLE,
  payload: json,
});

const renewCSRFProtection = (json) => ({
  type: RENEW_CSRF_PROTECTION,
  payload: json,
});

const createArticle = (data, errors, history) => {
  const url = '/api/admin/articles';
  return ((dispatch) => {
    dispatch({ type: START_FETCHING });
    axios
      .post(url, data, { withCredentials: true })
      .then((response) => {
        const { status, data: { message, article, csrf } } = response;
        if (status === 200) return errors(message);

        dispatch(createArticleSuccessfuly(article));
        dispatch(renewCSRFProtection(csrf));
        return status;
      })
      .then((status) => {
        dispatch({ type: FINISH_FETCHING });
        return status;
      })
      .then((status) => {
        if (status === 201) history.goBack();
      });
  });
};

export default createArticle;
