import React from 'react';

import './styles.css';

import { InputProps } from '../Input';

const CheckBox: React.FC<InputProps> = ({label, name, ...rest}) => {
  return (
    <label className="checkbox-block">
      <input id={name} type="checkbox" {...rest} />
      <span>{label}</span>
  </label>
  );
}

export default CheckBox;