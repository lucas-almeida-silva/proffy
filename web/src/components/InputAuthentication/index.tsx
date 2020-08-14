import React, { useState, useEffect, Children } from 'react';

import { InputProps } from '../Input/index';

import showPassword from '../../assets/images/icons/show-password.svg';
import hiddenPassword from '../../assets/images/icons/hidden-password.svg';


import './styles.css';

interface InputPropsAuthentication extends InputProps {
  type: string;
  value: string;
}

const InputAuthentication: React.FC<InputPropsAuthentication> = ({ name, label, type, value, ...rest }) => {
  const [inputFocused, setInputFocused] = useState(false);
  const [inputHasValue, setInputHasValue] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);

  useEffect(() => {
    setInputHasValue(Boolean(value.length));
  }, [value])

  function handleToggleVisiblePassword() {
    setVisiblePassword(!visiblePassword);
  }

  return (
    <div className="input-container">
      <label className={inputFocused || inputHasValue ? "float-label" : ""} htmlFor={name}>{label}</label>
      <input 
        id={name}
        type={type === 'password' && visiblePassword ? 'text' : type} 
        {...rest}
        onFocus={()=> setInputFocused(true)} 
        onBlur={() => setInputFocused(false)} 
      />    
        
      {type === 'password' && (
        <button className="password-input" type="button" onClick={handleToggleVisiblePassword}>
          <img src={visiblePassword ? showPassword : hiddenPassword} alt="Ver senha" />
        </button> 
      )}    
    </div>
  )

}

export default InputAuthentication;