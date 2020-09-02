import React from 'react';

import warningIcon from '../../assets/images/icons/warning.svg';

import './styles.css';

interface FormFooterProps {
  buttonSubmitLabel: string;
}

const FormFooter: React.FC<FormFooterProps> = ({buttonSubmitLabel}) => {
  return (
    <footer className="form-footer">
        <p>
          <img src={warningIcon} alt="Aviso importante" />
          Importante ! <br />
          Preencha todos os dados
        </p>

        <button type="submit">
          {buttonSubmitLabel}
        </button>
    </footer>
  );
}

export default FormFooter;