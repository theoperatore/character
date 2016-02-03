'use strict';

import React from 'react';
import uuid from 'node-uuid';
import Icon from '../../components/Icon';
import Modal from '../../components/Modal';
import ConfirmModal from '../ConfirmModal';


export default React.createClass({
  displayName: 'CreateBonusDialog',


  propTypes: {
    active: React.PropTypes.bool.isRequired,
    dismiss: React.PropTypes.func.isRequired,
    onCreate: React.PropTypes.func.isRequired
  },


  getInitialState() {
    return {
      confirm: false,
      dirty: false
    }
  },


  makeDirty() {
    if (!this.state.dirty) {
      this.setState({ dirty: true });
    }
  },


  handleConfirm(answer) {
    if (answer === 'yes') {
      this.setState({ confirm: false, dirty: false});
      this.props.dismiss();
      return;
    }

    this.setState({ confirm: false });
  },


  dismiss() {
    if (this.state.dirty) {
      this.setState({ confirm: true });
      return;
    }

    this.props.dismiss();
  },


  save() {
    let name = this.refs.newTitle.value.trim();

    if (name !== '') {
      let abil = this.refs.ability.value;
      let prof = this.refs.prof.checked;
      let id = uuid.v1();
      let data = { abil, prof, id, name };

      this.props.onCreate({ type: 'ATTACK_BONUS_CREATE', data });
      this.setState({ confirm: false, dirty: false, edit: false });
      this.props.dismiss();
    }
  },


  content() {
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
      </div>
      <div className='modal-footer'>
        <button onClick={this.save} className='text-green'><Icon icon='fa fa-pencil'/> Save</button>
      </div>
    </section>
  },


  render() {
    return (
      <span>
        <Modal id={`create-attack-bonus-dialog`} active={this.props.active} content={this.content()} onDismiss={this.dismiss}/>
        <ConfirmModal active={this.state.confirm} onConfirm={this.handleConfirm}/>
      </span>
    )
  }
})