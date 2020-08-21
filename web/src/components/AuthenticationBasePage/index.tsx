import React, { FormEvent } from 'react';
import LogoBanner from '../LogoBanner';

import backIcon from '../../assets/images/icons/back-purple.svg';

import './styles.css';
import { Link } from 'react-router-dom';

interface AuthenticationProps {
  header: {title: string, description?: string},
  buttonLabel: string;
  backButton: boolean;
  onSubmit(e: FormEvent): any;
}

const AuthenticationBasePage: React.FC<AuthenticationProps> = (props) => {
  return (
    <div id="auth-base-page" className="container">
      <LogoBanner />
      
      <div className="auth-base-page-container">
        {props.backButton && (
          <Link to="/login" className="back-arrow">
            <img src={backIcon} alt="Voltar" />
          </Link>
        )}
        <div className="auth-base-page-content">
          <header className="header-container">
            <h1>{props.header.title}</h1>
            {props.header.description && <p>{props.header.description}</p>}
          </header>

          <main>
            <form id="form" onSubmit={props.onSubmit}>         
              {props.children}

              <button type="submit" className="button-submit">{props.buttonLabel}</button>

            </form>
          </main> 
        </div>
      </div>
    </div>
  );
}

export default AuthenticationBasePage;