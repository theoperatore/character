

import PropTypes from 'prop-types';

import {Component} from 'react';

import createReactClass from 'create-react-class';

import { AbilityScores } from '../../constants';
import Icon from '../../../components/Icon';
import ConfirmModal from '../ConfirmModal';

const abilityScoreOrder = ['str', 'dex', 'con', 'int', 'wis', 'cha'];

export default createReactClass({
  displayName: 'EditAbilityScoresDialog',


  propTypes: {
    onSave: PropTypes.func.isRequired,
    abilities: PropTypes.object.isRequired,
  },


  getInitialState() {
    return {
      dirty: false,
      confirm: false,
      resolve: null,

      newStr: this.props.abilities.getIn(['str','score']),
      newDex: this.props.abilities.getIn(['dex','score']),
      newCon: this.props.abilities.getIn(['con','score']),
      newWis: this.props.abilities.getIn(['wis','score']),
      newInt: this.props.abilities.getIn(['int','score']),
      newCha: this.props.abilities.getIn(['cha','score']),
    }
  },


  makeDirty() {
    if (!this.state.diry) {
      this.setState({ dirty: true });
    }
  },


  handleConfirm(answer) {
    switch (answer) {
      case 'yes':
        if (this.state.resolve) {
          this.state.resolve('yes');
        }
        this.setState({ confirm: false, resolve: null, dirty: false });
        break;
      case 'no':
        if (this.state.resolve) {
          this.state.resolve('no');
        }
        this.setState({ confirm: false, resolve: null });
        break;
    }
  },


  confirm() {
    return new Promise(resolve => {
      if (this.state.dirty) {
        this.setState({ confirm: true, resolve });
        return;
      }

      resolve('yes');
    })
  },

  checkToSave() {
    return (
      this.state.newStr !== this.props.abilities.getIn(['str', 'score']) ||
      this.state.newDex !== this.props.abilities.getIn(['dex', 'score']) ||
      this.state.newCon !== this.props.abilities.getIn(['con', 'score']) ||
      this.state.newWis !== this.props.abilities.getIn(['wis', 'score']) ||
      this.state.newInt !== this.props.abilities.getIn(['int', 'score']) ||
      this.state.newcha !== this.props.abilities.getIn(['cha', 'score'])
    )
  },


  handleSave() {
    if (this.checkToSave()) {
      let data = {
        str: this.state.newStr === '' ? 0 : this.state.newStr,
        dex: this.state.newDex === '' ? 0 : this.state.newDex,
        con: this.state.newCon === '' ? 0 : this.state.newCon,
        wis: this.state.newWis === '' ? 0 : this.state.newWis,
        int: this.state.newInt === '' ? 0 : this.state.newInt,
        cha: this.state.newCha === '' ? 0 : this.state.newCha,
      };
      this.props.onSave({ type: 'ABILITY_SCORE_EDIT', data });
    }
  },


  handleCancel() {
    this.props.parentDismiss();
  },


  handleAbilityChange(ability, event) {
    this.makeDirty();
    if (event.target.value === '') {
      this.setState({ [ability]: '' });
    }
    else {
      let input = Number(event.target.value);
      if (!isNaN(input)) {
        this.setState({ [ability]: input });
      }
    }
  },


  getMod(ability) {
    return this.state[ability] === ''
      ? 0
      : Math.floor((this.state[ability] - 10) / 2);
  },


  mapToState(abilityKey) {
    return `new${abilityKey.substr(0,1).toUpperCase() + abilityKey.substr(1)}`;
  },


  createAbilityScoreContent() {
    return this.abilityScoreOrder.map((abilityKey, i) => {
      let stateKey = this.mapToState(abilityKey);

      return (
        <div key={i} className='row'>
          <div className='col-1-3 inputs'>
            <label htmlFor={abilityKey} className={`text-${abilityKey}`}>{AbilityScores[abilityKey].display}</label>
            <input type='text' id={abilityKey} ref={abilityKey}
              value={this.state[stateKey]}
              placeholder={this.props.abilities.getIn([abilityKey, 'score'])}
              onChange={this.handleAbilityChange.bind(this, stateKey)}
            />
          </div>
          <div className='col-1-3 text-center leads-to-mod'>
            <Icon icon='fa fa-arrow-right' />
          </div>
          <div className='col-1-3'>
            <label className={`text-${abilityKey}`}>Modifier</label>
            <h4>{this.getMod(stateKey)}</h4>
          </div>
        </div>
      )
    })
  },


  render() {
    return (
      <section className='ability-scores-dialog'>
        <div className='modal-header'><h3>Edit Ability Scores</h3></div>
        <div className='modal-content'>
          {this.createAbilityScoreContent()}
        </div>
        <div className='modal-footer'>
          <button onClick={this.handleSave} className='text-green'><Icon icon='fa fa-pencil' /> Save</button>
          <button onClick={this.handleCancel} className='text-red'><Icon icon='fa fa-remove' /> Cancel</button>
        </div>
        <ConfirmModal active={this.state.confirm} onConfirm={this.handleConfirm} />
      </section>
    )
  }
});
