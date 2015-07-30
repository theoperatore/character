'use strict';

var React = require('react/addons');

var Panel = require('../components/Panel');
var Stat = require('../components/Stat');
var SettingsWell = require('../components/SettingsWell');

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
        <h3>Info</h3>
        <SettingsWell open={this.state.editingInfo}>
          <h4>Edit Character Info</h4>
          
        </SettingsWell>
        <section className="pane-section pane-border">
            <Stat width={3} title="Class" score={this.props.info.get('class')} />
            <Stat width={3} title="Level" score={this.props.info.get('level')} />
            <Stat width={3} title="Xp" score={this.props.info.get('xp')} />
        </section>
        <section className="pane-section pane-border">
          <Stat width={3} title="Bg" score={this.props.info.get('background')} />
          <Stat width={3} title="Race" score={this.props.info.get('race')} />
          <Stat width={3} title="Alignment" score={this.props.info.get('alignment')} />
        </section>
        <h3>Traits</h3>
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
        <h3>Proficiencies</h3>
        <section className="pane-section pane-padding">
          {this.renderProficiencies()}
        </section>
        <h3>Languages</h3>
        <section className="pane-section pane-padding">
          {this.renderLanguages()}
        </section>
      </div>
    );
  }
})
