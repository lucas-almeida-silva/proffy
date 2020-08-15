import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import InputAuthentication from '../../components/InputAuthentication';
import CheckBox from '../../components/CheckBox';

import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';

import './style.css';
import AuthenticationBasePage from '../../components/AuthenticationBasePage';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div id="page-login">
      <AuthenticationBasePage 
        header={{title: 'Fazer login'}} 
        buttonLabel='Entrar' 
        backButton={false}
        onSubmit={() => console.log('submited')}>

          <div className="fields-container">
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

          <div className="actions">
            <CheckBox name="remember-me" label="Lembrar-me" />
            <Link to="/forgot-password">
              Esqueci minha senha
            </Link>
          </div>

          <footer>
            <p>
              Não tem uma conta?
              <Link to="/register">Cadastre-se</Link>
            </p>
            <span>
              É de graça
              <img src={purpleHeartIcon} alt="Coração roxo"/>
            </span>
          </footer>
      </AuthenticationBasePage>    
    </div>
  );
}

export default Login;