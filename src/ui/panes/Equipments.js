'use strict';

import React from 'react';
import ListItem from '../components/ListItem/v2';
import Icon from '../components/Icon';
import CreateEquipmentContainer from '../dialogs/equipment/createEquipmentContainer';
import EquipmentContainer from '../containers/EquipmentContainer';

export default React.createClass({
  displayName : 'PaneEquipments',

  propTypes: {
    equipment: React.PropTypes.object.isRequired,
    handleEquipmentChange: React.PropTypes.func.isRequired,
  },

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.equipment !== this.props.equipment ||
           nextState.createContainer !== this.state.createContainer
  },

  getInitialState() {
    return {
      createContainer: false,
    }
  },

  renderWealth() {
    return this.props.equipment.get('money').entrySeq().map(entry => {
      let [ moneyType, moneyAmount ] = entry;

      return <div
        key={moneyType}
        className='money'
        >
          <p><small>{moneyType}</small></p>
          <p>{moneyAmount}</p>
        </div>
    })
  },

  renderEquipments() {
    let simpleContainers = this.props.equipment.get('containers').map(c => {
      return {
        id: c.get('id'),
        name: c.get('name'),
      }
    }).toJS();

    return this.props.equipment.get('containers').map(container => {
      let mappedItems = container.get('items').map(id => {
        return this.props.equipment.getIn(['allItems', id]);
      });

      return <EquipmentContainer
        key={container.get('id')}
        container={container}
        containers={simpleContainers}
        items={mappedItems}
        onContainerChange={this.props.handleEquipmentChange}
      />;
    }).toJS();
  },

  render() {
    return (
      <div className="pane-container">
        <section className='info-section interactable'>
          <div className='info-section-header'>
            <h5 className='info-section-title'>Wealth</h5>
          </div>
          { this.renderWealth() }
        </section>
        <section className='info-section'>
          <div className='info-section-header'>
            <h5 className='info-section-title'>Inventory</h5>
          </div>
          { this.renderEquipments() }
          <p 
            className='subtext text-center p2 interactable'
            onClick={() => this.setState({ createContainer: true })}
          ><Icon icon='fa fa-plus' /> Create a new equipment container</p>
        <CreateEquipmentContainer
          active={this.state.createContainer}
          onDismiss={() => this.setState({ createContainer: false })}
          onCreate={this.props.handleEquipmentChange}
        />
        </section>
      </div>
    );
  }
})
