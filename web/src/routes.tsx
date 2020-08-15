import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import SuccessRegister from './pages/SuccessRegister';
import ForgotPassword from './pages/ForgotPassword';
import SuccessSendEmailForgotPassword from './pages/SucessSendEmailForgotPassword';
import TeacherList from './pages/TeacherList';
import TeacherForm from './pages/TeacherForm';

function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" component={Landing} exact/>  
      <Route path="/login" component={Login} /> 
      <Route path="/register" component={Register} exact/> 
      <Route path="/register/success" component={SuccessRegister} />
      <Route path="/forgot-password" component={ForgotPassword} exact/>
      <Route path="/forgot-password/success" component={SuccessSendEmailForgotPassword} />
      <Route path="/study" component={TeacherList} />
      <Route path="/give-classes" component={TeacherForm}/>
    </BrowserRouter>
  )
}

export default Routes;