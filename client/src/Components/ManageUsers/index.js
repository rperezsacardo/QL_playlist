import React, { useState, useEffect } from 'react';

import FormUpdate from './../FormUpdate';
import { listAllUsers, deleteUserApi, updateUser } from './../../utils/adminApi';
import { Button, Container, ListItem, LineContainer } from './../../styles/styles';

const ManageUsers = (props) => {
  const [userList, setUserList] = useState([]);
  const [updateUsers, setUpdateUsers] = useState(false);

  const renderUsers = () => {
    listAllUsers()
      .then((result) => setUserList(result))
      .catch((error) => console.log(error));
  };
  const deleteUser = ({ email }) => {
    deleteUserApi(email).then((result) =>
      listAllUsers()
        .then((result) => setUserList(result))
        .catch((error) => console.log(error))
    );
  };
  useEffect(() => {
    renderUsers();
  }, []);

  return (
    <Container>
      <h3>All Users</h3>
      <ul>
        {userList &&
          userList.map((user) => {
            return (
              <ListItem key={user.id}>
                {user.username}
                <LineContainer>
                  <Button
                    onClick={() => {
                      deleteUser(user);
                    }}>
                    Delete this user
                  </Button>
                </LineContainer>
                <FormUpdate {...user} edit={false} />
              </ListItem>
            );
          })}
      </ul>
    </Container>
  );
};

export default ManageUsers;
