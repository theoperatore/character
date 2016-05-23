'use strict';

import React from 'react';
import ListItem from '../components/ListItem/v2';
import Icon from '../components/Icon';
import EquipmentContainer from '../containers/EquipmentContainer';

export default React.createClass({
  displayName : 'PaneEquipments',

  propTypes: {
    equipment: React.PropTypes.object.isRequired,
    handleEquipmentChange: React.PropTypes.func.isRequired,
  },

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.equipment !== this.props.equipment;
  },

  renderEquipments() {
    return this.props.equipment.get('containers').map(container => {
      let mappedItems = container.get('items').map(id => {
        return this.props.equipment.getIn(['items', id]);
      });

      return <EquipmentContainer
        key={container.get('id')}
        container={container}
        items={mappedItems}
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
