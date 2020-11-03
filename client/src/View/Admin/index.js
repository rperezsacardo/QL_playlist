import React, { useState } from 'react';
import RegisterPage from './../../Components/RegisterPage';
import AddSong from './../../Components/AddSong';
import ManageUsers from './../../Components/ManageUsers';
import UpdateUser from './../../Components/UpdateUser';
import {
  Button,
  SytedInput,
  Container,
  UContainer,
  ListItem,
  LineContainer
} from './../../styles/styles';
const Admin = (props) => {
  const [showRegisterPage, setShowRegisterPage] = useState(false);
  const [showAddSong, setAddSong] = useState(false);
  const [showUsers, setShowUsers] = useState(false);

  const closeAddSong = () => {
    setAddSong(!showAddSong);
  };
  const closeAddUser = () => {
    setShowRegisterPage(!showRegisterPage);
  };

  return (
    <Container>
      <h1>Dashboard</h1>
      <br />
      <LineContainer>
        <Button onClick={() => setShowRegisterPage(!showRegisterPage)}>
          {(!showRegisterPage && 'Add new user') || 'Cancel User'}
        </Button>

        <Button onClick={() => setAddSong(!showAddSong)}>
          {(!showAddSong && 'Add new Song') || 'Cancel Song'}
        </Button>
      </LineContainer>

      {showRegisterPage && <RegisterPage update={closeAddUser} admin {...props} />}
      {showAddSong && <AddSong update={closeAddSong} {...props} />}
      <ManageUsers />
    </Container>
  );
};

export default Admin;
