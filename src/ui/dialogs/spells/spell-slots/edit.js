'use strict';

import React from 'react';
import Icon from '../../../components/Icon';
import Modal from '../../../components/Modal';

export default React.createClass({
  displayName: 'EditSpellSlotsDialog',

  propTypes: {
    active: React.PropTypes.bool.isRequired,
    onDismiss: React.PropTypes.func.isRequired,
    slots: React.PropTypes.array.isRequired,
    onSpellSlotsChange: React.PropTypes.func.isRequired,
  },

  getInitialState() {
    return {
      slots: this.props.slots.map(slot => slot.slots)
    }
  },

  componentWillReceiveProps(nextProps) {
    this.setState({ slots: nextProps.slots.map(slot => slot.slots )});
  },

  saveChanges() {
    this.props.onSpellSlotsChange({ type: 'SPELL_SLOTS_EDIT', data: this.state.slots });
    this.props.onDismiss();
  },

  cancelChanges() {
    this.props.onDismiss();
  },

  isNumber(val) {
    return !isNaN(Number(val));
  },

  handleSlotChange(slotIndex, ev) {
    if (this.isNumber(ev.target.value) || ev.target.value === '') {
      let { slots } = this.state;
      slots[slotIndex] = ev.target.value === '' ? '' : Number(ev.target.value);
      this.setState({ slots });
    }
  },

  getContent() {
    let style = { width: '3em', marginLeft: '5px', color: '#333' };
    let labelStyle = { display: 'block', color: '#bbb' };

    return <section>
      <div className='modal-header'>
        <h3>Max Spell Slots</h3>
      </div>
      <div className='modal-content row inputs'>
        <div className='col-1-3'>
          <label style={labelStyle}><span>lvl 1</span><input onChange={this.handleSlotChange.bind(this, 1)} value={this.state.slots[1]} style={style} type='text' placeholder='lvl 1 max slots'/></label>
          <label style={labelStyle}><span>lvl 2</span><input onChange={this.handleSlotChange.bind(this, 2)} value={this.state.slots[2]} style={style} type='text' placeholder='lvl 2 max slots'/></label>
          <label style={labelStyle}><span>lvl 3</span><input onChange={this.handleSlotChange.bind(this, 3)} value={this.state.slots[3]} style={style} type='text' placeholder='lvl 3 max slots'/></label>
        </div>
        <div className='col-1-3'>
          <label style={labelStyle}><span>lvl 4</span><input onChange={this.handleSlotChange.bind(this, 4)} value={this.state.slots[4]} style={style} type='text' placeholder='lvl 4 max slots'/></label>
          <label style={labelStyle}><span>lvl 5</span><input onChange={this.handleSlotChange.bind(this, 5)} value={this.state.slots[5]} style={style} type='text' placeholder='lvl 5 max slots'/></label>
          <label style={labelStyle}><span>lvl 6</span><input onChange={this.handleSlotChange.bind(this, 6)} value={this.state.slots[6]} style={style} type='text' placeholder='lvl 6 max slots'/></label>
        </div>
        <div className='col-1-3'>
          <label style={labelStyle}><span>lvl 7</span><input onChange={this.handleSlotChange.bind(this, 7)} value={this.state.slots[7]} style={style} type='text' placeholder='lvl 7 max slots'/></label>
          <label style={labelStyle}><span>lvl 8</span><input onChange={this.handleSlotChange.bind(this, 8)} value={this.state.slots[8]} style={style} type='text' placeholder='lvl 8 max slots'/></label>
          <label style={labelStyle}><span>lvl 9</span><input onChange={this.handleSlotChange.bind(this, 9)} value={this.state.slots[9]} style={style} type='text' placeholder='lvl 9 max slots'/></label>
        </div>
      </div>
      <div className='modal-footer'>
        <button className='bg-green text-green' onClick={this.saveChanges}><Icon icon='fa fa-pencil'/>Save</button>
        <button className='bg-red text-red' onClick={this.cancelChanges}><Icon icon='fa fa-remove'/>Cancel</button>
      </div>
    </section>
  },

  render() {
    return (
      <Modal 
        id='edit-spell-slots'
        active={this.props.active}
        content={this.getContent()}
        onDismiss={this.props.onDismiss} 
      />
    )
  },
});
