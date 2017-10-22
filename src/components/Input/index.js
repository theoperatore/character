import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './index.css';

export default function Input({ className, type, label, id, ...props }) {
  return <label htmlFor={id} className="input_label">
    {label && <span>{label}</span>}
    <input
      id={id}
      className={cn('input', className)}
      type={type}
      {...props}
    />
  </label>;
}

Input.propTypes = {
  type: PropTypes.oneOf(['email', 'text', 'phone', 'number']).isRequired,
  label: PropTypes.string,
};

Input.defaultProps = {
  type: 'text',
};
