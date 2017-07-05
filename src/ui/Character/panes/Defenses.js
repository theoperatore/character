'use strict';

import {Component} from 'react';

import createReactClass from 'create-react-class';

import HPCounter from '../../components/HPCounter';
import Icon from '../../components/Icon';
import Button from '../../components/Button';
import SavingThrowItem from '../containers/SavingThrowItem';
import ResistanceItem from '../containers/ResistanceItem';
import CreateResistance from '../dialogs/defenses/resistances/create';
import RestDialog from '../dialogs/defenses/RestDialog';
import EditHpDialog from '../dialogs/defenses/EditHpDialog';
import EditDefenseStatDialog from '../dialogs/defenses/EditDefenseStatDialog';
import ManageHitDice from '../dialogs/defenses/ManageHitDice';

const savingThrowsOrder = ['str', 'dex', 'con', 'int', 'wis', 'cha'];

export default createReactClass({
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
      this.state.hpDialog !== nextState.hpDialog ||
      this.state.defenseDialog !== nextState.defenseDialog ||
      this.state.restDialog !== nextState.restDialog ||
      this.state.manageHitDice !== nextState.manageHitDice
    );
  },


  getInitialState() {
    return {
      create: false,
      hpDialog: false,
      defenseDialog: false,
      restDialog: false,
      manageHitDice: false,
    }
  },

  renderHitDice() {
    return this.props.hitPoints.get('hitDice')
      .map(hitDiceId => this.props.hitPoints.getIn(['hitDiceDefinitions', hitDiceId]))
      .map((hitDice, i) => {
        return <p key={i}>{`${hitDice.get('current')} / ${hitDice.get('maximum')} ${hitDice.get('type')}`}</p>
      });
  },


  renderSavingThrows() {
    return savingThrowsOrder.map((abilityKey, i) => {
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
    if (!this.props.resistances) return null;

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
            <div className='col-2-3'>
              <EditHpDialog
                active={this.state.hpDialog}
                dismiss={() => this.setState({ hpDialog: false })}
                onChange={this.props.handleDefenseChange}
              />
              <div className='hp-container' onClick={() => this.setState({ hpDialog: true })}>
                <HPCounter
                  maximum={this.props.hitPoints.get('maximum')}
                  current={this.props.hitPoints.get('current')}
                  temporary={this.props.hitPoints.get('temporary')}
                />
              </div>
              {
                this.props.hitPoints.get('current') <= 0 ? this.renderDeathThrows() : null
              }
            </div>
            <div className='col-1-3'>
              <div onClick={() => this.setState({ defenseDialog: true })} className='defenses-group interactable'>
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
              </div>
              <div className='defenses-group'>
                <div className='stat interactable' onClick={() => this.setState({ manageHitDice: true })}>
                  <h6>Hit Dice</h6>
                  { this.renderHitDice() }
                </div>
                <div className='stat rest'>
                  <Button onClick={() => this.setState({ restDialog: true })} style='blue' size='md'>Rest</Button>
                </div>
              </div>
              <ManageHitDice
                active={this.state.manageHitDice}
                onDismiss={() => this.setState({ manageHitDice: false })}
                hitDice={this.props.hitPoints.get('hitDice')}
                hitDiceDefinitions={this.props.hitPoints.get('hitDiceDefinitions')}
                onChange={this.props.handleDefenseChange}
              />
              <RestDialog
                active={this.state.restDialog}
                onDismiss={() => this.setState({ restDialog: false })}
                onChange={this.props.handleDefenseChange}
                hitDice={this.props.hitPoints.get('hitDice')}
                hitDiceDefinitions={this.props.hitPoints.get('hitDiceDefinitions')}
              />
              <EditDefenseStatDialog
                active={this.state.defenseDialog}
                dismiss={() => this.setState({ defenseDialog: false })}
                onChange={this.props.handleDefenseChange}
                hp={this.props.hitPoints.get('maximum')}
                armorClass={this.props.armorClass.get('score')}
                speed={this.props.speed.get('score')}
                initiative={this.props.initiative.get('bonus')}
              />
            </div>
          </div>
        </section>
        <section className='info-section pane-padding'>
          <div className='info-section-header'><h5 className='info-section-title'>Saving Throws</h5></div>
          {this.renderSavingThrows()}
        </section>
        <section className='info-section pane-padding'>
          <div className='info-section-header'>
            <h5 className='info-section-title'>Resistances</h5>
            <CreateResistance active={this.state.create} onCancel={() => this.setState({ create: false })} onCreate={this.props.handleDefenseChange} />
          </div>
          {this.renderResistances()}
          <p
            className='subtext text-center p2 interactable'
            onClick={() => this.setState({ create: true })}
          ><Icon icon='fa fa-plus' /> Create a new resistance</p>
        </section>
      </div>
    )
  }
});
