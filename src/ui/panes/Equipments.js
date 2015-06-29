'use strict';

var React = require('react/addons');
var MoneyChart = require('../components/MoneyChart');
var Panel = require('../components/Panel');

module.exports = React.createClass({
  displayName : 'PaneEquipments',


  shouldComponentUpdate : function(nextProps) {
    return nextProps.equipment !== this.props.equipment;
  },


  renderEquipments : function() {
    return this.props.equipment.get('otherEquipment').toJS().map((equip, i) => {
      return (
        <Panel header={equip.name} key={i}>
          <p>{equip.desc}</p>
        </Panel>
      )
    })
  },


  render : function() {
    return (
      <div className="pane-container">
        <h3>Equipments</h3>
        <MoneyChart data={this.props.equipment.get('money')} />
        <hr />
        {this.renderEquipments()}
      </div>
    );
  }
})
