'use strict';

import React from 'react';

import { AbilityScores } from '../../constants';
import Icon from '../../../components/Icon';
import ConfirmModal from '../ConfirmModal';

export default React.createClass({
  displayName: 'EditAbilityScoresDialog',


  propTypes: {
    onSave: React.PropTypes.func.isRequired,
    abilities: React.PropTypes.object.isRequired,
    proficiency: React.PropTypes.object.isRequired
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
      newProf: this.props.proficiency.get('score')
    }
  },

  abilityScoreOrder: ['str', 'dex', 'con', 'int', 'wis', 'cha'],

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
      (
        this.state.newStr !== this.props.abilities.getIn(['str', 'score']) ||
        this.state.newDex !== this.props.abilities.getIn(['dex', 'score']) ||
        this.state.newCon !== this.props.abilities.getIn(['con', 'score']) ||
        this.state.newWis !== this.props.abilities.getIn(['wis', 'score']) ||
        this.state.newInt !== this.props.abilities.getIn(['int', 'score']) ||
        this.state.newcha !== this.props.abilities.getIn(['cha', 'score']) ||
        this.state.newProf !== this.props.proficiency.get('score')
      )
      &&
      (
        !isNaN(Number(this.state.newStr)) &&
        !isNaN(Number(this.state.newDex)) &&
        !isNaN(Number(this.state.newCon)) &&
        !isNaN(Number(this.state.newWis)) &&
        !isNaN(Number(this.state.newInt)) &&
        !isNaN(Number(this.state.newCha)) &&
        !isNaN(Number(this.state.newProf))
      )
    )
  },


  handleSave() {
    if (this.checkToSave()) {
      let data = {
        str: this.state.newStr,
        dex: this.state.newDex,
        con: this.state.newCon,
        wis: this.state.newWis,
        int: this.state.newInt,
        cha: this.state.newCha,
        proficiency: this.state.newProf
      };
      this.props.onSave({ type: 'ABILITY_SCORE_EDIT', data });  
    }
  },


  handleCancel() {
    this.props.parentDismiss();
  },


  handleAbilityChange(ability, event) {
    this.makeDirty();
    if (event.target.value === '-' || event.target.value === '0-') {
      this.setState({ [ability]: '-' });
    }
    else {
      let input = Number(event.target.value);
      if (!isNaN(input)) {
        this.setState({ [ability]: input });
      }
    }
  },


  getMod(ability) {
    return Math.floor((this.state[ability] - 10) / 2);
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
          <div className='inputs'>
            <label htmlFor='newProf' className='underline-proficient'>Proficiency Bonus</label>
            <input type='text'
              value={this.state.newProf}
              placeholder={this.props.proficiency.get('score')}
              onChange={this.handleAbilityChange.bind(this, 'newProf')}
            />
          </div>
          <hr />
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
})