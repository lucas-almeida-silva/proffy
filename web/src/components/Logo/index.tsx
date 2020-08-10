import React from 'react';

import logoImg from '../../assets/images/logo.svg';

import './styles.css';

function Logo() {
  return (
    <div className="logo-container">
        <img src={logoImg} alt="Proffy" />
        <h2>Sua plataforma de estudos online.</h2>
    </div>
  );
}

export default Logo;