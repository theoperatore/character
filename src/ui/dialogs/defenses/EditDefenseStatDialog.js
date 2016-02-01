'use strict';

import React from 'react';
import Modal from '../../components/Modal';
import Icon from '../../components/Icon';
import ConfirmModal from '../ConfirmModal';

export default React.createClass({
  displayName: 'EditDefenseStatDialog',


  propTypes: {
    active: React.PropTypes.bool.isRequired,
    dismiss: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
    hp: React.PropTypes.number.isRequired,
    armorClass: React.PropTypes.number.isRequired,
    speed: React.PropTypes.string.isRequired,
    initiative: React.PropTypes.number.isRequired,
    hitDiceType: React.PropTypes.string.isRequired
  },


  getInitialState() {
    return {
      dirty: false,
      confirm: false,
      hp: this.props.hp,
      armorClass: this.props.armorClass,
      initiative: this.props.initiative
    }
  },


  componentWillReceiveProps(nextProps) {
    if (nextProps.active) {
      this.setState({
        hp: nextProps.hp,
        armorClass: nextProps.armorClass,
        initiative: nextProps.initiative
      })
    }
  },


  makeDirty() {
    if (!this.state.dirty) {
      this.setState({ dirty: true });
    }
  },


  verifyNumber(prop, ev) {
    this.makeDirty();
    if (ev.target.value === '') {
      this.setState({ [prop]: ev.target.value });
      return;
    }


    let num = Number(ev.target.value);
    if (!isNaN(num) && num !== Infinity) {
      this.setState({ [prop]: num });
    }
  },


  getContent() {
    return <section>
      <div className='modal-header'><h3>Edit Defenses</h3></div>
      <div className='modal-content'>
        <div className='inputs'>
          <label htmlFor='maxHp'>Max Hit Points</label>
          <input type='text' id='maxHp' ref='maxHp' placeholder={this.props.hp} value={this.state.hp} onChange={this.verifyNumber.bind(this, 'hp')}/>
        </div>
        <div className='inputs'>
          <label htmlFor='armorClass'>Armor Class</label>
          <input type='text' id='armorClass' ref='armorClass' placeholder={this.props.armorClass} value={this.state.armorClass} onChange={this.verifyNumber.bind(this, 'armorClass')}/>
        </div>
        <div className='inputs'>
          <label htmlFor='speed'>Speed</label>
          <input type='text' id='speed' ref='speed' placeholder={this.props.speed} defaultValue={this.props.speed} onChange={this.makeDirty}/>
        </div>
        <div className='inputs'>
          <label htmlFor='initiative'>Initiative Bonus</label>
          <input type='text' id='initiative' ref='initiative' placeholder={this.props.initiative} value={this.state.initiative} onChange={this.verifyNumber.bind(this, 'initiative')}/>
          <p><small>Initiative automatically uses the <em className='text-dex'>Dexterity</em> modifier. Enter the sum of any bonuses in the field above.</small></p>
        </div>
      </div>
      <div className='modal-footer'>
        <button className='text-green' onClick={this.save}><Icon icon='fa fa-pencil'/> Save</button>
        <button className='text-red' onClick={this.dismiss}><Icon icon='fa fa-remove'/> Cancel</button>
      </div>
    </section>
  },


  needsUpdate(hp, ac, sp, init) {
    return hp !== this.props.hp || 
           ac !== this.props.armorClass ||
           sp !== this.props.speed ||
           init !== this.props.initiative;
  },


  save() {
    let hp = this.state.hp === '' ? this.props.hp : this.state.hp;
    let ac = this.state.armorClass === '' ? this.props.armorClass : this.state.armorClass;
    let speed = this.refs.speed.value === '' ? this.props.speed : this.refs.speed.value;
    let initiative = this.state.initiative === '' ? this.props.initiative : this.state.initiative;

    if (this.needsUpdate(hp, ac, speed, initiative)) {
      let data = {
        maxHp: hp,
        armorClass: ac,
        speed,
        initativeBonus: initiative
      }

      this.props.onChange({ type: 'DEFENSES_EDIT', data });
    }

    this.setState({ confirm: false, dirty: false });
    this.props.dismiss();
  },


  dismiss() {
    if (this.state.dirty) {
      this.setState({ confirm: true });
      return;
    }

    this.props.dismiss();
  },


  handleConfirm(answer) {
    if (answer === 'yes') {
      this.setState({ confirm: false, dirty: false });
      this.props.dismiss();
      return;
    }

    this.setState({ confirm: false });
  },


  render() {
    return <span>
      <Modal id='edit-defense-dialog' active={this.props.active} content={this.getContent()} onDismiss={this.dismiss} />
      <ConfirmModal active={this.state.confirm} onConfirm={this.handleConfirm} />
    </span>
  }
})