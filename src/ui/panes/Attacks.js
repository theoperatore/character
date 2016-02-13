'use strict';

import React from 'react';
import AttackBonusItem from '../composite-components/AttackBonusItem';
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
      type: 'CLASS_CHARGE_USE',
      data: id
    }
    this.props.handleAttacksChange(event);
  },


  renderAttackBonuses() {
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
      return <div onClick={this.useClassCharge.bind(this, charge.id)} className='class-charges-container' key={i}>
        <h6>{charge.name}<small>{charge.current}/{charge.charges}</small></h6>
        <SegmentedProgressBar segments={charge.charges} current={charge.current} />
      </div>
    })
  },


  renderAttacks() {
    return this.props.attacks.toJS().map((attack, i) => {
      return (
        <ListItem
          key={i}
          name={attack.name}
          glyph={<Icon icon='icon-attack' />}
          glyphCss={'text-attack'}
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
          {
            this.props.charges.size === 0 ? null :
            <div className='info-section-header'>
              <h5 className='info-section-title'>Class Charges</h5>
            </div>
          }
          {this.renderClassCharges()}
        </section>
        <section className='info-section'>
          <div className='info-section-header interactable' onClick={() => this.setState({ createAttack: true })}>
            <h5 className='info-section-title'>Attacks</h5>
            <p className='info-section-addon'><Icon icon='fa fa-plus'/></p>
            <CreateAttackDialog active={this.state.createAttack} dismiss={() => this.setState({ createAttack: false })} onCreate={this.props.handleAttacksChange}/>
          </div>
        </section>
      </div>
    );
  }
})
