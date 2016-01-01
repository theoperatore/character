'use strict';

var React = require('react');
var Immutable = require('immutable');
var Stat = require('../components/Stat');
var Shell = require('../components/Shell');

module.exports = React.createClass({

  renderSkills : function() {
    var data = Immutable.fromJS(this.props.skills.toJS().map((skill) => {
      var score = 0;

      score += this.props.abilities.get(skill.mod).get('mod');
      score += skill.trained ? this.props.proficiencyBonus.get('score') : 0;

      return ({
        score : score,
        mod : skill.mod,
        name : skill.name
      })
    }, this));

    return <Shell data={data} />
  },


  shouldComponentUpdate : function(nextProps) {
      return (
        this.props.abilities !== nextProps.abilities ||
        this.props.skills !== nextProps.skills ||
        this.props.proficiencyBonus !== nextProps.proficiencyBonus ||
        this.props.passivePerception !== nextProps.passivePerception
      );
  },


  handleStatChange : function(stat, data) {
    console.log(`value from ${stat} popover: ${data}`);
  },


  render : function() {
    var trained = false;
    var passivePerception = 0;
    var perception = this.props.skills.find((value) => {
      return value.get('name') === 'Perception';
    });

    // this shouldn't be calculated here...it should be calculated by the user
    trained = perception.get('trained');
    passivePerception += trained ? this.props.proficiencyBonus.get('score') : 0;
    passivePerception += this.props.abilities.get(perception.get('mod')).get('mod');
    passivePerception += 10;

    return (
      <div className="pane-container">
        <h3>Ability Scores</h3>
        <section className="pane-section pane-border">
          <Stat onPopoverChange={this.handleStatChange.bind(this, 'STR')} title={'STR'} score={this.props.abilities.get('str').get('mod')} subtitle={this.props.abilities.get('str').get('score')} width={3} background={true} trained={true} color='green'/>
          <Stat onPopoverChange={this.handleStatChange.bind(this, 'DEX')} title={'DEX'} score={this.props.abilities.get('dex').get('mod')} subtitle={this.props.abilities.get('dex').get('score')} width={3} background={true} trained={true} color='green'/>
          <Stat onPopoverChange={this.handleStatChange.bind(this, 'CON')} title={'CON'} score={this.props.abilities.get('con').get('mod')} subtitle={this.props.abilities.get('con').get('score')} width={3} background={true} trained={true} color='green'/>
          <Stat onPopoverChange={this.handleStatChange.bind(this, 'INT')} title={'INT'} score={this.props.abilities.get('int').get('mod')} subtitle={this.props.abilities.get('int').get('score')} width={3} background={true} trained={true} color='green'/>
          <Stat onPopoverChange={this.handleStatChange.bind(this, 'WIS')} title={'WIS'} score={this.props.abilities.get('wis').get('mod')} subtitle={this.props.abilities.get('wis').get('score')} width={3} background={true} trained={true} color='green'/>
          <Stat onPopoverChange={this.handleStatChange.bind(this, 'CHA')} title={'CHA'} score={this.props.abilities.get('cha').get('mod')} subtitle={this.props.abilities.get('cha').get('score')} width={3} background={true} trained={true} color='green'/>
        </section>
        <section className="pane-section pane-border">
          <Stat title={'Proficiency Bonus'} score={this.props.proficiencyBonus.get('score')} width={2} background={true} trained={true} />
          <Stat title={'Passive Perception'} score={passivePerception} width={2} background={true} trained={trained} />
        </section>
        <h3>Skills</h3>
        <section className="pane-section pane-padding">
          {this.renderSkills()}
        </section>
      </div>
    );
  }
})
