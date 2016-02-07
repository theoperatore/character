'use strict';

import React from 'react';
import AttackBonusItem from '../composite-components/AttackBonusItem';
import CreateAttackBonusDialog from '../dialogs/attacks/CreateAttackBonusDialog';
import Icon from '../components/Icon';
import ListItem from '../components/ListItem/v2';
import Switch from '../components/Switch';

export default React.createClass({
  displayName: 'PaneAttacks',


  shouldComponentUpdate(nextProps, nextState) {
      return (
        this.props.attacks !== nextProps.attacks ||
        this.props.charges !== nextProps.charges ||
        this.props.bubbles !== nextProps.bubbles ||
        this.state.createAttackBonus !== nextState.createAttackBonus
      )
  },


  getInitialState() {
    return {
      createAttackBonus: false
    }
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


  renderClassCharges : function() {
    return this.props.charges.toJS().map((charge, i) => {
      var charges = [];

      for (var idx = 0; idx < charge.charges; idx++) {
        charges.push(
          <Switch active={idx < charge.used} width={10} key={idx} />
        )
      }

      return (
        <section key={i} className='pane-section pane-border'>
          <p className='text-center'>{charge.display}</p>
          {charges}
        </section>
      )
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
        <section className='info-section pane-padding'>
          <div className='info-section-header interactable' onClick={() => this.setState({ createAttackBonus: true })}>
            <h5 className='info-section-title'>Attack Bonuses</h5>
            <p className='info-section-addon'><Icon icon='fa fa-plus'/></p>
            <CreateAttackBonusDialog active={this.state.createAttackBonus} dismiss={() => this.setState({ createAttackBonus: false })} onCreate={this.props.handlePreferencesChange}/>
          </div>
          {this.renderAttackBonuses()}
        </section>
        <section className='info-section pane-padding'>
          <div className='info-section-header'>
            <h5 className='info-section-title'>Attacks</h5>
          </div>
          {this.renderAttacks()}
        </section>
      </div>
    );
  }
})
