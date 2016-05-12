'use strict';

import React from 'react';
import ListItem from '../../components/ListItem/v2';

export default React.createClass({
  displayName: 'EquipmentContainer',

  render() {
    return <ListItem
      name={this.props.name}
    />
  }
})