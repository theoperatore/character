import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './index.css';

export default function Input({ className, type, ...props }) {
  return <input className={cn('input', className)} type={type} {...props} />;
}

Input.propTypes = {
  type: PropTypes.oneOf(['email', 'text', 'phone', 'number']).isRequired,
};

Input.defaultProps = {
  type: 'text',
};
