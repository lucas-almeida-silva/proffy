import React, { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';

import AuthenticationBasePage from '../../components/AuthenticationBasePage';
import InputAuthentication from '../../components/InputAuthentication';
import CheckBox from '../../components/CheckBox';

import { useAuth } from '../../contexts/auth';

import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';

import './style.css';

function Login() {
  const { signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [keepConnected, setKeepConnected] = useState(false);

  async function handleLogin(e: FormEvent) {
    e.preventDefault();

    signIn(email, password);
  }

  return (
    <div id="page-login">
      <AuthenticationBasePage 
        header={{title: 'Fazer login'}} 
        buttonLabel='Entrar' 
        backButton={false}
        onSubmit={handleLogin}>

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
            <CheckBox 
              name="remember-me" 
              label="Lembrar-me"
              // {...(keepConnected && {checked: true})} 
              // onClick={() => setKeepConnected(!keepConnected)}
            />
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