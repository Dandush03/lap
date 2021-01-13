import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import App from '../components/App';

const Home = () => {
  const user = useSelector((state) => state.user);

  if (!user.login) return <Redirect to="/auth/sign_in" />;
  return (
    <>
      <App />
    </>
  );
};

export default Home;
