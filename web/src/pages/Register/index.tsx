import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '../../services/api';

import InputAuthentication from '../../components/InputAuthentication';
import AuthenticationBasePage from '../../components/AuthenticationBasePage';

import './styles.css';

function Register() {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  function handleRegister(e: FormEvent) {
    e.preventDefault();
    
    api.post('users/register', {
      first_name,
      last_name,
      email,
      password
    }).then(() => {
      history.push('register/success');
    }).catch(() => {
      toast.error('Ocorreu um erro ao realizar o cadastro');
    })
  }

  return (
    <div id="page-register">
      <AuthenticationBasePage 
        header={{title: 'Cadastro', description: 'Preencha os dados abaixo para começar.'}} 
        buttonLabel='Concluir cadastro'
        backButton={true}
        onSubmit={handleRegister}>

          <div className="fields-container">
            <InputAuthentication 
              type="text" 
              label="Nome" 
              name="firstName" 
              value={first_name} 
              onChange={(e) => setFirstName(e.target.value)} 
            />
            <InputAuthentication 
              type="text" 
              label="Sobrenome" 
              name="lastName" 
              value={last_name} 
              onChange={(e) => setLastName(e.target.value)} 
            />
            <InputAuthentication 
              type="text" 
              label="E-mail" 
              name="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
            <InputAuthentication 
              type="password" 
              label="Senha" 
              name="senha" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>
      </AuthenticationBasePage>    
    </div>
  );
}

export default Register;