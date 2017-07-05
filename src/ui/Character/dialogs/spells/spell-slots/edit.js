'use strict';

import React, { Component } from 'react';
import Icon from '../../../../components/Icon';
import Modal from '../../../../components/Modal';

export default class extends React.Component {
  static displayName = 'EditSpellSlotsDialog';

  static propTypes = {
    active: PropTypes.bool.isRequired,
    onDismiss: PropTypes.func.isRequired,
    slots: PropTypes.array.isRequired,
    onSpellSlotsChange: PropTypes.func.isRequired,
  };

  state = {
    slots: this.props.slots.map(slot => {
      return {
        max: slot.slots,
        curr: slot.slots - slot.used,
      }
    }),
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      slots: nextProps.slots.map(slot => {
        return {
          max: slot.slots,
          curr: slot.slots - slot.used,
        }
      })
    });
  }

  containsNumber = (slot) => {
    return (slot.curr !== '' && this.isNumber(slot.curr) &&
            slot.max  !== '' && this.isNumber(slot.max));
  };

  saveChanges = () => {
    if (this.state.slots.every(this.containsNumber)) {
      this.props.onSpellSlotsChange({
        type: 'SPELL_SLOTS_EDIT',
        data: {
          slots: this.state.slots
        }
      });

      this.props.onDismiss();
    }
  };

  cancelChanges = () => {
    this.props.onDismiss();
  };

  isNumber = (val) => {
    return !isNaN(Number(val));
  };

  handleMaxChange = (slotIdx, ev) => {
    if (this.isNumber(ev.target.value) || ev.target.value === '') {
      let { slots } = this.state;
      slots[slotIdx].max = ev.target.value === '' ? '' : Number(ev.target.value);
      this.setState({ slots });
    }
  };

  handleCurrentChange = (slotIdx, ev) => {
    if (this.isNumber(ev.target.value) || ev.target.value === '') {
      let { slots } = this.state;
      slots[slotIdx].curr = ev.target.value === '' ? '' : Number(ev.target.value);
      this.setState({ slots });
    }
  };

  renderEditSpellSlot = (slot, idx) => {
    let style = { width: '5em', marginLeft: '5px', color: '#333' };
    let labelStyle = { display: 'block', color: '#bbb', marginBottom: '2px' };

    return (
      <div style={labelStyle} key={idx}>
        <span>{`lvl ${idx + 1}`}</span>
        <input
          style={style}
          type='text'
          value={slot.curr}
          defaultValue={slot.curr}
          placeholder={this.props.slots[idx + 1].slots - this.props.slots[idx + 1].used}
          onChange={this.handleCurrentChange.bind(this, idx + 1)}
        />{' / '}<input
          style={style}
          type='text'
          value={slot.max}
          defaultValue={slot.max}
          placeholder={this.props.slots[idx + 1].slots}
          onChange={this.handleMaxChange.bind(this, idx + 1)}
        />
      </div>
    )
  };

  getContent = () => {
    return <section>
      <div className='modal-header'>
        <h3>Edit Spell Slots<small className='ml2'>(current / max)</small></h3>
      </div>
      <div className='modal-content'>
        {
          this.state.slots.slice(1).map(this.renderEditSpellSlot)
        }
      </div>
      <div className='modal-footer'>
        <button className='text-green' onClick={this.saveChanges}><Icon icon='fa fa-pencil'/>Save</button>
        <button className='text-red' onClick={this.cancelChanges}><Icon icon='fa fa-remove'/>Cancel</button>
      </div>
    </section>
  };

  render() {
    return (
      <Modal 
        id='edit-spell-slots'
        active={this.props.active}
        content={this.getContent()}
        onDismiss={this.props.onDismiss} 
      />
    )
  }
}
