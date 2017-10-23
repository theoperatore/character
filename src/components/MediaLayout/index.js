import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import './index.css';

export default function MediaLayout({ media, description, align, className, ...props }) {
  const css = cn(
    'media_layout--container',
    `media_layout--${align}`,
    className
  );
  return (
    <div className={css}>
      <div className="media_layout--media">{media}</div>
      <div className="media_layout--desc">{description}</div>
    </div>
  );
}

MediaLayout.propTypes = {
  align: PropTypes.oneOf(['top', 'middle', 'bottom']),
  media: PropTypes.node,
  description: PropTypes.node,
};

MediaLayout.defaultProps = {
  align: 'middle',
};
