import React, { useState } from 'react';
import Admin from '../ManageUsers';
import { signUp } from '../../utils/authenticationApi';
import { updateUserApi } from './../../utils/adminApi';
import { Button, SytedInput, Container } from './../../styles/styles';

const FormUpdate = (props) => {
  const [email, setEmail] = useState(props.email);
  const [password, setPassword] = useState(props.password);
  const [username, setUsername] = useState(props.username);
  const [premium, setPremium] = useState(props.premium);
  const [admin, setAdmin] = useState(props.adminPrivileges);
  const [playlist, setPlaylist] = useState(props.playlist);
  const [result, setResult] = useState('');
  const [updateUser, setUpdateUser] = useState(false);

  const onSubmitForm = (event) => {
    event.preventDefault();
    if (!password) {
      const passwordHash = props.passwordHash;
      updateUserApi({ email, password, admin, username, premium, passwordHash, playlist })
        .then((result) => {
          setResult('Updated');
        })
        .catch((error) => {
          setResult(`Fail! check console to see more`);
          console.log(error);
        });
    } else {
      updateUserApi({ email, password, admin, username, premium })
        .then((result) => {
          setResult('Updated');
        })
        .catch((error) => {
          setResult(`Fail! check console to see more`);
          console.log(error);
        });
    }
  };
  return (
    <Container>
      <Button onClick={() => setUpdateUser(!updateUser)}>Edit User</Button>
      {updateUser && (
        <div>
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
                  <option value={false}> Silver</option>
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
            <Button>Update</Button>
            <h1>{result && result}</h1>
          </form>
        </div>
      )}{' '}
    </Container>
  );
};
export default FormUpdate;
