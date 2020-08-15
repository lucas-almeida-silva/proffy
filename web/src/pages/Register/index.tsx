import React, { useState } from 'react';

import InputAuthentication from '../../components/InputAuthentication';
import AuthenticationBasePage from '../../components/AuthenticationBasePage';

import './styles.css';

function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div id="page-register">
      <AuthenticationBasePage 
        header={{title: 'Cadastro', description: 'Preencha os dados abaixo para começar.'}} 
        buttonLabel='Concluir cadastro'
        backButton={true}
        onSubmit={() => console.log('submited')}>

          <div className="fields-container">
            <InputAuthentication 
              type="text" 
              label="Nome" 
              name="firstName" 
              value={firstName} 
              onChange={(e) => setFirstName(e.target.value)} 
            />
            <InputAuthentication 
              type="text" 
              label="Sobrenome" 
              name="lastName" 
              value={lastName} 
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