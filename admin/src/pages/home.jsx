import React, { useEffect } from 'react';
import PropTypes, { oneOfType } from 'prop-types';
import { useSelector } from 'react-redux';
import App from '../components/App';

const Home = ({ history }) => {
  const user = useSelector((state) => state.user);

  useEffect(async () => {
    if (!user.login) history.push('/auth/sign_in');
  }, []);

  if (!user.login) return null;

  return (
    <>
      <App />
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
};

export default Home;
