import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './index.css';

const hippoIcons = [
  'graph',
  'crown',
  'shield',
  'talk-chat',
  'talk-chat-group',
  'beer',
  'repo',
  'dollar',
  'group',
  'link',
  'link-broken',
  'chart',
  'attack',
  'equipment',
  'features',
  'anchor',
  'branching',
  'angle-double-right',
  'cog',
];

export default function Icon({ name, size, className, ...props }) {
  const iconName = hippoIcons.includes(name)
    ? `icon-${name}`
    : `fa fa-${name}`;

  const iconSize = `icon__${size}`;

  return (
    <span className={cn(iconName, iconSize, className)} {...props} />
  );
}

Icon.propTypes = {
  name: PropTypes.string,
  size: PropTypes.oneOf([16, 32, 48, 64]),
};

Icon.defaultProps = {
  size: 16,
};
