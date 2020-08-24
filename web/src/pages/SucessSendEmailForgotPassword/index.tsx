import React from 'react';
import PageSuccess from '../../components/PageSuccess';

function SuccessSendEmailForgotPassword() {
  return (
    <PageSuccess 
      title="Redefinição enviada"
      description='Boa, agora é só checar o email que foi enviado para você redefinir sua senha e aproveitar os estudos.'
      buttonLabel="Voltar ao login"
      buttonRoute="/login"
    />
  );
}

export default SuccessSendEmailForgotPassword;