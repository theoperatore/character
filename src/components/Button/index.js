import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './index.css';

export default function Button({ className, children, color, size, variant, ...props }) {
  const css = cn(
    'button',
    `button__${variant}`,
    `button__${color}`,
    `button__${size}`,
    className
  );

  return (
    <button
      className={css}
      {...props}
    >{children}</button>
  );
}

Button.propTypes = {
  variant: PropTypes.oneOf([
    'default',
    'pill',
    'bare',
  ]),
  color: PropTypes.oneOf([
    'str',
    'dex',
    'con',
    'wis',
    'int',
    'cha',
    'attack',
    'spell',
    'proficient',
    'green',
    'red',
  ]),
  size: PropTypes.oneOf([
    'sm',
    'md',
    'lg',
  ]),
};

Button.defaultProps = {
  variant: 'default',
  color: 'green',
  size: 'md',
};
