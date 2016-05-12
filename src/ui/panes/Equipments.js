'use strict';

import React from 'react';
import ListItem from '../components/ListItem/v2';
import Icon from '../components/Icon';
import EquipmentContainer from '../composite-components/EquipmentContainer';

export default React.createClass({
  displayName : 'PaneEquipments',

  propTypes: {
    equipment: React.PropTypes.object.isRequired,
    handleEquipmentChange: React.PropTypes.func.isRequired,
  },

  getInitialState() {
    return {
      groupedItems: [],
    }
  },

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.equipment !== this.props.equipment ||
           nextState.groupedItems !== this.state.groupedItems;
  },

  componentWillReceiveProps(nextProps) {
    let groupedItems = nextProps.equipment.get('items').reduce((obj, item) => {
      if (!obj.hasOwnProperty(item.get('containerId'))) {
        obj[item.get('containerId')] = [];
      }

      obj[item.get('containerId')].push(item);
      return obj;
    }, {});

    this.setState({ groupedItems });
  },

  renderEquipments() {
    return this.props.equipment.get('containers').map(container => {
      let itemsInContainer = this.state.groupedItems[container.get('id')] || [];

      return <EquipmentContainer
        key={container.get('id')}
        container={container}
        itemsInContainer={itemsInContainer}
        onContainerChange={this.props.handleEquipmentChange}
      />;
    }).toJS();
  },

  render() {
    return (
      <div className="pane-container">
        <section className='info-section'>
          <div className='info-section-header interactable'>
            <h5 className='info-section-title'>Inventory</h5>
          </div>
          { this.renderEquipments() }
        </section>
      </div>
    );
  }
})
