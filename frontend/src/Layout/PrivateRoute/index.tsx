import React, { ReactNode } from 'react';
import isUserLogged from 'utils/isUserLogged';
import { Navigate } from 'react-router-dom';
interface PropsPrivateRoute {
  children: ReactNode;
}
const PrivateRoute: React.FC<PropsPrivateRoute> = ({ children }) => {
  const isLogged = isUserLogged();

  if (!isLogged) return <Navigate to="/" replace />;
  return <>{children}</>;
};

export default PrivateRoute;
