

import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '../../components/ListItem/v2';
import Icon from '../../components/Icon';
import CreateEquipmentContainer from '../dialogs/equipment/createEquipmentContainer';
import ManageWealth from '../dialogs/equipment/manageWealth';
import EquipmentContainer from '../containers/EquipmentContainer';

const wealthTypes = ['cp', 'sp', 'ep', 'gp', 'pp'];

export default class extends React.Component {
  static displayName = 'PaneEquipments';

  static propTypes = {
    equipment: PropTypes.object.isRequired,
    handleEquipmentChange: PropTypes.func.isRequired,
  };

  state = {
    createContainer: false,
    manageWealth: false,
  };

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.equipment !== this.props.equipment ||
           nextState.createContainer !== this.state.createContainer |
           nextState.manageWealth !== this.state.manageWealth
  }

  renderWealth = () => {
    return wealthTypes.map(type => {
      let money = this.props.equipment.getIn(['money', type]);

      return <div
        key={type}
        className='money'
        >
          <p><small>{type}</small></p>
          <p>{money}</p>
        </div>
    })
  };

  renderEquipments = () => {
    let simpleContainers = this.props.equipment.get('containers').map(c => {
      return {
        id: c.get('id'),
        name: c.get('name'),
      }
    }).toJS();

    return this.props.equipment.get('containers').map(container => {
      let mappedItems = container.get('items')
        ? container.get('items').map(id => {
          return this.props.equipment.getIn(['allItems', id]);
        })
        : [];

      return <EquipmentContainer
        key={container.get('id')}
        container={container}
        containers={simpleContainers}
        items={mappedItems}
        onContainerChange={this.props.handleEquipmentChange}
      />;
    }).toJS();
  };

  render() {
    return (
      <div className="pane-container">
        <section className='info-section interactable' onClick={() => this.setState({ manageWealth: true })}>
          <div className='info-section-header'>
            <h5 className='info-section-title'>Wealth</h5>
          </div>
          { this.renderWealth() }
          <ManageWealth
            active={this.state.manageWealth}
            onDismiss={() => this.setState({ manageWealth: false })}
            onChange={this.props.handleEquipmentChange}
          />
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
}
