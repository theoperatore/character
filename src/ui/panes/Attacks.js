'use strict';

var React = require('react/addons');
var Panel = require('../components/Panel');
var Stat = require('../components/Stat');
var Switch = require('../components/Switch');

module.exports = React.createClass({
  displayName : 'PaneAttacks',


  shouldComponentUpdate : function(nextProps) {
      return (
        this.props.attacks !== nextProps.attacks ||
        this.props.charges !== nextProps.charges ||
        this.props.abilities !== nextProps.abilities ||
        this.props.proficiencyBonus !== nextProps.proficiencyBonus ||
        this.props.bubbles !== nextProps.bubbles
      )
  },


  renderAttackBubbles : function() {
    var width = this.props.bubbles.size > 3 ? 3 : this.props.bubbles.size;

    var bubbles = this.props.bubbles.toJS().map((bubble, i) => {
      var score = 0;
      var subtitle = bubble.abil;

      score += this.props.abilities.get(bubble.abil).get('mod');
      score += bubble.prof ? this.props.proficiencyBonus.get('score') : 0;

      subtitle += bubble.prof ? " + prof" : "";

      return (<Stat title={bubble.desc} subtitle={subtitle} width={width} score={score} background={true} trained={bubble.prof} key={i} />);
    })

    return (
      <section className="pane-section pane-border">
        {bubbles}
      </section>
    )
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


  renderAttacks : function() {
    return this.props.attacks.toJS().map((attack, i) => {
      return (
        <Panel key={i} header={attack.name}>
          <p>{attack.desc}</p>
        </Panel>
      )
    })
  },


  render : function() {
    return (
      <div className="pane-container">
        <h3>Attacks</h3>
        {this.renderAttackBubbles()}
        {this.renderClassCharges()}
        {this.renderAttacks()}
      </div>
    );
  }
})
