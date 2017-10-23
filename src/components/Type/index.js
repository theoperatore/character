import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './index.css';

export default function Type({
  element,
  variant,
  color,
  className,
  children,
  ...props
}) {
  const Disp = element;
  const css = cn('type', `type__${variant}`, `type__${color}`, className);
  return (<Disp
    className={css}
    {...props}
  >{children}</Disp>);
}

Type.propTypes = {
  element: PropTypes.oneOf([
    'span',
    'p',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
  ]),
  variant: PropTypes.oneOf([
    'default',
    'body',
    'subtext',
    'heading-1',
    'heading-2',
    'display-1',
    'display-2',
  ]),
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

Type.defaultProps = {
  element: 'span',
  variant: 'default',
  color: 'black',
}
