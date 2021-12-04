import axios from 'axios';
import {
  CREATE_ARTICLE, FINISH_FETCHING, START_FETCHING,
} from './actionsType';

const createArticleSuccessfuly = (json) => ({
  type: CREATE_ARTICLE,
  payload: json,
});

const createArticle = (data, errors, history) => {
  const url = '/api/v1/corporate/articles';
  return ((dispatch) => {
    dispatch({ type: START_FETCHING });
    axios
      .post(url, data, { withCredentials: true })
      .then((response) => {
        const { status, data: { message, article } } = response;
        if (status === 200) return errors(message);

        dispatch(createArticleSuccessfuly(article));
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
