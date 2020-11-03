import React, { useState, useEffect } from 'react';
import { signIn } from '../../utils/authenticationApi';

import { Button, SytedInput, Container } from './../../styles/styles';
const SignIn = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(); // Context Conflict with React-Router,  try to find any alternative -> redux-thunk fail with hooks

  const onSubmitForm = (event) => {
    event.preventDefault();

    signIn(email, password)
      .then((result) => {
        //setUser(result)
        props.history.push('/playlist');
      })
      .catch((error) => console.log(error));
  };
  return (
    <Container>
      <h1>Sign In</h1>
      <br />
      <form onSubmit={(e) => onSubmitForm(e)}>
        <div>
          <label id='email-input'>Email</label>
          <br />
          <SytedInput
            value={email}
            type='email'
            onChange={(e) => setEmail(e.target.value)}
            placeholder='email@email.com'
            id='email-input'
          />
        </div>
        <br />
        <div>
          <label id='password-input'>Password</label>
          <br />
          <SytedInput
            value={password}
            type='password'
            onChange={(e) => setPassword(e.target.value)}
            id='password-input'
          />
        </div>
        <br />
        <Button>Sign in</Button>
      </form>
    </Container>
  );
};
export default SignIn;
