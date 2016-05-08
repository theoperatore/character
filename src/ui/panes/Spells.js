'use strict';

import React from 'react';
import Spell from '../composite-components/Spell';
import AttackBonusItem from '../composite-components/AttackBonusItem';
import SpellSlotsModal from '../dialogs/spells/spell-slots/edit';
import Icon from '../components/Icon';

export default React.createClass({
  displayName: "PaneSpells",

  propTypes: {
    spells: React.PropTypes.object.isRequired,
    spellDC: React.PropTypes.object.isRequired,
    bubbles: React.PropTypes.object.isRequired,
    handleSpellsChange: React.PropTypes.func.isRequired,
  },


  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.bubbles !== nextProps.bubbles ||
      this.props.spellDC !== nextProps.spellDC ||
      this.props.spells !== nextProps.spells ||
      this.state.flattenedSpells !== nextState.flattenedSpells ||
      this.state.viewSpellSlots !== nextState.viewSpellSlots
    )
  },


  getInitialState() {
    return {
      flattenedSpells: [],
      viewSpellSlots: false,
    }
  },


  componentWillReceiveProps(nextProps) {
    let flattenedSpells = nextProps.spells.toJS().reduce((flattened, level, levelId) => {
      level.spells.forEach(spell => {
        flattened.push(
          Object.assign(
            { levelId },
            spell)
        );
      })
      return flattened;
    }, []);

    this.setState({ flattenedSpells });
  },


  // renderSpellDC() {
  //   var subtitle = this.props.spellDC.get('abil') + (this.props.spellDC.get('prof') ? ' + prof' : '');
  //   var score = 10;

  //   // score += this.props.abilities.get(this.props.spellDC.get('abil')).get('mod');
  //   // score += this.props.spellDC.get('prof') ? this.props.proficiencyBonus.get('score') : 0;

  //   return (
  //     <ListItem score={score + ""} name={this.props.spellDC.get('name')} />
  //   )
  // },


  // renderBubbles : function() {
  //   return this.props.bubbles.toJS().map((bubble, i) => {
  //     var width = this.props.bubbles.size > 3 ? 3 : this.props.bubbles.size;
  //     var subtitle = bubble.abil + (bubble.prof ? " + prof" : "");
  //     var score = 0;

  //     score += this.props.abilities.get(bubble.abil).get('mod');
  //     score += bubble.prof ? this.props.proficiencyBonus.get('score') : 0;

  //     return (
  //       <ListItem key={i} name={bubble.name} />
  //     )
  //   }, this)
  // },


  // renderSpellSlots : function() {
  //   return this.props.spells.toJS().slice(1).map((level, i) => {
  //     var slots = [];

  //     for (var idx = 0; idx < level.slots; idx++) {
  //       slots.push(
  //         <Switch active={idx < level.used} key={idx} width={10}/>
  //       )
  //     }

  //     return (
  //       <section key={i} className='pane-section pane-border'>
  //         <p className='text-center'>{level.name + " level spell slots"}</p>
  //         {slots}
  //       </section>
  //     )
  //   })
  // },

  onSpellDCChange(event) {
    let updatedEvent = Object.assign({}, event, {
      type: 'SPELL_DC_EDIT'
    });

    this.props.handleSpellsChange(updatedEvent);
  },

  renderSpellDC() {
    return <AttackBonusItem
      removable={false}
      id={this.props.spellDC.get('id')}
      score={this.props.spellDC.get('score')}
      ability={this.props.spellDC.get('abil')}
      proficient={this.props.spellDC.get('prof')}
      bonus={this.props.spellDC.get('bonus')}
      title={this.props.spellDC.get('name')}
      onChange={this.onSpellDCChange}
    />
  },


  renderSpellSlots() {
    return this.props.spells.toJS()
      .slice(1)
      .map((level, i) => {
      return (
        <div className='spell-slots-item' key={i}>
          <p className='spell-slots-title'>{`lvl ${i + 1}`}</p>
          <p className='spell-slots-count'>{level.slots - level.used}</p>
        </div>
      )
    })
  },


  renderSpells() {
    return this.state.flattenedSpells.map(spell => {
      return (<Spell 
        key={spell.id}
        spell={spell}
        spellLevel={spell.levelId}
      />)
    })
  },


  render() {

    return (
      <div className="pane-container">
        <section className='info-section'>
          <div className='info-section-header interactable'>
            <h5 className='info-section-title'>Spellcasting Bonuses</h5>
            <p className='info-section-addon'><Icon icon='fa fa-plus'/></p>
          </div>
          { this.renderSpellDC() }
        </section>
        <section className='info-section'>
          <div className='info-section-header interactable'>
            <h5 className='info-section-title'>Spells</h5>
            <p className='info-section-addon'><Icon icon='fa fa-plus'/></p>
          </div>
          <div className='spell-slots-container' onClick={() => this.setState({ viewSpellSlots: true })}>
            { this.renderSpellSlots() }
          </div>
          <div className='spells-container'>
            { this.renderSpells() }
          </div>
        </section>
        <SpellSlotsModal
          slots={this.props.spells.toJS()}
          active={this.state.viewSpellSlots}
          onDismiss={() => this.setState({ viewSpellSlots: false })}
          onSpellSlotsChange={this.props.handleSpellsChange}
        />
      </div>
    );
  }
})
