'use strict';

import React from 'react/addons';
import ListItem from '../components/ListItem';
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


  renderProficiencies : function() {
    return this.props.proficiencies.get('proficiencies').toJS().map((prof, i) => {
      return (
        <ListItem glyph={<Icon icon='fa fa-cube' />} key={i} container='.character-body' content={
          <section>
            <div className='modal-header'>
              <h3>{prof.name}</h3>
            </div>
            <div className='modal-content'>
              <p>{prof.desc}</p>
            </div>
          </section>
        }>
          <p>{prof.name}</p>
        </ListItem>
      );
    })
  },


  renderLanguages : function() {
    return this.props.proficiencies.get('languages').toJS().map((lang, i) => {
      return (
        <ListItem glyph={<Icon icon='fa fa-cube' />} key={i} container='.character-body' content={
          <section>
            <div className='modal-header'>
              <h3>{lang.name}</h3>
            </div>
            <div className='modal-content'>
              <p>{lang.desc}</p>
            </div>
          </section>
        }>
          <p>{lang.name}</p>
        </ListItem>
      );
    })
  },


  render : function() {
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
          <ListItem glyph={<Icon icon='fa fa-cube' />} container='.character-body' content={
            <section>
              <div className='modal-header'>
                <h3>Personality</h3>
              </div>
              <div className='modal-content'>
                <p>{this.props.traits.get('personalityTraits')}</p>
              </div>
            </section>
          }>
            <p>Personality</p>
          </ListItem>
          <ListItem glyph={<Icon icon='fa fa-cube' />} container='.character-body' content={
            <section>
              <div className='modal-header'>
                <h3>Ideals</h3>
              </div>
              <div className='modal-content'>
                <p>{this.props.traits.get('ideals')}</p>
              </div>
            </section>
          }>
            <p>Ideals</p>
          </ListItem>
          <ListItem glyph={<Icon icon='fa fa-cube' />} container='.character-body' content={
            <section>
              <div className='modal-header'>
                <h3>Bonds</h3>
              </div>
              <div className='modal-content'>
                <p>{this.props.traits.get('bonds')}</p>
              </div>
            </section>
          }>
            <p>Bonds</p>
          </ListItem>
          <ListItem glyph={<Icon icon='fa fa-cube' />} container='.character-body' content={
            <section>
              <div className='modal-header'>
                <h3>Flaws</h3>
              </div>
              <div className='modal-content'>
                <p>{this.props.traits.get('flaws')}</p>
              </div>
            </section>
          }>
            <p>Flaws</p>
          </ListItem>
        </section>
        <section className="info-section pane-padding">
          <h3>Proficiencies</h3>
          {this.renderProficiencies()}
        </section>
        <section className="info-section pane-padding">
          <h3>Languages</h3>
          {this.renderLanguages()}
        </section>
      </div>
    );
  }
})
