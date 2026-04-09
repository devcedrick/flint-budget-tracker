import React, { InputHTMLAttributes, useId, forwardRef } from 'react';
import './Input.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  wrapperClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  fullWidth = false,
  wrapperClassName = '',
  className = '',
  id,
  ...props
}, ref) => {
  const generatedId = useId();
  const inputId = id || generatedId;

  return (
    <div className={`input-wrapper ${fullWidth ? 'input-wrapper-full' : ''} ${wrapperClassName}`.trim()}>
      {label && <label htmlFor={inputId} className="input-label">{label}</label>}
      <input ref={ref} id={inputId} className={`input-field ${error ? 'input-error' : ''} ${className}`.trim()} {...props} />
      {error && <span className="input-error-text">{error}</span>}
    </div>
  );
});

Input.displayName = 'Input';