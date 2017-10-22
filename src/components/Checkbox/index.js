import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './index.css';

export default function Checkbox({ label, id, ...props }) {
  return (
    <label className={cn('checkbox', label && 'checkbox--hasLabel')} htmlFor={id}>
      <input
        id={id}
        aria-checked="false"
        tabIndex="0"
        type="checkbox" {...props}
      />
      <span className="checkbox_indicator" />
      {label && <span className="checkbox_label">{label}</span>}
    </label>
  );
}

Checkbox.propTypes = {
  label: PropTypes.string,
};
