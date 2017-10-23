import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './index.css';

export default function Type({
  element,
  variant,
  className,
  children,
  ...props
}) {
  const Disp = element;
  const css = cn('type', `type__${variant}`, className);
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
};

Type.defaultProps = {
  element: 'span',
  variant: 'default',
}
