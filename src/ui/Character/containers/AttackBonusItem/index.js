'use strict';

import PropTypes from 'prop-types';

import React, { Component } from 'react';
import ConfirmModal from '../../dialogs/ConfirmModal';
import Modal from '../../../components/Modal';
import Icon from '../../../components/Icon';

export default class extends React.Component {
  static displayName = 'AttackBonusItem';

  static propTypes = {
    id: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    ability: PropTypes.string.isRequired,
    proficient: PropTypes.bool.isRequired,
    bonus: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    removable: PropTypes.bool,
  };

  static defaultProps = {
    removable: true,
  };

  state = {
    bonus: this.props.bonus,
    confirmMessage: null,
    willRemove: false,
    confirm: false,
    dirty: false,
    edit: false
  };

  makeDirty = () => {
    if (!this.state.dirty) {
      this.setState({ dirty: true });
    }
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

  confirm = (answer) => {
    if (answer === 'no') {
      this.setState({ confirm: false, willRemove: false });
      return;
    }

    if (this.state.willRemove) {
      this.props.onChange({ type: 'ATTACK_BONUS_DELETE', data: { id: this.props.id }});
    }

    this.setState({ confirm: false, willRemove: false, dirty: false, edit: false });
  };

  dismiss = () => {
    if (this.state.dirty) {
      this.setState({ confirm: true, confirmMessage: null });
      return;
    }

    this.setState({ edit: false, dirty: false });
  };

  save = () => {
    let title = this.refs.newTitle.value.trim();
    let prof = this.refs.prof.checked;
    let abil = this.refs.ability.value;
    let bonus = this.state.bonus;

    if ((title !== this.props.title || prof !== this.props.proficient || abil !== this.props.ability || bonus !== this.props.bonus)
        && bonus !== '' && bonus !== '-') {
      this.props.onChange({ type: 'ATTACK_BONUS_EDIT', data: { name: title, prof, abil, id: this.props.id, bonus }})
    }

    this.setState({ edit: false, dirty: false, confirm: false, willRemove: false, confirmMessage: null });
  };

  delete = () => {
    this.setState({ 
      confirm: true, 
      confirmMessage: `Delete ${this.props.title} forever?`,
      willRemove: true
    });
  };

  content = () => {
    return <section>
      <div className='modal-header'>
        <h3>
          <input type='text' placeholder={this.props.title} defaultValue={this.props.title} onChange={this.makeDirty} ref='newTitle'/>
        </h3>
      </div>
      <div className='modal-content'>
        <div className='inputs'>
          <label htmlFor='abilSelect'>Governing Ability Score</label>
          <select id='abilSelect' ref='ability' defaultValue={this.props.ability} onChange={this.makeDirty}>
            <option value='str'>Strength</option>
            <option value='dex'>Dexterity</option>
            <option value='con'>Constitution</option>
            <option value='wis'>Wisdom</option>
            <option value='int'>Intelligence</option>
            <option value='cha'>Charisma</option>
          </select>
        </div>
        <div className='inputs'>
          <input id='attackBonusProficient' ref='prof' type='checkbox' defaultChecked={this.props.proficient} onChange={this.makeDirty}/>
          <label htmlFor='attackBonusProficient'>Proficient</label>
        </div>
        <div className='inputs'>
          <label htmlFor='bonusInput'>Bonuses</label>
          <input type='text' id='bonusInput' value={this.state.bonus} placeholder={this.props.bonus} onChange={this.validateBonus}/>
        </div>
      </div>
      <div className='modal-footer'>
        <button onClick={this.save} className='text-green'><Icon icon='fa fa-pencil'/> Save</button>
        {
          this.props.removable
          ? <button onClick={this.delete} className='text-red'><Icon icon='fa fa-remove'/> Delete</button>
          : null
        }
      </div>
    </section>
  };

  render() {
    return (
      <div className='attack-bonus-item-container' onClick={() => this.setState({ edit: true, bonus: this.props.bonus })}>
        <div className={`attack-bonus-item-number bg-${this.props.ability}`}>
          <span>{this.props.score}</span>
        </div>
        <div className='attack-bonus-item-content'>
          <p className='attack-bonus-item-title'>{this.props.title}</p>
          <p className='attack-bonus-item-subtitle'>{this.props.subtitle}</p>
        </div>
        <ConfirmModal active={this.state.confirm} onConfirm={this.confirm} message={this.state.confirmMessage}/>
        <Modal active={this.state.edit} id='edit-attack-bonus-dialog' content={this.content()} onDismiss={this.dismiss} />
      </div>
    )
  }
}