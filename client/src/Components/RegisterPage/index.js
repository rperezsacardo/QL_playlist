import React, { useState } from 'react';
import { signUp } from '../../utils/authenticationApi';

import { Button, SytedInput, Container } from './../../styles/styles';

const RegisterPage = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [premium, setPremium] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [newUser, setNewUser] = useState({});
  const [result, setResult] = useState('');

  const onSubmitForm = (event) => {
    console.log(props.history);
    event.preventDefault();
    signUp({ email, password, admin, username, premium })
      .then((result) => {
        // if (!props.admin) {
        //   setNewUser({ ...result });

        //   props.history.push('/playlist');
        //   setTimeout(() => {}, 4000); //
        //   //return props.update();
        // } else {
        console.log(result);
        setResult('New user created!');
        props.history.push('/admin');
      })
      .catch((error) => {
        setResult(`Fail! check console to see more`);
        console.log(error);
      });
  };
  return (
    <Container>
      <h1>{admin && 'Admin'}</h1>
      <h1>{(props.buttonName && props.buttonName) || 'Sign Up Page'}</h1>
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
        <div>
          <label id='user-input'>UserName</label>
          <br />
          <SytedInput
            value={username}
            type='text'
            onChange={(e) => setUsername(e.target.value)}
            id='user-input'
          />
        </div>
        <div>
          <label>
            Select the plan:
            <br />
            <select value={premium} onChange={() => setPremium(!premium)}>
              <option value={true}> Gold</option>
              <option value={false}>Basic</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Permission:
            <br />
            <select value={admin} onChange={() => setAdmin(!admin)}>
              <option value={true}> Admin</option>
              <option value={false}> User</option>
            </select>
          </label>
        </div>
        <Button>Register</Button>
        <h1>{result && result}</h1>
      </form>
    </Container>
  );
};
export default RegisterPage;
