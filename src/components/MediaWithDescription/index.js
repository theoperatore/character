import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import './index.css';

export default function MediaWithDescription({ media, description, className, ...props }) {
  return (
    <div className={cn('media_desc--container', className)}>
      <div className="media_desc--media">{media}</div>
      <div className="media_desc--desc">{description}</div>
    </div>
  );
}

MediaWithDescription.propTypes = {
  media: PropTypes.node,
  description: PropTypes.node,
};
