import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Type from 'components/Type';

import './index.css';

export default function Avatar({ circle, src, altText, size, icon }) {
  const containerCss = cn(
    'avatar',
    `avatar__${size}`,
    circle && `avatar__circle`
  );
  const imgCss = cn('avatar_img', `avatar_img__${size}`);

  return (
    <div className={containerCss}>
      {!icon && <Type>{altText}</Type>}
      {icon}
      {src && <img src={src} className={imgCss} alt={altText} />}
    </div>
  );
}

Avatar.propTypes = {
  /** display with rounded edges */
  circle: PropTypes.bool,
  /** the image src to load */
  src: PropTypes.string,
  /** text to appear in place of the image while it's loading */
  altText: PropTypes.string,
  /** when you want to render a placeholder icon instead of text*/
  icon: PropTypes.node,
  size: PropTypes.oneOf([48, 64]),
};

Avatar.defaultProps = {
  circle: false,
  size: 48,
};
