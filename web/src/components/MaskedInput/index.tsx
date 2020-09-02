import React, { InputHTMLAttributes } from 'react';
import InputMask from 'react-input-mask';

import './styles.css';

export interface MaskedInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  mask: string;
  prefix?: any;
}

const MaskedInput: React.FC<MaskedInputProps> = ({label, name, prefix, mask, ...rest}) => {
  return (
    <div className="input-block">
      <label htmlFor={name}>{label}</label>
      <InputMask type="text" id={name} mask={mask} className={prefix ? "input-with-prefix" : ""} {...rest} />
      {prefix && (
        <div className="input-prefix">
          {prefix}
        </div>
      )}
    </div>
  );
}

export default MaskedInput;