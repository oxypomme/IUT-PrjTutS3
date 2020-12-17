import React from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';

import { getConnection } from '../features/accounts/accountSlice';
import { Unauthorized } from '../views/Errors/Unauthorized';

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ component: Component, onlyUnlogged = false, ...rest }): JSX.Element => {
  const isConnected = useSelector(getConnection);
  return (
    <Route {...rest} render={
      props => {
        if ((isConnected && !onlyUnlogged) || (!isConnected && onlyUnlogged)) {
          return <Component {...rest} {...props} />;
        }
        return <Unauthorized />;
      }
    } />
  )
}

export default ProtectedRoute;