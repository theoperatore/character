'use strict';

import React from 'react/addons';
import MoneyChart from '../components/MoneyChart';
import ListItem from '../components/ListItem';
import Icon from '../components/Icon';

export default React.createClass({
  displayName : 'PaneEquipments',


  shouldComponentUpdate : function(nextProps) {
    return nextProps.equipment !== this.props.equipment;
  },


  renderEquipments : function() {
    return this.props.equipment.get('otherEquipment').toJS().map((equip, i) => {
      return (
        <ListItem glyph={<Icon icon='fa fa-cube' />} key={i} container='.character-body' content={
          <section>
            <div className='modal-header'>
              <h3>{equip.name}</h3>
            </div>
            <div className='modal-content'>
              <p>{equip.desc}</p>
            </div>
          </section>
        }>
          <p>{equip.name}</p>
        </ListItem>
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
