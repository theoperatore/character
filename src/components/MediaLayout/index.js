import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import './index.css';

export default function MediaLayout({ media, description, className, ...props }) {
  return (
    <div className={cn('media_layout--container', className)}>
      <div className="media_layout--media">{media}</div>
      <div className="media_layout--desc">{description}</div>
    </div>
  );
}

MediaLayout.propTypes = {
  media: PropTypes.node,
  description: PropTypes.node,
};
