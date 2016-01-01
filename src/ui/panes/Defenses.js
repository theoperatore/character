'use strict';

var React = require('react');
var HPBar = require('../components/HPBar');
var Shield = require('../components/Shield');
var Switch = require('../components/Switch');
var Stat = require('../components/Stat');
var Panel = require('../components/Panel');

module.exports = React.createClass({
  displayName : 'PaneDefenses',


  shouldComponentUpdate : function(nextProps) {
    return (
      this.props.hitPoints !== nextProps.hitPoints ||
      this.props.speed !== nextProps.speed ||
      this.props.initiative !== nextProps.initiative ||
      this.props.armorClass !== nextProps.armorClass ||
      this.props.savingThrows !== nextProps.savingThrows ||
      this.props.resistances !== nextProps.resistances
    );
  },


  renderSuccesses : function() {
    return (
      <div className="grid">
        <div className="row">
          <div className="col-xs-4">
            <Switch />
          </div>
          <div className="col-xs-4">
            <Switch />
          </div>
          <div className="col-xs-4">
            <Switch />
          </div>
        </div>
      </div>
    )
  },


  renderFailures : function() {
    return (
      <div className="grid">
        <div className="row">
          <div className="col-xs-4">
            <Switch />
          </div>
          <div className="col-xs-4">
            <Switch />
          </div>
          <div className="col-xs-4">
            <Switch />
          </div>
        </div>
      </div>
    )
  },


  renderResistances : function() {
    return this.props.resistances.toJS().map((resistance, i) => {
      return (
        <Panel key={i} header={resistance.name}>
          <p>{resistance.desc}</p>
        </Panel>
      )
    })
  },


  render : function() {
    return (
      <div className="pane-container">
        <h3>Defenses</h3>
        <HPBar data={this.props.hitPoints}/>

        <section className="pane-section pane-border">
          <Shield data={this.props.hitPoints} />
        </section>

        <section className="pane-section pane-border">
          <div className="grid">
            <div className="row">
              <div className="col-xs-6 text-center">
                <p>successes</p>
                {this.renderSuccesses()}
              </div>
              <div className="col-xs-6 text-center">
                <p>failures</p>
                {this.renderFailures()}
              </div>
            </div>
          </div>
        </section>

        <h3>Saving Throws</h3>
        <section className="pane-section pane-border">
          <Stat width={3} title={'STR'} trained={this.props.savingThrows.get('str').get('proficient')} background={true} score={this.props.savingThrows.get('str').get('score')}/>
          <Stat width={3} title={'DEX'} trained={this.props.savingThrows.get('dex').get('proficient')} background={true} score={this.props.savingThrows.get('dex').get('score')}/>
          <Stat width={3} title={'CON'} trained={this.props.savingThrows.get('con').get('proficient')} background={true} score={this.props.savingThrows.get('con').get('score')}/>
          <Stat width={3} title={'INT'} trained={this.props.savingThrows.get('int').get('proficient')} background={true} score={this.props.savingThrows.get('int').get('score')}/>
          <Stat width={3} title={'WIS'} trained={this.props.savingThrows.get('wis').get('proficient')} background={true} score={this.props.savingThrows.get('wis').get('score')}/>
          <Stat width={3} title={'CHA'} trained={this.props.savingThrows.get('cha').get('proficient')} background={true} score={this.props.savingThrows.get('cha').get('score')}/>
        </section>

        <h3>Resistances</h3>
        <section className="pane-section pane-padding">
          {this.renderResistances()}
        </section>
      </div>
    );
  }
})
