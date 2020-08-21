import React from 'react';
import { useAuth } from '../contexts/auth';
import { Route, Redirect, RouteProps } from 'react-router-dom';

interface CustomRouteProps extends RouteProps {
  isPrivate?: boolean;
}

const CustomRoute: React.FC<CustomRouteProps> = ({ isPrivate, path, ...rest }) => {
  const { signed } = useAuth();
  
  if (!signed && isPrivate) {
    return <Redirect to="/login" />
  }

  return <Route path={path} {...rest} />
}

export default CustomRoute;

// interface routesProps extends RouteProps{
//   isPrivate?:boolean
//   component:React.ComponentType
// }

// const RouteWrapper:React.FC<routesProps> =({isPrivate=false,component:Component,...rest})=>{

//   const {signed} = useAuth();

//   return (
//       <Route {...rest} render={() =>{
//           return isPrivate === signed ?(
//               <Component />
//           ):(
//               <Redirect to={{pathname: isPrivate ? '/' : '/home'}} />
//           )
//       }                     
//       } />
//   )
// }

// export default RouteWrapper