'use strict';

import React from 'react';
import ListItem from '../components/ListItem';
import Modal from '../components/Modal';

import EditProficiency from '../dialogs/info/proficiencies/edit';
import CreateProficiency from '../dialogs/info/proficiencies/create';

import EditLanguage from '../dialogs/info/languages/edit';
import CreateLanguage from '../dialogs/info/languages/create';

import TraitsDialog from '../dialogs/info/TraitsDialog';
import Icon from '../components/Icon';
import debug from 'debug';

const log = debug('logs:Info');

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
           (nextState.areYouSure !== this.state.areYouSure);
  },


  handleNewDismiss(modal) {
    let isModalDirty = this.refs[`${modal}Dialog`].isDirty();

    if (isModalDirty) {
      log(`${modal} is dirty...`);
      this.setState({ areYouSure: true });
    }
    else {
      log(`dismissing ${modal}`);
      this.setState({ [`${modal}Modal`]: false, areYouSure: false });
    }
  },


  openCreateDialog(type) {
    this.setState({ [`${type}Modal`]: true });
  },


  handleCreate(type, data) {
    this.setState({ [`${type}Modal`]: false });
    this.props.handleInfoChange(data);
  },


  renderTraits() {
    return this.state.traits.map((trait, i) => {
      let mc = <TraitsDialog name={trait.name} desc={this.props.traits.get(trait.id)} id={trait.id} onTraitChange={this.props.handleInfoChange} />;
      return (
        <ListItem key={i} title={trait.name} id={`traits-${i}`} modalContent={mc} />
      )
    })
  },


  renderProficiencies() {
    return this.props.proficiencies.get('proficiencies').toJS().map((prof, i) => {
      let mc = <EditProficiency name={prof.name} desc={prof.desc} id={`${i}`} onProficiencyChange={this.props.handleInfoChange} />;
      return (
        <ListItem key={i} title={prof.name} id={`proficiencies-${i}`} modalContent={mc} />
      )
    })
  },


  renderLanguages() {
    return this.props.proficiencies.get('languages').toJS().map((lang, i) => {
      let modalContent = <EditLanguage name={lang.name} desc={lang.desc} id={`${i}`} onLanguageChange={this.props.handleInfoChange} />;
      return (
        <ListItem key={i} title={lang.name} id={`languages-${i}`} modalContent={modalContent} />
      )
    })
  },


  handleYes() {
    this.setState({ 
      areYouSure: false,
      profModal: false,
      langModal: false 
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


  render() {

    let createProf = <CreateProficiency ref='profDialog' onCreate={this.handleCreate.bind(this, 'prof')} onCancel={this.handleNewDismiss.bind(this, 'prof')}/>;
    let createLang = <CreateLanguage ref='langDialog' onCreate={this.handleCreate.bind(this, 'lang')} onCancel={this.handleNewDismiss.bind(this, 'lang')}/>;

    return (
      <div className="pane-container">
        <section className='info-container'>
          <div className='level-container'>
            <h6>level</h6>
            <span className='level'>{this.props.info.get('level')}</span>
            <h6>{this.props.info.get('xp')}</h6>
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
            <p className='info-section-addon'><Icon icon='fa fa-plus' onClick={this.openCreateDialog.bind(this, 'prof')}/></p>
          </div>
          {this.renderProficiencies()}
          <Modal active={this.state.profModal} id='new-proficiency' content={createProf}  onDismiss={this.handleNewDismiss.bind(this, 'prof')}/>
        </section>
        <section className="info-section pane-padding">
          <div className='info-section-header'>
            <h3 className='info-section-title'>Languages</h3>
            <p className='info-section-addon'><Icon icon='fa fa-plus' onClick={this.openCreateDialog.bind(this, 'lang')}/></p>
          </div>
          {this.renderLanguages()}
          <Modal active={this.state.langModal} id='new-language' content={createLang}  onDismiss={this.handleNewDismiss.bind(this, 'lang')}/>
        </section>
        <Modal active={this.state.areYouSure} id='are-you-sure' content={this.areYouSureContent()} onDismiss={() => {}} />
      </div>
    );
  }
})
