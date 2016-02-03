'use strict';

import React from 'react';
import ConfirmModal from '../../dialogs/ConfirmModal';
import Modal from '../../components/Modal';
import Icon from '../../components/Icon';

export default React.createClass({
  displayName: 'AttackBonusItem',


  propTypes: {
    id: React.PropTypes.string.isRequired,
    score: React.PropTypes.number.isRequired,
    ability: React.PropTypes.string.isRequired,
    proficient: React.PropTypes.bool.isRequired,
    title: React.PropTypes.string.isRequired,
    subtitle: React.PropTypes.string,
    onChange: React.PropTypes.func.isRequired
  },


  getInitialState() {
    return {
      confirmMessage: null,
      willRemove: false,
      confirm: false,
      dirty: false,
      edit: false
    }
  },


  makeDirty() {
    if (!this.state.dirty) {
      this.setState({ dirty: true });
    }
  },


  confirm(answer) {
    if (answer === 'no') {
      this.setState({ confirm: false, willRemove: false });
      return;
    }

    if (this.state.willRemove) {
      this.props.onChange({ type: 'ATTACK_BONUS_DELETE', data: { id: this.props.id }});
    }

    this.setState({ confirm: false, willRemove: false, dirty: false, edit: false });
  },


  dismiss() {
    if (this.state.dirty) {
      this.setState({ confirm: true, confirmMessage: null });
      return;
    }

    this.setState({ edit: false, dirty: false });
  },

  save() {
    let title = this.refs.newTitle.value.trim();
    let prof = this.refs.prof.checked;
    let abil = this.refs.ability.value;

    if (title !== this.props.title || prof !== this.props.proficient || abil !== this.props.ability) {
      this.props.onChange({ type: 'ATTACK_BONUS_EDIT', data: { title, prof, abil, id: this.props.id }})
    }

    this.setState({ edit: false, dirty: false, confirm: false, willRemove: false, confirmMessage: null });
  },


  delete() {
    this.setState({ 
      confirm: true, 
      confirmMessage: `Delete ${this.props.title} forever?`,
      willRemove: true
    });
  },


  content() {
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
      </div>
      <div className='modal-footer'>
        <button onClick={this.save} className='text-green'><Icon icon='fa fa-pencil'/> Save</button>
        <button onClick={this.delete} className='text-red'><Icon icon='fa fa-remove'/> Delete</button>
      </div>
    </section>
  },


  render() {
    return (
      <div className='attack-bonus-item-container' onClick={() => this.setState({ edit: true })}>
        <div className={`attack-bonus-item-number bg-attack`}>
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
})