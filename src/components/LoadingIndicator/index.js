import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './index.css';

export default function LoadingIndicator({ color }) {
  const css = cn('loading', `loading--${color}`);
  return (
    <div className={css}>
      <div className="loading_dot" />
      <div className="loading_dot" />
      <div className="loading_dot" />
    </div>
  );
}

LoadingIndicator.propTypes = {
  color: PropTypes.oneOf([
    'white',
    'black',
    'dark',
    'grey-10',
    'grey-14',
    'grey-40',
    'grey-55',
    'grey-75',
    'grey-85',
    'grey-90',
    'grey-95',
    'attack-color',
    'spell-color',
    'str-color',
    'dex-color',
    'con-color',
    'wis-color',
    'int-color',
    'cha-color',
    'dark-attack-color',
    'dark-spell-color',
    'dark-str-color',
    'dark-dex-color',
    'dark-con-color',
    'dark-wis-color',
    'dark-int-color',
    'dark-cha-color',
    'light-attack-color',
    'light-spell-color',
    'light-str-color',
    'light-dex-color',
    'light-con-color',
    'light-wis-color',
    'light-int-color',
    'light-cha-color',
  ]),
};

LoadingIndicator.defaultProps = {
  color: 'attack-color',
};
