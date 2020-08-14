import React from 'react';
import Logo from '../Logo';

import './styles.css';

function LogoBanner() {
  return (
    <div className="logo-banner">
      <div className="logo-banner-content">
        <Logo />
      </div>    
    </div>
  );
}

export default LogoBanner;
