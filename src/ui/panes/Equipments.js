'use strict';

import React from 'react';
import MoneyChart from '../components/MoneyChart';
import ListItem from '../components/ListItem';
import Icon from '../components/Icon';

export default React.createClass({
  displayName : 'PaneEquipments',


  shouldComponentUpdate : function(nextProps) {
    return nextProps.equipment !== this.props.equipment;
  },


  renderEquipments : function() {
    return this.props.equipment.get('items').toJS().map((equip, i) => {
      return (
        <ListItem title={equip.name} id={`equipments-${i}`} key={i} modalContent={<div>
          <div className='modal-header'>
            <h3>{equip.name}</h3>
          </div>
          <div className='modal-content'>
            <p>{equip.desc}</p>
          </div>
        </div>}/>
      )
    })
  },


  render : function() {
    return (
      <div className="pane-container">
        <h3>Equipments</h3>
        <MoneyChart data={this.props.equipment.get('money')} />
        {this.renderEquipments()}
      </div>
    );
  }
})
