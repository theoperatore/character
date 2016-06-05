'use strict';

import React from 'react';
import Modal from '../../../components/Modal';
import Tabs from '../../../components/Tabs';
import Tab from '../../../components/Tab';
import { createSaveBtn, createCancelBtn } from '../../../components/Modal/buttons';

export default React.createClass({
  displayName: 'ManageWealth',

  propTypes: {
    active: React.PropTypes.bool.isRequired,
    onDismiss: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
  },

  getInitialState() {
    return {
      wealthType: 3,
      actionType: 0,
      value: '',
    };
  },

  wealthTypes: ['cp', 'sp', 'ep', 'gp', 'pp'],
  actionTypes: ['add', 'subtract'],

  handleSave() {
    if (this.state.value === '') return;

    this.props.onChange({
      type: 'WEALTH_EDIT',
      data: {
        wealthType: this.wealthTypes[this.state.wealthType],
        actionType: this.actionTypes[this.state.actionType],
        value: this.state.value,
      },
    });

    this.setState({ wealthType: 3, actionType: 0, value: '' });
    this.props.onDismiss();
  },

  updateValue(ev) {
    let value = Number(ev.target.value);

    if (ev.target.value === '') {
      return this.setState({ value: '' })
    }

    if (!isNaN(value) && value !== Infinity) {
      this.setState({ value });
    }
  },

  renderManageWealth() {
    return <section className='manage-wealth-dialog'>
      <div className='modal-header'>
        <h3>Manage Wealth</h3>
      </div>
      <div className='modal-content'>
        <label>Wealth Type</label>
        <Tabs
          activeIdx={this.state.wealthType}
          onTabSelect={idx => this.setState({ wealthType: idx })}
        >
          <Tab>Copper</Tab>
          <Tab>Silver</Tab>
          <Tab>Electrum</Tab>
          <Tab>Gold</Tab>
          <Tab>Platinum</Tab>
        </Tabs>
        <label>Action</label>
        <Tabs
          activeIdx={this.state.actionType}
          onTabSelect={idx => this.setState({ actionType: idx })}
        >
          <Tab>Add</Tab>
          <Tab>Subtract</Tab>
        </Tabs>
        <div className='inputs'>
          <label htmlFor='wealthValue'>Value</label>
          <input
            type='text'
            id='wealthValue'
            value={this.state.value}
            placeholder='wealth value'
            onChange={this.updateValue}
          />
        </div>
      </div>
      <div className='modal-footer'>
        { createSaveBtn(this.handleSave) }
        { createCancelBtn(this.props.onDismiss) }
      </div>
    </section>
  },

  render() {
    return <Modal
      id='manage-wealth'
      active={this.props.active}
      content={this.renderManageWealth()}
      onDismiss={this.props.onDismiss}
    />
  },
});