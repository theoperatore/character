import React from 'react';

export default function Icon({ icon, className, ...others }) {
  return (<span
      {...others}
      className={`icon ${icon} ${className || ''}`}
    ></span>);
}
