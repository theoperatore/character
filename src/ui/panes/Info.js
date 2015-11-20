'use strict';

var React = require('react/addons');

var Panel = require('../components/Panel');
var Stat = require('../components/Stat');

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
        <Panel header={prof.name} key={i}>
          <p>{prof.desc}</p>
        </Panel>
      );
    })
  },


  renderLanguages : function() {
    return this.props.proficiencies.get('languages').toJS().map((lang, i) => {
      return (
        <Panel header={lang.name} key={i}>
          <p>{lang.desc}</p>
        </Panel>
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
        <hr />
        <section className="info-section pane-padding tile-container">
          <div className='tile-stat-container'>
            <div className='tile-stat'>
              <span className='fa fa-cube'></span> 
              <h6>{'Personality Traits'}</h6>
            </div>
          </div>
          <div className='tile-stat-container'>
            <div className='tile-stat'>
              <span className='fa fa-cube'></span> 
              <h6>{'Ideals'}</h6>
            </div>
          </div>
          <div className='tile-stat-container'>
            <div className='tile-stat'>
              <span className='fa fa-cube'></span> 
              <h6>{'Bonds'}</h6>
            </div>
          </div>
          <div className='tile-stat-container'>
            <div className='tile-stat'>
              <span className='fa fa-cube'></span> 
              <h6>{'Flaws'}</h6>
            </div>
          </div>
          <div className='tile-container'>
            <div className='tile-stat'>
              <h6>Descriptors</h6>
            </div>
          </div>
        </section>

        <hr />
        <section className="info-section pane-padding">
          {this.renderProficiencies()}
        </section>
        <hr />
        <section className="info-section pane-padding">
          {this.renderLanguages()}
        </section>
      </div>
    );
  }
})
