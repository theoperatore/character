'use strict';

import React from 'react';
import ListItem from '../../components/ListItem/v2';

export default React.createClass({
  displayName: 'EquipmentContainer',

  propTypes: {
    container: React.PropTypes.object.isRequired,
    itemsInContainer: React.PropTypes.array.isRequired,
    onContainerChange: React.PropTypes.func.isRequired,
  },

  render() {
    let { container, itemsInContainer } = this.props;
    
    let count = itemsInContainer
      ? itemsInContainer.length
      : 0;

    return <ListItem
      name={container.get('name')}
      subtext={`${count} Items`}
    />
  }
})