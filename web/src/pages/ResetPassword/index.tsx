import React, { useState, FormEvent } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import InputAuthentication from '../../components/InputAuthentication';
import AuthenticationBasePage from '../../components/AuthenticationBasePage';

import api from '../../services/api';

import './styles.css';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { token } = useParams();
  const history = useHistory();

  async function handleResetPassword(e: FormEvent) {
    e.preventDefault();

    if(!password || !confirmPassword) {
      toast.warning('Preencha todos os campos');
      return;
    }

    if(password !== confirmPassword) {
      toast.warning('As senhas não conferem');
      return;
    }

    try {
      await api.post('reset-password', {
        token,
        password
      });

      history.push('/resetpassword/success');
    } catch(err) {
      toast.error('Ocorreu um erro ao alterar a senha');
    }
  }

  return (
    <div id="page-reset-password">
      <AuthenticationBasePage 
        header={{title: 'Estamos quase lá!', description: 'Agora é só definir uma nova senha.'}} 
        buttonLabel='Alterar'
        backButton={false}
        onSubmit={handleResetPassword}>

          <div className="fields-container">
            <InputAuthentication 
              type="password" 
              label="Senha" 
              name="senha" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />

            <InputAuthentication 
              type="password" 
              label="Confirmar Senha" 
              name="confirm-password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
            />
          </div>
      </AuthenticationBasePage>    
    </div>
  );
}

export default ResetPassword;