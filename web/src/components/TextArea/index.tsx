import React, { TextareaHTMLAttributes } from 'react';

import './styles.css';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label: string;
  observation?: string;
}

const TextArea: React.FC<TextAreaProps> = ({label, name, observation, ...rest}) => {
  return (
    <div className="textarea-block">
      <div className="text-label">
        <label htmlFor={name}>{label}</label>
        {observation && <span>{observation}</span>}
      </div>
      <textarea id={name} {...rest} />
    </div>
  );
}

export default TextArea;