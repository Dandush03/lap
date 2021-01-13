import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSignedUser } from '../../actions/user';
import SignInForm from '../../components/SignInForm';

const SignIn = () => {
  const user = useSelector((state) => state.user);
  console.log('====================================');
  console.log(user);
  console.log('====================================');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSignedUser());
  }, []);

  return (
    <>
      <SignInForm />
    </>
  );
};

export default SignIn;
