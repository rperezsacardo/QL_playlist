import React, { useState, useEffect } from 'react';
import { Route, Switch, Pro } from 'react-router-dom';

import Cookies from 'js-cookie';

import SignIn from '../Components/SignIn';
import Playlist from '../Components/Playlist';
import AddSong from '../Components/AddSong';
import Navbar from '../Components/NavBar';
import ProtectedRouter from './../Components/ProtectedRouter';

import SignUp from './SignUp';
import Admin from './Admin';

import { loadUserInfo } from './../utils/authenticationApi';

const App = () => {
  const [user, setUser] = useState(false);
  const [userUpdated, setUserUpdate] = useState(false);
  //Alternative to provide User obj for all app // Debug
  const userInfo = () => {
    loadUserInfo()
      .then((result) => {
        setUser(result.user);
      })
      .catch((error) => console.log(error));
  };
  const handleUserUpdated = () => {
    setUserUpdate(!userUpdated);
  };
  useEffect(() => {
    userInfo();
  }, [userUpdated]);
  return (
    <div>
      <Navbar handleUpdate={handleUserUpdated} user={user} />
      <Switch>
        <ProtectedRouter
          admin={user.admin}
          redirect={'/sign-up'}
          path='/admin'
          exact
          render={(props) => <Admin {...props} />}
          handleUpdate={handleUserUpdated}
        />
        <Route path='/sign-in' exact component={SignIn} />
        <Route path='/sign-up' exact component={SignUp} />
        <Route path='/playlist' exact component={Playlist} />
        <Route path='/add-song' exact component={AddSong} />
      </Switch>
    </div>
  );
};

export default App;
