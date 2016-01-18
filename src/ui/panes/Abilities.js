'use strict';

import React from 'react';
import Immutable from 'immutable';
import SkillItem from '../components/SkillItem';

export default React.createClass({
  displayName: 'AbilitiesPane',


  getInitialState() {
    return {
      sort: 'default'
    }
  },


  sortData(data) {

  },


  renderSkills() {
    let maxScore = this.props.skills.toJS().reduce((max, skill) => Math.max(max, skill.score), 0);

    return this.props.skills.toJS().map((skill, i) => {
      return <SkillItem 
        key={i}
        name={skill.name}
        score={skill.score}
        ability={skill.mod}
        trained={skill.trained}
        maxScore={maxScore}
      />;
    })
  },


  shouldComponentUpdate(nextProps, nextState) {
      return (
        this.props.abilities !== nextProps.abilities ||
        this.props.skills !== nextProps.skills ||
        this.props.proficiencyBonus !== nextProps.proficiencyBonus ||
        this.props.passivePerception !== nextProps.passivePerception ||
        this.state.sort !== nextState.sort
      );
  },


  changeSort(option) {
    this.setState({ sort: option });
  },


  render() {
    // var trained = false;
    // var passivePerception = 0;
    // var perception = this.props.skills.find((value) => {
    //   return value.get('name') === 'Perception';
    // });

    // // this shouldn't be calculated here...it should be calculated by the user
    // trained = perception.get('trained');
    // passivePerception += trained ? this.props.proficiencyBonus.get('score') : 0;
    // passivePerception += this.props.abilities.get(perception.get('mod')).get('mod');
    // passivePerception += 10;
    // <span className='ability-badge bg-str'>

    return (
      <div className="pane-container">
        <section className="info-section pane-padding text-center">
          
            <div className='row'>
              <div className='col-1-4 ability-stat-container'>
                <h6 className='ability-stat-title underline-str'>str</h6>
                <p className='ability-stat-mod'>{this.props.abilities.get('str').get('mod')}</p>
                <h6 className='ability-stat-score'>{this.props.abilities.get('str').get('score')}</h6>
              </div>
              <div className='col-1-4 ability-stat-container'>
                <h6 className='ability-stat-title underline-dex'>dex</h6>
                <p className='ability-stat-mod'>{this.props.abilities.get('dex').get('mod')}</p>
                <h6 className='ability-stat-score'>{this.props.abilities.get('dex').get('score')}</h6>
              </div>
              <div className='col-1-4 ability-stat-container separate-right'>
                <h6 className='ability-stat-title underline-con'>con</h6>
                <p className='ability-stat-mod'>{this.props.abilities.get('con').get('mod')}</p>
                <h6 className='ability-stat-score'>{this.props.abilities.get('con').get('score')}</h6>
              </div>
              <div className='col-1-4 ability-stat-container'>
                <h6 className='ability-stat-title underline-proficient'>proficiency bonus</h6>
                <p className='ability-stat-mod'>{this.props.proficiencyBonus.get('score')}</p>
              </div>
            </div>
            <div className='row'>
              <div className='col-1-4 ability-stat-container'>
                <h6 className='ability-stat-title underline-wis'>wis</h6>
                <p className='ability-stat-mod'>{this.props.abilities.get('wis').get('mod')}</p>
                <h6 className='ability-stat-score'>{this.props.abilities.get('wis').get('score')}</h6>
              </div>
              <div className='col-1-4 ability-stat-container'>
                <h6 className='ability-stat-title underline-int'>int</h6>
                <p className='ability-stat-mod'>{this.props.abilities.get('int').get('mod')}</p>
                <h6 className='ability-stat-score'>{this.props.abilities.get('int').get('score')}</h6>
              </div>
              <div className='col-1-4 ability-stat-container separate-right'>
                <h6 className='ability-stat-title underline-cha'>cha</h6>
                <p className='ability-stat-mod'>{this.props.abilities.get('cha').get('mod')}</p>
                <h6 className='ability-stat-score'>{this.props.abilities.get('cha').get('score')}</h6>
              </div>
              <div className='col-1-4 ability-stat-container'>
                <h6 className='ability-stat-title'>passive perception</h6>
                <p className='ability-stat-mod'>{this.props.passivePerception.get('score')}</p>
              </div>
            </div>

        </section>
        
        <section className="info-section pane-padding">
          <div className='info-section-header'>
            <h6>Skills</h6>
          </div>
          {this.renderSkills()}
        </section>
      </div>
    );
  }
})