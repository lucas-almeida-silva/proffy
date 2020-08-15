import React from 'react';

import { Link } from 'react-router-dom';

import successIcon from '../../assets/images/icons/success-check-icon.svg';

import './styles.css';

interface PageSuccessProps {
  title: string;
  description: string;
  buttonLabel: string;
  buttonRoute: string;
}

const PageSuccess: React.FC<PageSuccessProps> = ({description, title, buttonLabel, buttonRoute}) => {
  return (
    <div className="page-success">
      <div className="page-success-content">
      <img src={successIcon} alt=""></img>

      <div className="success-message">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>

      <Link to={buttonRoute}>
        {buttonLabel}
      </Link>
      </div>
    </div>
  );
  
}

export default PageSuccess;