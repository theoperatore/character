'use strict';

import React from 'react';
import ListItem from '../../components/ListItem/v2';
import Popup from '../../components/Popup';

export default React.createClass({
  displayName: 'EquipmentContainer',

  propTypes: {
    container: React.PropTypes.object.isRequired,
    itemsInContainer: React.PropTypes.array.isRequired,
    onContainerChange: React.PropTypes.func.isRequired,
  },

  getInitialState() {
    return {
      viewContents: false,
    }
  },

  getItemDetails() {
    let items = this.props.itemsInContainer.map(itm => {
      return (
        <ListItem
          key={itm.get('id')}
          name={itm.get('name')}
        />
      )
    });

    return (
      <section>
        <div className='popup-header equipment-list' onClick={() => this.setState({ viewContents: false })}>
          <p>{this.props.container.get('name')}</p>
        </div>
        <div className='popup-content'>
          { items }
        </div>
      </section>
    );
  },

  render() {
    let { container, itemsInContainer } = this.props;
    
    let count = itemsInContainer
      ? itemsInContainer.length
      : 0;

    return (
      <ListItem
        name={container.get('name')}
        subtext={`${count} Items`}
        onClick={() => this.props.itemsInContainer.length > 0 ? this.setState({ viewContents: true }) : null}
      >
        <Popup
          id={`view-${container.get('id')}-items`}
          active={this.state.viewContents}
          content={this.getItemDetails()}
        />
      </ListItem>
    );
  }
})