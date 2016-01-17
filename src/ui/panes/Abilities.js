'use strict';

import React from 'react';
import Immutable from 'immutable';
// import Stat from '../components/Stat';
// import Shell from '../components/Shell';
import ListItem from '../components/ListItem';

export default React.createClass({
  displayName: 'AbilitiesPane',


  noop() {},

  renderSkills() {
    return this.props.skills.toJS().map((skill, i) => {
      return <ListItem 
        key={i}
        id={skill.name}
        title={skill.name}
        onDismiss={this.noop}
      />;
    })
    // var data = Immutable.fromJS(this.props.skills.toJS().map((skill) => {
    //   var score = 0;

    //   score += this.props.abilities.get(skill.mod).get('mod');
    //   score += skill.trained ? this.props.proficiencyBonus.get('score') : 0;

    //   return ({
    //     score : score,
    //     mod : skill.mod,
    //     name : skill.name
    //   })
    // }, this));

    // return <Shell data={data} />
    // return <p>List of Skills</p>
  },


  shouldComponentUpdate(nextProps) {
      return (
        this.props.abilities !== nextProps.abilities ||
        this.props.skills !== nextProps.skills ||
        this.props.proficiencyBonus !== nextProps.proficiencyBonus ||
        this.props.passivePerception !== nextProps.passivePerception
      );
  },


  handleStatChange(stat, data) {
    console.log(`value from ${stat} popover: ${data}`);
  },


  render() {
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
        <section className="info-section pane-padding text-center">
          <div className='row'>
            <div className='col-2-3 separate-right'>
              <div className='row'>
                <div className='col-1-3 ability-stat-container'>
                  <h6 className='ability-stat-title'>str <span className='ability-badge bg-str'></span></h6>
                  <p className='ability-stat-mod'>{this.props.abilities.get('str').get('mod')}</p>
                  <h6 className='ability-stat-score'>{this.props.abilities.get('str').get('score')}</h6>
                </div>
                <div className='col-1-3 ability-stat-container'>
                  <h6 className='ability-stat-title'>dex <span className='ability-badge bg-dex'></span></h6>
                  <p className='ability-stat-mod'>{this.props.abilities.get('dex').get('mod')}</p>
                  <h6 className='ability-stat-score'>{this.props.abilities.get('dex').get('score')}</h6>
                </div>
                <div className='col-1-3 ability-stat-container'>
                  <h6 className='ability-stat-title'>con <span className='ability-badge bg-con'></span></h6>
                  <p className='ability-stat-mod'>{this.props.abilities.get('con').get('mod')}</p>
                  <h6 className='ability-stat-score'>{this.props.abilities.get('con').get('score')}</h6>
                </div>
              </div>
              <div className='row'>
                <div className='col-1-3 ability-stat-container'>
                  <h6 className='ability-stat-title'>wis <span className='ability-badge bg-wis'></span></h6>
                  <p className='ability-stat-mod'>{this.props.abilities.get('wis').get('mod')}</p>
                  <h6 className='ability-stat-score'>{this.props.abilities.get('wis').get('score')}</h6>
                </div>
                <div className='col-1-3 ability-stat-container'>
                  <h6 className='ability-stat-title'>int <span className='ability-badge bg-int'></span></h6>
                  <p className='ability-stat-mod'>{this.props.abilities.get('int').get('mod')}</p>
                  <h6 className='ability-stat-score'>{this.props.abilities.get('int').get('score')}</h6>
                </div>
                <div className='col-1-3 ability-stat-container'>
                  <h6 className='ability-stat-title'>cha <span className='ability-badge bg-cha'></span></h6>
                  <p className='ability-stat-mod'>{this.props.abilities.get('cha').get('mod')}</p>
                  <h6 className='ability-stat-score'>{this.props.abilities.get('cha').get('score')}</h6>
                </div>
              </div>
            </div>
            <div className='col-1-3'>
              <div className='row'>
                <div className='col-1-1 ability-stat-container'>
                  <h6 className='ability-stat-title'>proficiency bonus</h6>
                  <p className='ability-stat-mod'>{this.props.proficiencyBonus.get('score')}</p>
                </div>
              </div>
              <div className='row'>
                <div className='col-1-1 ability-stat-container'>
                  <h6 className='ability-stat-title'>passive perception</h6>
                  <p className='ability-stat-mod'>{this.props.passivePerception.get('score')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="info-section pane-padding">
          <div className='info-section-header'>
            
          </div>
          {this.renderSkills()}
        </section>
      </div>
    );
  }
})

/*

<h3 className='info-section-title'>Skills</h3>
<Stat onPopoverChange={this.handleStatChange.bind(this, 'STR')} title={'STR'} score={this.props.abilities.get('str').get('mod')} subtitle={this.props.abilities.get('str').get('score')} width={3} background={true} trained={true} color='green'/>
<Stat onPopoverChange={this.handleStatChange.bind(this, 'DEX')} title={'DEX'} score={this.props.abilities.get('dex').get('mod')} subtitle={this.props.abilities.get('dex').get('score')} width={3} background={true} trained={true} color='green'/>
<Stat onPopoverChange={this.handleStatChange.bind(this, 'CON')} title={'CON'} score={this.props.abilities.get('con').get('mod')} subtitle={this.props.abilities.get('con').get('score')} width={3} background={true} trained={true} color='green'/>
<Stat onPopoverChange={this.handleStatChange.bind(this, 'INT')} title={'INT'} score={this.props.abilities.get('int').get('mod')} subtitle={this.props.abilities.get('int').get('score')} width={3} background={true} trained={true} color='green'/>
<Stat onPopoverChange={this.handleStatChange.bind(this, 'WIS')} title={'WIS'} score={this.props.abilities.get('wis').get('mod')} subtitle={this.props.abilities.get('wis').get('score')} width={3} background={true} trained={true} color='green'/>
<Stat onPopoverChange={this.handleStatChange.bind(this, 'CHA')} title={'CHA'} score={this.props.abilities.get('cha').get('mod')} subtitle={this.props.abilities.get('cha').get('score')} width={3} background={true} trained={true} color='green'/>

<section className="info-section pane-border">
  <Stat title={'Proficiency Bonus'} score={this.props.proficiencyBonus.get('score')} width={2} background={true} trained={true} />
  <Stat title={'Passive Perception'} score={passivePerception} width={2} background={true} trained={trained} />
</section>



*/