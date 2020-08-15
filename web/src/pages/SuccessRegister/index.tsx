import React from 'react';
import PageSuccess from '../../components/PageSuccess';

function SuccessRegister() {
  return (
    <PageSuccess 
      title="Cadastro concluído"
      description={
        `Agora você faz parte da plataforma do Proffy.
        Tenha uma ótima experiência.`}
      buttonLabel="Fazer login"
      buttonRoute="/login"
    />
  );
}

export default SuccessRegister;