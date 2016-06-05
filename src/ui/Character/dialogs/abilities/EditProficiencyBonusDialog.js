'use strict';

import React from 'react';

import Icon from '../../../components/Icon';
import Modal from '../../../components/Modal';
import { createSaveBtn, createCancelBtn } from '../../../components/Modal/buttons';
import ConfirmModal from '../ConfirmModal';

export default React.createClass({
  displayName: 'EditProficiencyBonusDialog',

  propTypes: {
    active: React.PropTypes.bool.isRequired,
    onDismiss: React.PropTypes.func.isRequired,
    base: React.PropTypes.number.isRequired,
    bonus: React.PropTypes.number.isRequired,
    onChange: React.PropTypes.func.isRequired,
  },

  getInitialState() {
    return {
      base: this.props.base,
      bonus: this.props.bonus,
      dirty: false,
      confirmCancel: false,
    }
  },

  handleSave() {
    let base = this.state.base;
    let bonus = this.state.bonus;

    if (base === '' || bonus === '') return;

    this.props.onChange({
      type: 'PROFICIENCY_BONUS_EDIT',
      data: {
        base,
        bonus,
      },
    });
    this.props.onDismiss();
  },

  handleCancel() {
    if (!this.state.dirty) {
      return this.props.onDismiss();
    }

    this.setState({ confirmCancel: true });
  },

  handleConfirm(answer) {
    switch (answer) {
      case 'no':
        return this.setState({ confirmCancel: false });
      case 'yes':
        this.setState({ confirmCancel: false, dirty: false, base: this.props.base, bonus: this.props.bonus });
        this.props.onDismiss();
        break;
    }
  },

  validateStat(stat, ev) {
    if (ev.target.value === '') {
      return this.setState({ [stat]: '', dirty: true });
    }

    let num = Number(ev.target.value);

    if (!isNaN(num)) {
      this.setState({ [stat]: num, dirty: true });
    }
  },

  getContent() {
    return <section>
      <div className='modal-header'>
        <h3>Edit Proficiency Bonus</h3>
      </div>
      <div className='modal-content'>
        <div className='inputs'>
          <label htmlFor='pbScore'>Base Score</label>
          <input
            id='pbScore'
            type='text'
            value={this.state.base}
            placeholder={this.props.base}
            onChange={this.validateStat.bind(this, 'base')}
          />
        </div>
        <div className='inputs'>
          <label htmlFor='pbBonus'>Bonuses</label>
          <input
            id='pbBonus'
            type='text'
            value={this.state.bonus}
            placeholder={this.props.bonus}
            onChange={this.validateStat.bind(this, 'bonus')}
          />
        </div>
      </div>
      <div className='modal-footer'>
        { createSaveBtn(this.handleSave) }
        { createCancelBtn(this.handleCancel) }
      </div>
    </section>
  },

  render() {
    return <Modal
      id='edit-proficiency-bonus'
      active={this.props.active}
      content={this.getContent()}
      onDismiss={this.handleCancel}
    >
      <ConfirmModal
        active={this.state.confirmCancel}
        onConfirm={this.handleConfirm}
      />
    </Modal>
  }
})