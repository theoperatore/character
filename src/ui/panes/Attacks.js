'use strict';

import React from 'react';
import AttackBonusItem from '../containers/AttackBonusItem';
import AttackItem from '../containers/AttackItem';
import ClassChargeItem from '../containers/ClassChargeItem';
import CreateAttackDialog from '../dialogs/attacks/CreateAttackDialog';
import CreateAttackBonusDialog from '../dialogs/attacks/CreateAttackBonusDialog';
import Icon from '../components/Icon';
import ListItem from '../components/ListItem/v2';
import SegmentedProgressBar from '../components/SegmentedProgressBar';

export default React.createClass({
  displayName: 'PaneAttacks',


  shouldComponentUpdate(nextProps, nextState) {
      return (
        this.props.attacks !== nextProps.attacks ||
        this.props.charges !== nextProps.charges ||
        this.props.bubbles !== nextProps.bubbles ||
        this.state.createAttackBonus !== nextState.createAttackBonus ||
        this.state.createAttack !== nextState.createAttack
      )
  },


  getInitialState() {
    return {
      createAttackBonus: false,
      createAttack: false
    }
  },


  useClassCharge(id) {
    let event = {
      type: 'CLASS_CHARGE_DECREMENT',
      data: {
        id,
      },
    }
    this.props.handleAttacksChange(event);
  },


  renderAttackBonuses() {
    if (this.props.bubbles.size === 0) {
      return <p className='subtext text-center border-top'>Add an attack bonus by tapping on the 'plus' icon.<Icon icon='fa fa-level-up' /></p>
    }

    return this.props.bubbles.toJS().map((bonus, i) => {
      return <AttackBonusItem
        key={i}
        id={bonus.id}
        score={bonus.score}
        title={bonus.name}
        subtitle={`${bonus.abil}${bonus.prof ? ' - proficient' : ''}`}
        ability={bonus.abil}
        proficient={bonus.prof}
        bonus={bonus.bonus}
        onChange={this.props.handlePreferencesChange}
      />
    })
  },


  renderClassCharges() {
    return this.props.charges.toJS().map((charge, i) => {
      return <ClassChargeItem
        key={charge.id}
        id={charge.id}
        name={charge.name}
        charges={charge.charges}
        current={charge.current}
        onChange={this.props.handleAttacksChange}
      />
    })
  },


  renderAttacks() {
    if (this.props.attacks.size === 0) {
      return <p className='subtext text-center border-top'>Add an attack by tapping on the 'plus' icon.<Icon icon='fa fa-level-up' /></p>
    }

    return this.props.attacks.toJS().map((attack, i) => {
      return (
        <AttackItem
          key={i}
          name={attack.name}
          desc={attack.desc}
          id={attack.id}
          onChange={this.props.handleAttacksChange}
        />
      )
    })
  },


  render() {
    return (
      <div className="pane-container">
        <section className='info-section'>
          <div className='info-section-header interactable' onClick={() => this.setState({ createAttackBonus: true })}>
            <h5 className='info-section-title'>Attack Bonuses</h5>
            <p className='info-section-addon'><Icon icon='fa fa-plus'/></p>
            <CreateAttackBonusDialog active={this.state.createAttackBonus} dismiss={() => this.setState({ createAttackBonus: false })} onCreate={this.props.handlePreferencesChange}/>
          </div>
          {this.renderAttackBonuses()}
        </section>
        <section className='info-section'>
          {this.renderClassCharges()}
        </section>
        <section className='info-section'>
          <div className='info-section-header interactable' onClick={() => this.setState({ createAttack: true })}>
            <h5 className='info-section-title'>Attacks</h5>
            <p className='info-section-addon'><Icon icon='fa fa-plus'/></p>
            <CreateAttackDialog active={this.state.createAttack} dismiss={() => this.setState({ createAttack: false })} onCreate={this.props.handleAttacksChange}/>
          </div>
          {this.renderAttacks()}
        </section>
      </div>
    );
  }
})
