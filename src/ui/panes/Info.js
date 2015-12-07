'use strict';

import React from 'react';
import ListItem from '../components/ListItem';
import ProficienciesDialog from '../dialog-components/ProficienciesDialog';
import LanguagesDialog from '../dialog-components/LanguagesDialog';
import Icon from '../components/Icon';

module.exports = React.createClass({
  displayName : 'PaneInfo',


  getInitialState : function() {
    return ({
      editingInfo : false
    })
  },


  // only update when the info character data changes
  shouldComponentUpdate : function(nextProps) {
    return (nextProps.info !== this.props.info) ||
           (nextProps.traits !== this.props.traits) ||
           (nextProps.proficiencies !== this.props.proficiencies);
  },


  addProficiency() {
    this.props.handleInfoChange({ type: 'PROFICIENCY_ADD' });
  },


  addLanguage() {
    this.props.handleInfoChange({ type: 'LANGUAGE_ADD' });
  },


  renderProficiencies() {
    return this.props.proficiencies.get('proficiencies').toJS().map((prof, i) => {
      return (
        <ListItem key={i} title={prof.name}>
          <ProficienciesDialog name={prof.name} desc={prof.desc} id={`${i}`} onProficiencyChange={this.props.handleInfoChange} />
        </ListItem>
      )
    })
  },


  renderLanguages() {
    return this.props.proficiencies.get('languages').toJS().map((lang, i) => {
      return (
        <ListItem key={i} title={lang.name}>
          <LanguagesDialog name={lang.name} desc={lang.desc} id={`${i}`} onLanguageChange={this.props.handleInfoChange} />
        </ListItem>
      )
    })
  },


  render() {

    let glyph = <Icon icon='fa fa-cube' />;

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
          <h3>Traits</h3>

          <ListItem glyph={glyph} title='Personality'>
            <div className='modal-header'>
              <h3>Personality</h3>
            </div>
            <div className='modal-content'>
              <p>{this.props.traits.get('personalityTraits')}</p>
            </div>
            <div className='modal-footer'>
              <button>
                <p><Icon icon='fa fa-pencil' /> Edit</p>
              </button>
            </div>
          </ListItem>

          <ListItem glyph={glyph} title='Ideals'>
            <div className='modal-header'>
              <h3>Ideals</h3>
            </div>
            <div className='modal-content'>
              <p>{this.props.traits.get('ideals')}</p>
            </div>
            <div className='modal-footer'>
              <button>
                <p><Icon icon='fa fa-pencil' /> Edit</p>
              </button>
            </div>
          </ListItem>

          <ListItem glyph={glyph} title='Bonds'>
            <div className='modal-header'>
              <h3>Bonds</h3>
            </div>
            <div className='modal-content'>
              <p>{this.props.traits.get('bonds')}</p>
            </div>
            <div className='modal-footer'>
              <button>
                <p><Icon icon='fa fa-pencil' /> Edit</p>
              </button>
            </div>
          </ListItem>

          <ListItem glyph={glyph} title='Flaws'>
            <div className='modal-header'>
              <h3>Flaws</h3>
            </div>
            <div className='modal-content'>
              <p>{this.props.traits.get('flaws')}</p>
            </div>
            <div className='modal-footer'>
              <button>
                <p><Icon icon='fa fa-pencil' /> Edit</p>
              </button>
            </div>
          </ListItem>

        </section>
        <section className="info-section pane-padding">
          <div className='info-section-header'>
            <h3 className='info-section-title'>Proficiencies</h3>
            <p className='info-section-addon'><Icon icon='fa fa-plus' onClick={this.addProficiency}/></p>
          </div>
          {this.renderProficiencies()}
        </section>
        <section className="info-section pane-padding">
          <div className='info-section-header'>
            <h3 className='info-section-title'>Languages</h3>
            <p className='info-section-addon'><Icon icon='fa fa-plus' onClick={this.addLanguage}/></p>
          </div>
          {this.renderLanguages()}
        </section>
      </div>
    );
  }
})
