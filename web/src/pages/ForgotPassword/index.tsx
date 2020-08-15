import React, { useState } from 'react';

import InputAuthentication from '../../components/InputAuthentication';
import AuthenticationBasePage from '../../components/AuthenticationBasePage';

import './styles.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');

  return (
    <div id="page-forgot-password">
      <AuthenticationBasePage 
        header={{title: 'Eita esqueceu sua senha?', description: 'Não se preocupe, vamos dar um jeito nisso.'}} 
        buttonLabel='Enviar'
        backButton={true}
        onSubmit={() => console.log('submited')}>

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