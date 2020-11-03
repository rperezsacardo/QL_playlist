import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ admin, redirect, ...props }) => {
  if (admin) {
    return <Route {...props} />;
  } else {
    return <Redirect to={redirect} />;
  }
};

export default ProtectedRoute;
