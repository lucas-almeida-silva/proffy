import React, { InputHTMLAttributes } from 'react';

import './styles.css';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  prefix?: any;
}

const Input: React.FC<InputProps> = ({label, name, prefix, ...rest}) => {
  return (
    <div className="input-block">
      <label htmlFor={name}>{label}</label>
      <input type="text" id={name} className={prefix ? "input-with-prefix" : ""} {...rest} />
      {prefix && (
        <div className="input-prefix">
          {prefix}
        </div>
      )}
    </div>
  );
}

export default Input;