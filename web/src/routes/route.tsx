import React from 'react';
import { useAuth } from '../contexts/auth';
import { Route, Redirect, RouteProps } from 'react-router-dom';

interface CustomRouteProps extends RouteProps {
  isPrivate?: boolean;
}

const CustomRoute: React.FC<CustomRouteProps> = ({ isPrivate, ...rest }) => {
  const { signed } = useAuth();

  if (!signed && isPrivate) {
    return <Redirect to="/login" />
  }

  return <Route {...rest} />
}

export default CustomRoute;
