'use strict';

var React = require('react/addons');
var Stat = require('../components/Stat');
var Panel = require('../components/Panel');
var Switch = require('../components/Switch');
var SpellCircle = require('../components/SpellCircle');
var SettingsWell = require('../components/SettingsWell');
var Glue = require('../components/Glue');

module.exports = React.createClass({
  displayName : "PaneSpells",


  getInitialState : function() {
    return ({
      selected : 9
    })
  },


  shouldComponentUpdate : function(nextProps, nextState) {
    return (
      this.props.bubbles !== nextProps.bubbles ||
      this.props.spellDC !== nextProps.spellDC ||
      this.props.spells !== nextProps.spells ||
      this.props.abilities !== nextProps.abilities ||
      this.props.proficiencyBonus !== nextProps.proficiencyBonus ||
      this.state.selected !== nextState.selected
    )
  },


  renderSpellDC : function() {
    var subtitle = this.props.spellDC.get('abil') + (this.props.spellDC.get('prof') ? ' + prof' : '');
    var score = 10;

    score += this.props.abilities.get(this.props.spellDC.get('abil')).get('mod');
    score += this.props.spellDC.get('prof') ? this.props.proficiencyBonus.get('score') : 0;

    return (
      <Stat title={this.props.spellDC.get('desc')} subtitle={subtitle} score={score} background={true} trained={this.props.spellDC.get('prof')} />
    )
  },


  renderBubbles : function() {
    return this.props.bubbles.toJS().map((bubble, i) => {
      var width = this.props.bubbles.size > 3 ? 3 : this.props.bubbles.size;
      var subtitle = bubble.abil + (bubble.prof ? " + prof" : "");
      var score = 0;

      score += this.props.abilities.get(bubble.abil).get('mod');
      score += bubble.prof ? this.props.proficiencyBonus.get('score') : 0;

      return (
        <Stat key={i} title={bubble.desc} subtitle={subtitle} width={width} score={score} background={true} trained={bubble.prof}/>
      )
    }, this)
  },


  renderSpellSlots : function() {
    return this.props.spells.toJS().slice(1).map((level, i) => {
      var slots = [];

      for (var idx = 0; idx < level.slots; idx++) {
        slots.push(
          <Switch active={idx < level.used} key={idx} width={10}/>
        )
      }

      return (
        <section key={i} className='pane-section pane-border'>
          <p className='text-center'>{level.name + " level spell slots"}</p>
          {slots}
        </section>
      )
    })
  },


  renderSpells : function(idx) {
    var level = this.props.spells.get(idx).toJS();
    var spells = level.spells.map((spell, j) => {
      return (
        <Panel key={j} header={spell.name}>
          <p><strong>CT: </strong><span>{spell.cast}</span></p>
          <p><strong>R: </strong><span>{spell.range}</span></p>
          <p><strong>CMP: </strong><span>{spell.cmp}</span></p>
          <p><strong>DUR: </strong><span>{spell.dur}</span></p>
          <p>{spell.desc}</p>
        </Panel>
      )
    })

    if (spells.length === 0) {
      return <span />
    }

    return (
      <Glue>
        {spells}
      </Glue>
    )
  },


  handleSpellSlotSelect : function(d, i) {
    this.setState({ selected : i });
  },


  render : function() {
    return (
      <div className="pane-container">
        <h3>Spells</h3>
        <section className='pane-section pane-border'>
          {this.renderSpellDC()}
          {this.renderBubbles()}
        </section>
        <section>
          <SpellCircle data={this.props.spells} onSpellSlotSelect={this.handleSpellSlotSelect}/>
          <SettingsWell open={this.state.selected === 0}>
            {this.renderSpells(1)}
          </SettingsWell>
          <SettingsWell open={this.state.selected === 1}>
            {this.renderSpells(2)}
          </SettingsWell>
          <SettingsWell open={this.state.selected === 2}>
            {this.renderSpells(3)}
          </SettingsWell>
          <SettingsWell open={this.state.selected === 3}>
            {this.renderSpells(4)}
          </SettingsWell>
          <SettingsWell open={this.state.selected === 4}>
            {this.renderSpells(5)}
          </SettingsWell>
          <SettingsWell open={this.state.selected === 5}>
            {this.renderSpells(6)}
          </SettingsWell>
          <SettingsWell open={this.state.selected === 6}>
            {this.renderSpells(7)}
          </SettingsWell>
          <SettingsWell open={this.state.selected === 7}>
            {this.renderSpells(8)}
          </SettingsWell>
          <SettingsWell open={this.state.selected === 8}>
            {this.renderSpells(9)}
          </SettingsWell>
          <SettingsWell open={this.state.selected === 9}>
            {this.renderSpells(0)}
          </SettingsWell>
        </section>
      </div>
    );
  }
})
