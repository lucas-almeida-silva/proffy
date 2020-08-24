import React from 'react';
import { useAuth } from '../contexts/auth';
import { Route, Redirect, RouteProps } from 'react-router-dom';

interface CustomRouteProps extends RouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const CustomRoute: React.FC<CustomRouteProps> = ({ isPrivate = false, component: Component, ...rest }) => {
  const { signed } = useAuth();

  return (
    <Route {...rest}
      render={( { location }) => {
        return isPrivate === signed ? (
          <Component />
        ) : (
          <Redirect to={{
              pathname: isPrivate ? '/login' : '/',
              state: { from: location },
            }} 
          />
        )
      }} 
    />
  )
}

export default CustomRoute;
