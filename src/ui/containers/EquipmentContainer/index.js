'use strict';

import React from 'react';
import ListItem from '../../components/ListItem/v2';
import Popup from '../../components/Popup';
import EquipmentItem from '../../containers/EquipmentItem';
import CreateItem from '../../dialogs/equipment/createItem';
import EditEquipmentContainer from './EditEquipmentContainer';
import ConfirmModal from '../../dialogs/ConfirmModal';
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
      editContainer: false,
      confirmDelete: false,
    }
  },

  handleDeleteConfirm(answer) {
    switch (answer) {
      case 'no':
        return this.setState({ confirmDelete: false });
      case 'yes':
        this.props.onContainerChange({
          type: 'EQUIPMENT_CONTAINER_DELETE',
          data: {
            id: this.props.container.get('id'),
          }
        });
        this.setState({ confirmDelete: false, viewContents: false });
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
        {
          !this.props.container.get('default')
            ? <div className='popup-footer'>
                <button
                  className='text-green'
                  onClick={() => this.setState({ editContainer: true })}
                ><Icon icon='fa fa-pencil'/> Edit Container</button>
                <button
                  className='text-red'
                  onClick={() => this.setState({ confirmDelete: true })}
                ><Icon icon='fa fa-remove'/> Remove Container</button>
              </div>
            : null
        }
        <EditEquipmentContainer
          active={this.state.editContainer}
          id={this.props.container.get('id')}
          name={this.props.container.get('name')}
          onDismiss={() => this.setState({ editContainer: false })}
          onChange={this.props.onContainerChange}
        />
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
    let count = container.get('items')
      ? container.get('items').size
      : 0;

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
        <ConfirmModal
          active={this.state.confirmDelete}
          message={<div>
            <p>{`Delete container: ${container.get('name')} ?`}</p>
            <p className='subtext'>Note: all items in this container will be moved to your Backpack</p>
          </div>}
          onConfirm={this.handleDeleteConfirm}
        />
      </ListItem>
    );
  }
})