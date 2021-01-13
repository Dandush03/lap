import React, { useEffect } from 'react';
import PropTypes, { oneOfType } from 'prop-types';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import Menu from '../containers/Menu';
import getI18n from '../actions/i18n';

const Home = ({ history, match }) => {
  const user = useSelector((state) => state.user);
  const i18n = useSelector((state) => state.i18n);
  const dispatch = useDispatch();

  useEffect(() => {
    Cookies.set('locale', match.params.locale);
    if (!i18n) dispatch(getI18n());
  }, []);

  useEffect(() => {
    if (!user.login) history.push('/auth/sign_in');
  }, []);

  if (!user.login) return null;

  return (
    <>
      <Menu menu={i18n.side_menu} locale={match.params.locale} />
    </>
  );
};

Home.propTypes = {
  history: PropTypes.objectOf(oneOfType([
    PropTypes.object,
    PropTypes.number,
    PropTypes.func,
    PropTypes.string,
  ])).isRequired,
  match: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
};

export default Home;
