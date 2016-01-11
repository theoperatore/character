'use strict';

import React from 'react';
import ListItem from '../components/ListItem';
import Modal from '../components/Modal';

import EditProficiency from '../dialogs/info/proficiencies/edit';
import CreateProficiency from '../dialogs/info/proficiencies/create';

import EditLanguage from '../dialogs/info/languages/edit';
import CreateLanguage from '../dialogs/info/languages/create';

import TraitsDialog from '../dialogs/info/TraitsDialog';
import LevelXpDialog from '../dialogs/info/LevelXPDialog';
import Icon from '../components/Icon';
import debug from 'debug';

const log = debug('app:Info');

module.exports = React.createClass({
  displayName : 'PaneInfo',


  getInitialState : function() {
    return ({
      traits: [
        { id: 'personalityTraits', name: 'Personality' }, 
        { id: 'ideals', name: 'Ideals' }, 
        { id: 'bonds', name: 'Bonds' }, 
        { id: 'flaws', name: 'Flaws' }
      ],
      profModal: false,
      langModal: false,
      levelXpModal: false,
      areYouSure: false
    })
  },


  // only update when the info character data changes
  shouldComponentUpdate : function(nextProps, nextState) {
    return (nextProps.info !== this.props.info) ||
           (nextProps.traits !== this.props.traits) ||
           (nextProps.proficiencies !== this.props.proficiencies) ||
           (nextState.profModal !== this.state.profModal) ||
           (nextState.langModal !== this.state.langModal) ||
           (nextState.levelXpModal !== this.state.levelXpModal) ||
           (nextState.areYouSure !== this.state.areYouSure);
  },


  handleNewDismiss(modal) {
    let isModalDirty = this.refs[`${modal}Dialog`].isDirty();

    if (isModalDirty) {
      this.setState({ areYouSure: true });
    }
    else {
      this.setState({ [`${modal}Modal`]: false, areYouSure: false });
    }
  },


  openDialog(type) {
    this.setState({ [`${type}Modal`]: true });
  },


  handleCreate(type, data) {
    this.setState({ [`${type}Modal`]: false });
    this.props.handleInfoChange(data);
  },


  handleChange(refId, event) {
    log(refId, event);
    if (event.type.indexOf('DELETE') !== -1) {
      this.refs[refId].dismiss();
    }
    this.props.handleInfoChange(event);
  },


  handleLevelXpChange(event) {
    this.setState({ levelXpModal: false });
    this.props.handleInfoChange(event);
  },


  // function called by the ListItem to check whether or not to show the
  // areYouSure dialog.
  handleDirtyCheck(refId) {
    return this.refs[refId].isDirty();
  },


  renderTraits() {
    return this.state.traits.map((trait, i) => {
      let mc = <TraitsDialog ref={`traits-${i}`} name={trait.name} desc={this.props.traits.get(trait.id)} id={trait.id} onTraitChange={this.props.handleInfoChange} />;
      return (
        <ListItem key={trait.id} title={trait.name} id={`traits-${i}`} modalContent={mc} onDismiss={this.handleDirtyCheck.bind(this, `traits-${i}`)}/>
      )
    })
  },


  renderProficiencies() {
    return this.props.proficiencies.get('proficiencies').toJS().map((prof, i) => {
      let mc = <EditProficiency ref={`profs-${i}`} name={prof.name} desc={prof.desc} id={`${i}`} onProficiencyChange={this.handleChange.bind(this, `prof-${i}`)} />;
      return (
        <ListItem ref={`prof-${i}`} key={i} title={prof.name} id={`proficiencies-${i}`} modalContent={mc} onDismiss={this.handleDirtyCheck.bind(this, `profs-${i}`)}/>
      )
    })
  },


  renderLanguages() {
    return this.props.proficiencies.get('languages').toJS().map((lang, i) => {
      let modalContent = <EditLanguage ref={`langs-${i}`} name={lang.name} desc={lang.desc} id={`${i}`} onLanguageChange={this.handleChange.bind(this, `lang-${i}`)} />;
      return (
        <ListItem ref={`lang-${i}`} key={i} title={lang.name} id={`languages-${i}`} modalContent={modalContent} onDismiss={this.handleDirtyCheck.bind(this, `langs-${i}`)}/>
      )
    })
  },


  handleYes() {
    this.setState({ 
      areYouSure: false,
      profModal: false,
      langModal: false,
      levelXpModal: false
    });
  },


  handleNo() {
    this.setState({ areYouSure: false });
  },


  areYouSureContent() {
    return (
      <section>
        <div className='modal-header'>  
          <h3>Are You Sure?</h3>
        </div>
        <div className='modal-content'>
          <p>Do you really want to cancel and lose any unsaved changes?</p>
        </div>
        <div className='modal-footer'>
          <button onClick={this.handleYes} className='bg-green text-green'>
            <p>Yes</p>
          </button>
          <button onClick={this.handleNo} className='bg-red text-red'>
            <p>No</p>
          </button>
        </div>
      </section>
    )
  },


  buildLevelDialog() {
    return (
      <LevelXpDialog 
        ref='levelXpDialog' 
        currLevel={this.props.info.get('level')} 
        currXp={this.props.info.get('xp')}
        currRace={this.props.info.get('race')}
        currClass={this.props.info.get('class')}
        currAlign={this.props.info.get('alignment')}
        currBackground={this.props.info.get('background')}
        onSave={this.handleLevelXpChange} 
        onCancel={this.handleNewDismiss.bind(this, 'levelXp')} 
      />
    )
  },


  render() {
    let createProf = <CreateProficiency ref='profDialog' onCreate={this.handleCreate.bind(this, 'prof')} onCancel={this.handleNewDismiss.bind(this, 'prof')}/>;
    let createLang = <CreateLanguage ref='langDialog' onCreate={this.handleCreate.bind(this, 'lang')} onCancel={this.handleNewDismiss.bind(this, 'lang')}/>;

    return (
      <div className="pane-container">
        <section className='info-container' onClick={this.openDialog.bind(this, 'levelXp')}>
          <div className='level-container'>
            <h6>level</h6>
            <span className='level'>{this.props.info.get('level')}</span>
            <h6>{this.props.info.get('xp')}</h6>
            <Modal active={this.state.levelXpModal} id='edit-level-xp' content={this.buildLevelDialog()} onDismiss={this.handleNewDismiss.bind(this, 'levelXp')} />
          </div>
          <div className='info-stat-group'>
            <div className='info-stat'>
              <span className='header'>class</span>
              <p className='content'>{this.props.info.get('class')}</p>
            </div>
            <div className='info-stat'>
              <span className='header'>race</span>
              <p className='content'>{this.props.info.get('race')}</p>
            </div>
            <div className='info-stat'>
              <span className='header'>alignment</span>
              <p className='content'>{this.props.info.get('alignment')}</p>
            </div>
            <div className='info-stat'>
              <span className='header'>background</span>
              <p className='content'>{this.props.info.get('background')}</p>
            </div>
          </div>
        </section> 
        <section className="info-section pane-padding">
          <div className='info-section-header'>
            <h3 className='info-section-title'>Traits</h3>
          </div>
          {this.renderTraits()}
        </section>
        <section className="info-section pane-padding">
          <div className='info-section-header'>
            <h3 className='info-section-title'>Proficiencies</h3>
            <p className='info-section-addon'><Icon icon='fa fa-plus' onClick={this.openDialog.bind(this, 'prof')}/></p>
          </div>
          {this.renderProficiencies()}
          <Modal active={this.state.profModal} id='new-proficiency' content={createProf}  onDismiss={this.handleNewDismiss.bind(this, 'prof')}/>
        </section>
        <section className="info-section pane-padding">
          <div className='info-section-header'>
            <h3 className='info-section-title'>Languages</h3>
            <p className='info-section-addon'><Icon icon='fa fa-plus' onClick={this.openDialog.bind(this, 'lang')}/></p>
          </div>
          {this.renderLanguages()}
          <Modal active={this.state.langModal} id='new-language' content={createLang}  onDismiss={this.handleNewDismiss.bind(this, 'lang')}/>
        </section>
        <Modal active={this.state.areYouSure} id='are-you-sure' content={this.areYouSureContent()} onDismiss={() => {}} />
      </div>
    );
  }
})
