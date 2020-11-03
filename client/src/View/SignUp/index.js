import React from 'react';
import RegisterPage from './../../Components/RegisterPage';
const SignUp = (props) => {
  return (
    <div>
      <RegisterPage {...props} page={'Sign up'} />
    </div>
  );
};

export default SignUp;
