import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { loadUserInfo, signOut } from './../../utils/authenticationApi';
import { ListItem } from './../../styles/styles';

import { UList, FullNavBar, LogoImage, LefNavBar, RightNavBar } from './../../styles/navBarStyles';

const NavBar = (props) => {
  const [user, setUser] = useState(false);
 

  const userInfo = () => {
    loadUserInfo()
      .then((result) => {
        const user = result.user;
        setUser(user);
      })
      .catch((error) => console.log(error));
  };

  const updateUser = () => {
    setUser(props.user);
  };

  useEffect(() => {
    userInfo();
    updateUser();
  }, []);

  const signOutUser = () => {
    props.handleUpdate();
    signOut()
      .then((result) => setUser(result))
      .catch((error) => console.log(error));
  };
  const renderNavBarSignIn = (
    <UList>
      <ListItem>
        <Link to='/sign-in'>Sign in</Link>
      </ListItem>
      <ListItem>
        <Link to='/sign-up'>Sign up</Link>
      </ListItem>
    </UList>
  );
  const renderNavBarUser = (
    <UList>
      <ListItem>{user.admin && <Link to='/admin'>Admin</Link>}</ListItem>
      <ListItem>
        <Link onClick={signOutUser} to={'/'}>
          logout
        </Link>
      </ListItem>
    </UList>
  );

  return (
    <FullNavBar>
      <LefNavBar>
        {' '}
        <UList>
          <ListItem>
            <Link to='/playlist'>
              <LogoImage
                src={
                  'https://res.cloudinary.com/dzf57hnmi/image/upload/v1604373735/QL_playlist/logo_karkoz.png'
                }
                alt='logo'
              />
            </Link>
          </ListItem>
          <ListItem>
            <h4>{user && `Welcome ${user.username}!!`}</h4>
          </ListItem>
        </UList>
      </LefNavBar>
      <RightNavBar className='RightNavBarbar'>
        <ListItem>
          <Link to='/playlist'>My Playlist</Link>
        </ListItem>
        {(!user && renderNavBarSignIn) || (user && renderNavBarUser)}{' '}
      </RightNavBar>
    </FullNavBar>
  );
};

export default NavBar;
