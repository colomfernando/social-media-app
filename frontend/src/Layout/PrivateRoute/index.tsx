import React from 'react';
import isUserLogged from 'utils/isUserLogged';
import { Navigate } from 'react-router-dom';

const PrivateRoute: React.FC = ({ children }) => {
  const isLogged = isUserLogged();

  if (!isLogged) return <Navigate to="/" replace />;
  return <>{children}</>;
};

export default PrivateRoute;
