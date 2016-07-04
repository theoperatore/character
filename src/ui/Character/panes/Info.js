'use strict';

import React from 'react';
import { Map, List } from 'immutable';
import ListItem from '../../components/ListItem';
import Modal from '../../components/Modal';

import EditProficiency from '../dialogs/info/proficiencies/edit';
import CreateProficiency from '../dialogs/info/proficiencies/create';

import EditLanguage from '../dialogs/info/languages/edit';
import CreateLanguage from '../dialogs/info/languages/create';

import TraitsDialog from '../dialogs/info/TraitsDialog';
import LevelXpDialog from '../dialogs/info/LevelXPDialog';
import ConfirmModal from '../dialogs/ConfirmModal';
import Icon from '../../components/Icon';
import debug from 'debug';

const log = debug('app:Info');

export default React.createClass({
  displayName: 'PaneInfo',

  getInitialState() {
    return ({
      traits: [
        { id: 'personalityTraits', name: 'Personality' },
        { id: 'ideals', name: 'Ideals' },
        { id: 'bonds', name: 'Bonds' },
        { id: 'flaws', name: 'Flaws' }
      ],
      personalityTraits: false, // for edit modal
      ideals: false, // for edit modal
      bonds: false, // for edit modal
      flaws: false, // for edit modal
      profModal: false,
      langModal: false,
      levelXpModal: false,
      areYouSure: false
    })
  },

  // only update when the info character data changes
  shouldComponentUpdate : function(nextProps, nextState) {
    return nextProps.info !== this.props.info ||
           nextProps.traits !== this.props.traits ||
           nextProps.proficiencies !== this.props.proficiencies ||
           nextState.profModal !== this.state.profModal ||
           nextState.langModal !== this.state.langModal ||
           nextState.levelXpModal !== this.state.levelXpModal ||
           nextState.areYouSure !== this.state.areYouSure ||
           nextState.personalityTraits !== this.state.personalityTraits ||
           nextState.ideals !== this.state.ideals ||
           nextState.bonds !== this.state.bonds ||
           nextState.flaws !== this.state.flaws
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
      return <div
        key={`trait-${trait.id}`}
        className='info-trait-container'
      >
        <div className='info-section-header'>
          <h5 className='info-section-title'>{trait.name}</h5>
        </div>
        <p
          className='p1 interactable'
          onClick={() => this.setState({ [`${trait.id}`]: true })}
        >{this.props.traits.get(trait.id)}</p>
        <TraitsDialog
          id={trait.id}
          name={trait.name}
          desc={this.props.traits.get(trait.id)}
          active={this.state[trait.id]}
          onDismiss={() => this.setState({ [`${trait.id}`]: false })}
          onTraitChange={this.props.handleInfoChange}
        />
      </div>
    })
  },

  renderProficiencies() {
    if (!this.props.proficiencies || !this.props.proficiencies.get('proficiencies')) {
      return null;
    }

    return this.props.proficiencies.get('proficiencies').toJS().map((prof, i) => {
      let mc = <EditProficiency ref={`profs-${i}`} name={prof.name} desc={prof.desc} id={prof.id} onProficiencyChange={this.handleChange.bind(this, `prof-${i}`)} />;
      return (
        <ListItem ref={`prof-${i}`} key={i} title={prof.name} id={`proficiencies-${i}`} modalContent={mc} onDismiss={this.handleDirtyCheck.bind(this, `profs-${i}`)}/>
      )
    })
  },

  renderLanguages() {
    if (!this.props.proficiencies || !this.props.proficiencies.get('languages')) {
      return null;
    }

    return this.props.proficiencies.get('languages').toJS().map((lang, i) => {
      let modalContent = <EditLanguage ref={`langs-${i}`} name={lang.name} desc={lang.desc} id={lang.id} onLanguageChange={this.handleChange.bind(this, `lang-${i}`)} />;
      return (
        <ListItem ref={`lang-${i}`} key={i} title={lang.name} id={`languages-${i}`} modalContent={modalContent} onDismiss={this.handleDirtyCheck.bind(this, `langs-${i}`)}/>
      )
    })
  },

  handleConfirm(answer) {
    switch (answer) {
      case 'yes':
        this.setState({
          areYouSure: false,
          profModal: false,
          langModal: false,
          levelXpModal: false
        });
        break;
      case 'no':
        this.setState({ areYouSure: false });
        break;
    }
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
        <section className='info-section pane-padding' onClick={this.openDialog.bind(this, 'levelXp')}>
          <div className='row'>
            <div className='col-2-3 level-container'>
              <h6 className='level-header'>Level</h6>
              <span className='level'>{this.props.info.get('level')}</span>
              <h6>{this.props.info.get('xp')}</h6>
              <Modal active={this.state.levelXpModal} id='edit-level-xp' content={this.buildLevelDialog()} onDismiss={this.handleNewDismiss.bind(this, 'levelXp')} />
            </div>
            <div className='col-1-3'>
              <div className='stat'>
                <h6>Class</h6>
                <p>{this.props.info.get('class')}</p>
              </div>
              <div className='stat'>
                <h6>Race</h6>
                <p>{this.props.info.get('race')}</p>
              </div>
              <div className='stat'>
                <h6>Alignment</h6>
                <p>{this.props.info.get('alignment')}</p>
              </div>
              <div className='stat'>
                <h6>Background</h6>
                <p>{this.props.info.get('background')}</p>
              </div>
            </div>
          </div>
        </section>
        <section className="info-section pane-padding">
          {this.renderTraits()}
        </section>
        <section className="info-section pane-padding">
          <div className='info-section-header'>
            <h5 className='info-section-title'>Proficiencies</h5>
          </div>
          {this.renderProficiencies()}
          <p
            className='subtext text-center p2 interactable'
            onClick={this.openDialog.bind(this, 'prof')}
          ><Icon icon='fa fa-plus' /> Create a new proficiency</p>
          <Modal active={this.state.profModal} id='new-proficiency' content={createProf}  onDismiss={this.handleNewDismiss.bind(this, 'prof')}/>
        </section>
        <section className="info-section pane-padding">
          <div className='info-section-header'>
            <h5 className='info-section-title'>Languages</h5>
          </div>
          {this.renderLanguages()}
          <p
            className='subtext text-center p2 interactable'
            onClick={this.openDialog.bind(this, 'lang')}
          ><Icon icon='fa fa-plus' /> Create a new language</p>
          <Modal active={this.state.langModal} id='new-language' content={createLang}  onDismiss={this.handleNewDismiss.bind(this, 'lang')}/>
        </section>
        <ConfirmModal
          active={this.state.areYouSure}
          onConfirm={this.handleConfirm}
        />
      </div>
    );
  }
})
