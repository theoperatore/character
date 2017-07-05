'use strict';

import React, { Component } from 'react';
import Modal from '../../../components/Modal';
import Icon from '../../../components/Icon';
import Tab from '../../../components/Tab';
import Tabs from '../../../components/Tabs';

export default React.createClass({
  displayName: 'EditHpDialog',


  propTypes: {
    active: PropTypes.bool.isRequired,
    dismiss: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired
  },


  getInitialState() {
    return {
      type: 0,
      value: ''
    }
  },


  types: ['damage', 'heal', 'temporary'],


  componentWillReceiveProps(nextProps) {
    if (nextProps.active) {
      this.setState({ type: 0, value: '' });
    }
  },


  getContent() {
    return <section className='hp-dialog-container'>
      <div className='modal-header'><h3>Manage Current Hit Points</h3></div>
      <div className='modal-content'>
        <label>Type</label>
        <Tabs activeIdx={this.state.type} onTabSelect={idx => this.setState({ type: idx })}>
          <Tab>Damage</Tab>
          <Tab>Heal</Tab>
          <Tab>Temporary</Tab>
        </Tabs>
        <div className='inputs'>
          <label htmlFor='hpValue'>Value</label>
          <input id='hpValue' value={this.state.value} placeholder='number value' type='text' onChange={this.updateValue}/>
        </div>
      </div>
      <div className='modal-footer'>
        <button onClick={this.save} className='text-green'><Icon icon='fa fa-pencil'/> Save</button>
      </div>
    </section>
  },


  updateValue(ev) {
    let value = Number(ev.target.value);
    if (!isNaN(value) && value !== Infinity) {
      this.setState({ value });
    }
  },


  save() {
    if (this.state.value !== '' && !isNaN(this.state.value)) {
      let data = {
        type: this.types[this.state.type],
        value: this.state.value
      }
      this.props.onChange({ type: 'HIT_POINTS_EDIT', data });
    }

    this.props.dismiss();
  },


  dismiss() {
    this.props.dismiss();
  },


  render() {
    return <Modal id='edit-hp-dialog' active={this.props.active} content={this.getContent()} onDismiss={this.dismiss} />
  }
})