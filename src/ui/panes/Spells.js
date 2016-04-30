'use strict';

import React from 'react';
import Spell from '../composite-components/Spell';
import Icon from '../components/Icon';

export default React.createClass({
  displayName: "PaneSpells",


  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.bubbles !== nextProps.bubbles ||
      this.props.spellDC !== nextProps.spellDC ||
      this.props.spells !== nextProps.spells
    )
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


  renderSpells() {
    var levels = this.props.spells.toJS();

    return levels.reduce((flattened, level, levelIndex) => {
      level.spells.forEach(spell => {
        flattened.push(
          <Spell 
            key={spell.id}
            spell={spell}
            spellLevel={levelIndex}
          />
        );
      });

      return flattened;
    }, []);
  },


  render() {
    return (
      <div className="pane-container">
        <section className='info-section'>
          <div className='info-section-header interactable'>
            <h5 className='info-section-title'>Spells</h5>
            <p className='info-section-addon'><Icon icon='fa fa-plus'/></p>
          </div>
          { this.renderSpells() }
        </section>
      </div>
    );
  }
})
