import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import landingImg from '../../assets/images/landing.svg';

import studyIcon from '../../assets/images/icons/study.svg';
import giveClassesIcon from '../../assets/images/icons/give-classes.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';

import api from '../../services/api';

import './styles.css';
import Logo from '../../components/Logo';
import PageHeader from '../../components/PageHeader';

function Landing() {
  const [totalConnections, setTotalConnections] = useState(0);

  useEffect(() => {
    api.get('connections').then(response => {
      const { total } = response.data;

      setTotalConnections(total);
    })
  }, []);

  return (
    <div id="page-landing" className="container">
      <div id="page-landing-content">
        <header className="page-landing-header">
          <div className="header-container">
            <Logo />

            <img
              src={landingImg}
              alt="Plataforma de estudos"
              className="hero-image"
            />
          </div>
          
          
        </header>

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

          {/* <p className="total-connections">
            Total de {totalConnections} conexões já realizadas
            <img src={purpleHeartIcon} alt="Coração Roxo" />
          </p> */}

        <div className="total-connections">
          <span>
            Total de {totalConnections} conexões já realizadas 
            <img src={purpleHeartIcon} alt="Coração roxo"></img>
          </span>
        </div>

        </div>

        </footer>
        
      </div>
    </div>
        
  )
}

export default Landing;