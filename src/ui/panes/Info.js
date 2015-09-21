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


  handleInfoChange : function() {
    var key = "traits";
    var data = 'some data as immutable';

    this.props.handleInfoChange(key, data);
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
        <section className="pane-section pane-padding">
          <Panel header='Personality Traits'>
            <p>{this.props.traits.get('personalityTraits')}</p>
          </Panel>
          <Panel header='Ideals'>
            <p>{this.props.traits.get('ideals')}</p>
          </Panel>
          <Panel header='Bonds'>
            <p>{this.props.traits.get('bonds')}</p>
          </Panel>
          <Panel header='Flaws'>
            <p>{this.props.traits.get('flaws')}</p>
          </Panel>
        </section>
        <hr />
        <section className="pane-section pane-padding">
          {this.renderProficiencies()}
        </section>
        <hr />
        <section className="pane-section pane-padding">
          {this.renderLanguages()}
        </section>
      </div>
    );
  }
})
