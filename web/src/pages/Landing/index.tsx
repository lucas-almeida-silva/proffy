import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Logo from '../../components/Logo';

import { useAuth } from '../../contexts/auth';

import landingImg from '../../assets/images/landing.svg';
import studyIcon from '../../assets/images/icons/study.svg';
import giveClassesIcon from '../../assets/images/icons/give-classes.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';
import signOutIcon from '../../assets/images/icons/logout.svg';
import avatarDefaultImg from '../../assets/images/avatar-default.png';

import api from '../../services/api';

import './styles.css';

function Landing() {
  const { user, signOut } = useAuth();
  const [totalConnections, setTotalConnections] = useState(0);

  useEffect(() => {
    api.get('connections').then(response => {
      const { total } = response.data;

      setTotalConnections(total);
    })
  }, []);

  function handleSignOut() {
    signOut();
  }

  return (
    <div id="page-landing" className="container">
      <div className="page-landing-top">
        <div className="page-landing-top-content">
        <header>
          <Link to="/profile" className="user-info">
            <img src={user?.avatar || avatarDefaultImg} alt="Avatar usuário" />
            <span>{`${user?.first_name} ${user?.last_name}`}</span>
          </Link>
              
          <button onClick={handleSignOut}>
            <img src={signOutIcon} alt="Logout" />
          </button>
                    
        </header>

        <div className="logo-content">
          <Logo />
            <img
              src={landingImg}
              alt="Plataforma de estudos"
              className="hero-image"
            />
          </div>
        </div>
      </div>
        

      <footer className="page-landing-footer">
          <div className="footer-container">
            <p className="welcome-message">
              Seja bem vindo!
              <strong>O que deseja fazer?</strong>
            </p>

            <div className="buttons-container">
              <Link to="/study" className="study">
                <img src={studyIcon} alt="Estudar"></img>
                Estudar
              </Link>

              <Link to="/give-classes" className="give-classes">
                <img src={giveClassesIcon} alt="Estudar"></img>
                Dar aulas
              </Link>
            </div>

            <div className="total-connections">
              <span>
                Total de {totalConnections} conexões já realizadas 
                <img src={purpleHeartIcon} alt="Coração roxo"></img>
              </span>
            </div>

          </div>
        </footer>
      </div>
  );
}

export default Landing;