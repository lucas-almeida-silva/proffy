import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import InputAuthentication from '../../components/InputAuthentication';
import AuthenticationBasePage from '../../components/AuthenticationBasePage';

import api from '../../services/api';

import './styles.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const history = useHistory();

  async function handleSendEmail(e: FormEvent) {
    e.preventDefault();

    try {
      await api.post('forgot-password', {
        email
      });

      history.push('forgot-password/success');
    } catch(err) {
      toast.error('Ocorreu um erro ao enviar o e-mail');
    }
  }

  return (
    <div id="page-forgot-password">
      <AuthenticationBasePage 
        header={{title: 'Eita esqueceu sua senha?', description: 'Não se preocupe, vamos dar um jeito nisso.'}} 
        buttonLabel='Enviar'
        backButton={true}
        onSubmit={handleSendEmail}>

          <div className="fields-container">
            <InputAuthentication 
              type="text" 
              label="E-mail" 
              name="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
      </AuthenticationBasePage>    
    </div>
  );
}

export default ForgotPassword;