import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { useAuth } from '../contexts/auth';

import Loader from '../components/Loader';

import Landing from '../pages/Landing';
import Login from '../pages/Login';
import Register from '../pages/Register';
import SuccessRegister from '../pages/SuccessRegister';
import ForgotPassword from '../pages/ForgotPassword';
import SuccessSendEmailForgotPassword from '../pages/SucessSendEmailForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import SuccessResetPassword from '../pages/SuccessResetPassword';
import TeacherList from '../pages/TeacherList';
import TeacherForm from '../pages/TeacherForm';
import Profile from '../pages/Profile';

import Route from './route';

function Routes() {
  const { loading } = useAuth();
  
  if(loading) {
    return (
      <Loader />
    );
  }

  return (
    <BrowserRouter>
      <Route path='/' component={Landing} exact isPrivate /> 
      <Route path='/login' component={Login} /> 
      <Route path='/register' component={Register} exact/> 
      <Route path='/register/success' component={SuccessRegister} />
      <Route path='/forgot-password' component={ForgotPassword} exact/>
      <Route path='/forgot-password/success' component={SuccessSendEmailForgotPassword} />
      <Route path='/reset-password/:token' component={ResetPassword} exact />
      <Route path='/resetpassword/success' component={SuccessResetPassword} exact />
      <Route path='/study' component={TeacherList} isPrivate/>
      <Route path='/give-classes' component={TeacherForm} isPrivate />
      <Route path='/profile' component={Profile} isPrivate />
    </BrowserRouter>
  );
}

export default Routes;