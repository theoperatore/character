'use strict';

import React from 'react';
import Immutable from 'immutable';
import SkillItem from '../containers/SkillItem';
import Modal from '../components/Modal';
import EditScores from '../dialogs/abilities/EditAbilityScoresDialog';

export default React.createClass({
  displayName: 'AbilitiesPane',


  getInitialState() {
    return {
      sort: 'a-z',
      editScores: false
    }
  },


  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.abilities !== nextProps.abilities ||
      this.props.skills !== nextProps.skills ||
      this.props.proficiencyBonus !== nextProps.proficiencyBonus ||
      this.props.passivePerception !== nextProps.passivePerception ||
      this.state.sort !== nextState.sort ||
      this.state.editScores !== nextState.editScore
    );
  },


  sortData(data) {
    switch (this.state.sort) {
      case 'a-z':
        return data;
      case 'asc':
        return data.sort((x, y) => x.score - y.score);
      case 'desc':
        return data.sort((x, y) => y.score - x.score);
      default:
        return data;
    }
  },


  changeSort(option) {
    this.setState({ sort: option });
  },


  handleEditScoresDismiss() {
    this.refs.editScores.confirm().then(answer => {
      if (answer === 'yes') {
        this.setState({ editScores: false });
      }
    })
  },


  handleScoreEdit(event) {
    this.setState({ editScores: false });
    this.props.handleAbilityChange(event);
  },


  createEditContent() {
    return <EditScores 
        ref='editScores'
        onSave={this.handleScoreEdit} 
        abilities={this.props.abilities}
        proficiency={this.props.proficiencyBonus}
      />
  },


  renderSkills() {
    let maxScore = this.props.skills.toJS().reduce((max, skill) => Math.max(max, skill.score), 0);
    let data = this.sortData(this.props.skills.toJS())

    maxScore = maxScore === 0
      ? 1
      : maxScore;

    return data.map((skill, i) => {
      return <SkillItem 
        key={i}
        name={skill.name}
        score={skill.score}
        ability={skill.mod}
        trained={skill.trained}
        maxScore={maxScore}
        onSkillChange={this.props.handleAbilityChange}
      />;
    })
  },


  render() {
    let perceptionTrained = this.props.skills.find((value) => {
      return value.get('name') === 'Perception';
    }).get('trained');

    return (
      <div className="pane-container">
        <section className="info-section pane-padding interactable" onClick={() => { this.setState({ editScores: true })}}>
          <div className='info-section-header'>
            <h5 className='info-section-title'>Abilities</h5>
          </div>
          <div className='row text-center'>
            <div className='col-1-6 ability-stat-container'>
              <h6 className='ability-stat-title underline-str'>str</h6>
              <p className='ability-stat-mod'>{this.props.abilities.get('str').get('mod')}</p>
              <h6 className='ability-stat-score'>{this.props.abilities.get('str').get('score')}</h6>
            </div>
            <div className='col-1-6 ability-stat-container'>
              <h6 className='ability-stat-title underline-dex'>dex</h6>
              <p className='ability-stat-mod'>{this.props.abilities.get('dex').get('mod')}</p>
              <h6 className='ability-stat-score'>{this.props.abilities.get('dex').get('score')}</h6>
            </div>
            <div className='col-1-6 ability-stat-container'>
              <h6 className='ability-stat-title underline-con'>con</h6>
              <p className='ability-stat-mod'>{this.props.abilities.get('con').get('mod')}</p>
              <h6 className='ability-stat-score'>{this.props.abilities.get('con').get('score')}</h6>
            </div>
            <div className='col-1-6 ability-stat-container'>
              <h6 className='ability-stat-title underline-wis'>wis</h6>
              <p className='ability-stat-mod'>{this.props.abilities.get('wis').get('mod')}</p>
              <h6 className='ability-stat-score'>{this.props.abilities.get('wis').get('score')}</h6>
            </div>
            <div className='col-1-6 ability-stat-container'>
              <h6 className='ability-stat-title underline-int'>int</h6>
              <p className='ability-stat-mod'>{this.props.abilities.get('int').get('mod')}</p>
              <h6 className='ability-stat-score'>{this.props.abilities.get('int').get('score')}</h6>
            </div>
            <div className='col-1-6 ability-stat-container'>
              <h6 className='ability-stat-title underline-cha'>cha</h6>
              <p className='ability-stat-mod'>{this.props.abilities.get('cha').get('mod')}</p>
              <h6 className='ability-stat-score'>{this.props.abilities.get('cha').get('score')}</h6>
            </div>
          </div>
          <div className='row text-center mt4'>
            <div className='col-1-2 ability-stat-container'>
              <h6 className='ability-stat-title underline-proficient'>proficiency bonus</h6>
              <p className='ability-stat-mod'>{this.props.proficiencyBonus.get('score')}</p>
            </div>
            <div className={`col-1-2 ability-stat-container ${perceptionTrained ? 'proficient' : ''}`}>
              <h6 className='ability-stat-title'>passive perception</h6>
              <p className='ability-stat-mod'>{this.props.passivePerception.get('score')}</p>
            </div>
          </div>
          <Modal id='edit-ability-scores' active={this.state.editScores} content={this.createEditContent()} onDismiss={this.handleEditScoresDismiss}/>
        </section>
        
        <section className="info-section pane-padding">
          <div className='info-section-header'>
            <h5 className='info-section-title'>Skills &mdash; <span onClick={this.changeSort.bind(this, 'a-z')} className={`sort-link ${this.state.sort === 'a-z' ? 'active' : ''}`}>a-z</span> &middot; <span onClick={this.changeSort.bind(this, 'asc')} className={`sort-link ${this.state.sort === 'asc' ? 'active' : ''}`}>asc</span> &middot; <span onClick={this.changeSort.bind(this, 'desc')} className={`sort-link ${this.state.sort === 'desc' ? 'active' : ''}`}>desc</span></h5>
          </div>
          {this.renderSkills()}
        </section>
      </div>
    );
  }
})