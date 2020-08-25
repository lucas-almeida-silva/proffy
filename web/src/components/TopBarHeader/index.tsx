import React from 'react';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/images/logo.svg';
import backIcon from '../../assets/images/icons/back.svg';

import './styles.css';

interface TopBarHeaderProps {
  title: string;
}

const TopBarHeader: React.FC<TopBarHeaderProps> = ({title}) => {
  return (
    <div className="top-bar-container">
      <div className="top-bar-content">
        <Link to="/">
          <img src={backIcon} alt="Voltar" />
        </Link>
        <span>{title}</span>
        <img src={logoImg} alt="Proffy" />
      </div>
    </div>    
  );
}

export default TopBarHeader;