import axios from 'axios';
import {
  FINISH_FETCHING, GET_ARTICLES_GROUPS, CREATE_ARTICLES_GROUP,
  START_FETCHING, RENEW_CSRF_PROTECTION,
} from './actionsType';

const renewCSRFProtection = (json) => ({
  type: RENEW_CSRF_PROTECTION,
  payload: json,
});

const getArticleGroupsSuccessfull = (json) => ({
  type: GET_ARTICLES_GROUPS,
  payload: json,
});

const createArticleGroupsSuccessfull = (json) => ({
  type: CREATE_ARTICLES_GROUP,
  payload: json,
});

const getArticleGroups = () => {
  const url = '/api/admin/articles_groups';
  return ((dispatch) => {
    dispatch({ type: START_FETCHING });
    axios
      .get(url)
      .then((response) => {
        if (response.status === 200) dispatch(getArticleGroupsSuccessfull(response.data));
      })
      .then(() => dispatch({ type: FINISH_FETCHING }));
  });
};

const createArticleGroup = (data, errors, close) => {
  const url = '/api/admin/articles_groups';
  return ((dispatch) => {
    dispatch({ type: START_FETCHING });
    axios
      .post(url, data, { withCredentials: true })
      .then((response) => {
        const { status, data: { message, group, csrf } } = response;
        if (status === 200) {
          dispatch(renewCSRFProtection(csrf));
          return errors(message);
        }
        errors(null);
        close();
        dispatch(createArticleGroupsSuccessfull(group));
        return dispatch(renewCSRFProtection(csrf));
      })
      .then(() => dispatch({ type: FINISH_FETCHING }));
  });
};

export { getArticleGroups, createArticleGroup };
