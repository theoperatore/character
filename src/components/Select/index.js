import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './index.css';

export default function Select({ id, label, className, children, ...props }) {
  return (
    <label htmlFor={id} className={cn('select', className)}>
      {label && <span className="select_label">{label}</span>}
      <select id={id} {...props}>
        {children}
      </select>
      <span className={cn("select_indicator", label && "select_indicator--hasLabel")} />
    </label>
  );
}

Select.propTypes = {
  label: PropTypes.string,
};
