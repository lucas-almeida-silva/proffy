import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import LogoBanner from '../../components/LogoBanner';
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
              <Link to="/registration">Cadastre-se</Link>
            </p>
            <span>
              É de graça
            <img src={purpleHeartIcon} alt="Coração roxo"/>
            </span>
          </footer>
          

    </AuthenticationBasePage>
    
    </div>

    

    
  )

  /*
  return (
    <div id="page-login" className="container">
      <LogoBanner />
      <div className="page-login-content">

        <header className="header-container">
          <strong>Fazer login</strong>
        </header>

        <main>
          <form id="login-form">         
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

            <button type="submit">Entrar</button>

          </form>

          <footer>
            <p>
              Não tem uma conta?
              <Link to="/registration">Cadastre-se</Link>
            </p>
            <span>
              É de graça
            <img src={purpleHeartIcon} alt="Coração roxo"/>
            </span>
          </footer>

        </main> 
      </div>
    </div>    
  );
  */
}

export default Login;