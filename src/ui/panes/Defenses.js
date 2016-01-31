'use strict';

import React from 'react';

import HPCounter from '../components/HPCounter';
import Icon from '../components/Icon';
import SavingThrowItem from '../composite-components/SavingThrowItem';
import ResistanceItem from '../composite-components/ResistanceItem';
import CreateResistance from '../dialogs/defenses/resistances/create';

export default React.createClass({
  displayName: 'PaneDefenses',


  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.hitPoints !== nextProps.hitPoints ||
      this.props.speed !== nextProps.speed ||
      this.props.initiative !== nextProps.initiative ||
      this.props.armorClass !== nextProps.armorClass ||
      this.props.savingThrows !== nextProps.savingThrows ||
      this.props.resistances !== nextProps.resistances ||
      this.state.create !== nextState.create ||
      this.state.hp !== nextState.hp || 
      this.state.temp !== nextState.temp
    );
  },


  getInitialState() {
    return {
      create: false,
      hp: this.props.hitPoints.get('current'),
      temp: this.props.hitPoints.get('temporary')
    }
  },


  renderSavingThrows() {
    return Object.keys(this.props.savingThrows.toJS()).map((abilityKey, i) => {
      return <SavingThrowItem
        key={i}
        ability={abilityKey}
        score={this.props.savingThrows.getIn([abilityKey, 'score'])}
        proficient={this.props.savingThrows.getIn([abilityKey, 'proficient'])}
        onSavingThrowChange={this.props.handleDefenseChange}
      />
    })
  },


  renderDeathThrows() {
    return <div className='row death-saves'>
      <div className='col-1-2'>
        <span onClick={() => this.props.handleDefenseChange({ type: 'DEATH_SAVES_ADD', data: { successes: 1 } })}>
          {this.props.hitPoints.getIn(['deathSaves', 'successes'])}
        </span>
        <h6>successes</h6>
      </div>
      <div className='col-1-2'>
        <span onClick={() => this.props.handleDefenseChange({ type: 'DEATH_SAVES_ADD', data: { failures: 1 } })}>
          {this.props.hitPoints.getIn(['deathSaves', 'failures'])}
        </span>
        <h6>failures</h6>
      </div>
    </div>
  },


  renderResistances() {
    return this.props.resistances.toJS().map((resistance, i) => {
      return (
        <ResistanceItem 
          key={i}
          id={resistance.id}
          name={resistance.name}
          desc={resistance.desc}
          onResistanceChange={this.props.handleDefenseChange} 
        />
      )
    })
  },


  render() {
    return (
      <div className='pane-container'>
        <section className='info-section pane-padding'>
          <div className='row'>
            <div className='col-2-3' onClick={() => this.setState({ hp: 0 })}>
              <HPCounter 
                maximum={this.props.hitPoints.get('maximum')}
                current={this.state.hp}
                temporary={this.state.temp}
              />
              {
                this.state.hp <= 0 ? this.renderDeathThrows() : null
              }
            </div>
            <div className='col-1-3' onClick={() => this.setState({ hp: this.props.hitPoints.get('maximum')})}>
              <div className='stat'>
                <h6>Armor Class</h6>
                <p>{this.props.armorClass.get('score')}</p>
              </div>
              <div className='stat'>
                <h6>Speed</h6>
                <p>{this.props.speed.get('score')}</p>
              </div>
              <div className='stat'>
                <h6>Initiative</h6>
                <p>{this.props.initiative.get('score')}</p>
              </div>
              <div className='stat'>
                <h6>Hit Dice</h6>
                <p>{`${this.props.hitPoints.get('hitDiceCurrent')} / ${this.props.hitPoints.get('hitDiceMaximum')}${this.props.hitPoints.get('hitDiceType')}`}</p>
              </div>
            </div>
          </div>
        </section>
        <section className='info-section pane-padding'>
          <div className='info-section-header'><h5>Saving Throws</h5></div>
          {this.renderSavingThrows()}
        </section>
        <section className='info-section pane-padding'>
          <div className='info-section-header interactable' onClick={() => this.setState({ create: true })}>
            <h5 className='info-section-title'>Resistances</h5>
            <p className='info-section-addon'><Icon icon='fa fa-plus'/></p>
            <CreateResistance active={this.state.create} onCancel={() => this.setState({ create: false })} onCreate={this.props.handleDefenseChange} />
          </div>
          {this.renderResistances()}
        </section>
      </div>
    )
  }
})
