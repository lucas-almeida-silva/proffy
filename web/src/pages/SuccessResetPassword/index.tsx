import React from 'react';
import PageSuccess from '../../components/PageSuccess';

function SuccessResetPassword() {
  return (
    <PageSuccess 
      title="Senha alterada"
      description={
        `Agora é só realizar o login e continuar utilizando a plataforma.`}
      buttonLabel="Fazer login"
      buttonRoute="/login"
    />
  );
}

export default SuccessResetPassword;