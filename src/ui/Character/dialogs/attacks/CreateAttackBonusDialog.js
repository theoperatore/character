

import PropTypes from 'prop-types';

import React, { Component } from 'react';
import uuid from 'uuid/v1';
import Icon from '../../../components/Icon';
import Modal from '../../../components/Modal';
import ConfirmModal from '../ConfirmModal';


export default class extends React.Component {
  static displayName = 'CreateBonusDialog';

  static propTypes = {
    active: PropTypes.bool.isRequired,
    dismiss: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired
  };

  state = {
    bonus: 0,
    confirm: false,
    dirty: false
  };

  validateBonus = (ev) => {
    this.makeDirty();

    if (ev.target.value === '-' || ev.target.value === '') {
      this.setState({ bonus: ev.target.value });
      return;
    }

    let val = Number(ev.target.value);
    if (!isNaN(val) && val !== Infinity) {
      this.setState({ bonus: val });
    }
  };

  makeDirty = () => {
    if (!this.state.dirty) {
      this.setState({ dirty: true });
    }
  };

  handleConfirm = (answer) => {
    if (answer === 'yes') {
      this.setState({ confirm: false, dirty: false, bonus: 0 });
      this.props.dismiss();
      return;
    }

    this.setState({ confirm: false });
  };

  dismiss = () => {
    if (this.state.dirty) {
      this.setState({ confirm: true });
      return;
    }

    this.setState({ bonus: 0 })
    this.props.dismiss();
  };

  save = () => {
    let name = this.refs.newTitle.value.trim();

    if (name !== '') {
      let abil = this.refs.ability.value;
      let prof = this.refs.prof.checked;
      let id = `atkBonus-${uuid()}`;
      let bonus = this.state.bonus === '' || this.state.bonus === '-' ? 0 : this.state.bonus;
      let data = { abil, prof, id, name, bonus };

      this.props.onCreate({ type: 'ATTACK_BONUS_CREATE', data });
      this.setState({ confirm: false, dirty: false, edit: false, bonus: 0 });
      this.props.dismiss();
    }
  };

  content = () => {
    return <section>
      <div className='modal-header'>
        <h3>
          <input type='text' placeholder='Attack Bonus Title' onChange={this.makeDirty} ref='newTitle'/>
        </h3>
      </div>
      <div className='modal-content'>
        <div className='inputs'>
          <label htmlFor='abilSelect'>Governing Ability Score</label>
          <select id='abilSelect' ref='ability' defaultValue='str' onChange={this.makeDirty}>
            <option value='str'>Strength</option>
            <option value='dex'>Dexterity</option>
            <option value='con'>Constitution</option>
            <option value='wis'>Wisdom</option>
            <option value='int'>Intelligence</option>
            <option value='cha'>Charisma</option>
          </select>
        </div>
        <div className='inputs'>
          <input id='attackBonusProficient' ref='prof' type='checkbox' onChange={this.makeDirty}/>
          <label htmlFor='attackBonusProficient'>Proficient</label>
        </div>
        <div className='inputs'>
          <label htmlFor='bonusInput'>Bonuses</label>
          <input type='text' id='bonusInput' value={this.state.bonus} placeholder='attack bonus' onChange={this.validateBonus}/>
        </div>
      </div>
      <div className='modal-footer'>
        <button onClick={this.save} className='text-green'><Icon icon='fa fa-pencil'/> Save</button>
      </div>
    </section>
  };

  render() {
    return (
      <span>
        <Modal id={`create-attack-bonus-dialog`} active={this.props.active} content={this.content()} onDismiss={this.dismiss}/>
        <ConfirmModal active={this.state.confirm} onConfirm={this.handleConfirm}/>
      </span>
    )
  }
}