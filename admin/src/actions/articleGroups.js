import axios from 'axios';
import { FINISH_FETCHING, GET_ARTICLES_GROUPS, START_FETCHING } from './actionsType';

const getArticleGroupsSuccessfull = (json) => ({
  type: GET_ARTICLES_GROUPS,
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

export default getArticleGroups;
