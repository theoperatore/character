'use strict';

import React from 'react';
import ListItem from '../../components/ListItem/v2';
import Popup from '../../components/Popup';
import EquipmentItem from '../../containers/EquipmentItem';
import CreateItem from '../../dialogs/equipment/create';
import Icon from '../../components/Icon';

export default React.createClass({
  displayName: 'EquipmentContainer',

  propTypes: {
    containers: React.PropTypes.array.isRequired,
    container: React.PropTypes.object.isRequired,
    items: React.PropTypes.object.isRequired,
    onContainerChange: React.PropTypes.func.isRequired,
  },

  getInitialState() {
    return {
      viewContents: false,
      createItem: false,
    }
  },

  getItemDetails() {
    let items = this.props.items.map(itm => {
      return (
        <EquipmentItem
          key={itm.get('id')}
          id={itm.get('id')}
          name={itm.get('name')}
          desc={itm.get('desc')}
          containerId={this.props.container.get('id')}
          containers={this.props.containers}
          onChange={this.props.onContainerChange}
        />
      )
    });

    return (
      <section>
        <div className='popup-header text-center interactable' onClick={() => this.setState({ viewContents: false })}>
          <p>{this.props.container.get('name')} <Icon icon='fa fa-chevron-down' /></p>
        </div>
        <div className='popup-content'>
          { items }
          <p 
            className='subtext text-center p2 interactable'
            onClick={() => this.setState({ createItem: true })}
          ><Icon icon='fa fa-plus' /> Create a new item</p>
        </div>
        <div className='popup-footer'>
          <button className='text-green'><Icon icon='fa fa-pencil'/> Edit Container</button>
          <button className='text-red'><Icon icon='fa fa-remove'/> Remove Container</button>
        </div>
        <CreateItem
          active={this.state.createItem}
          containerId={this.props.container.get('id')}
          onDismiss={() => this.setState({ createItem: false })}
          onCreate={this.props.onContainerChange}
        />
      </section>
    );
  },

  render() {
    let { container } = this.props;
    let count = container.get('items').size;

    return (
      <ListItem
        name={container.get('name')}
        subtext={`${count} Items`}
        onClick={() => this.setState({ viewContents: true })}
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