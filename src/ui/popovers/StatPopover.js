'use strict';

var React = require('react/addons');

module.exports = React.createClass({
  displayName : 'StatPopover',


  getDefaultProps : function() {
    return ({
      title : 'Edit Stat',
      label : '',
      stat: 'placeholder',
      checked : false,
      handleStatChange : () => {},
      handleCheckboxChange : () => {}
    })
  },


  handleStatChange : function(ev) {
    this.props.handleStatChange(ev.target.value);
  },


  handleCheckboxChange : function(ev) {
    this.props.handleCheckboxChange(ev.target.value);
  },


  render : function() {
    return (
      <div className='stat-popover-content-container'>
        <h4>{this.props.title}</h4>
        <div className='input-group'>
          <label className='input-group-label-block'>{this.props.label}</label>
          <input type='text' onChange={this.handleStatChange} placeholder={this.props.stat} value={this.props.stat} />
          <input type='checkbox' onChange={this.handleCheckboxChange} checked={this.props.checked} />
          <label>Trained</label>
        </div>
      </div>
    )
  }
})
