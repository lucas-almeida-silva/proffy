import React from 'react';

import TopBarHeader from '../TopBarHeader';

import './styles.css';

interface PageHeaderProps {
  topBarTitle: string;
  title: string;
  description?: string;
  additionalDescription: {icon: string, text: string}
}

const PageHeader: React.FC<PageHeaderProps> = (props) => {
  return (
    <header className="page-header">
      <TopBarHeader title={props.topBarTitle}/>

      <div className="header-content">
        <div className="header-content-text">
          <div className="main-text">
            <strong>{props.title}</strong>
            {props.description && <p>{props.description}</p>}
          </div>
          <div className="additional-description">
            <img src={props.additionalDescription.icon} alt="Ícone descrição adicional"></img>
            <span>{props.additionalDescription.text}</span>
          </div> 
        </div> 
        {props.children}         
      </div>
    </header>
  );
}

export default PageHeader;