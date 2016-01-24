'use strict';

import React from 'react';

import HPCounter from '../components/HPCounter';
import Shield from '../components/Shield';
import Switch from '../components/Switch';
import Stat from '../components/Stat';
import Panel from '../components/Panel';

export default React.createClass({
  displayName: 'PaneDefenses',


  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.hitPoints !== nextProps.hitPoints ||
      this.props.speed !== nextProps.speed ||
      this.props.initiative !== nextProps.initiative ||
      this.props.armorClass !== nextProps.armorClass ||
      this.props.savingThrows !== nextProps.savingThrows ||
      this.props.resistances !== nextProps.resistances ||
      this.state.hp !== nextState.hp || 
      this.state.temp !== nextState.temp
    );
  },


  getInitialState() {
    return {
      hp: this.props.hitPoints.get('current'),
      temp: this.props.hitPoints.get('temporary')
    }
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


  render() {
    let max = this.props.hitPoints.get('maximum');
    return (
      <div className='pane-container'>
        <section className='info-section pane-padding'>
          <div className='row'>
            <div className='col-2-3' onClick={() => { this.setState({ hp: Math.round(Math.random() * max), temp: Math.round(Math.random() * max) })}}>
              <HPCounter 
                maximum={this.props.hitPoints.get('maximum')}
                current={this.state.hp}
                temporary={this.state.temp}
              />
            </div>
            <div className='col-1-3' onClick={() => this.setState({ temp: 0})}>
              <div className='stat'>
                <h6>Armor Class</h6>
                <p>{this.props.armorClass.get('score')}</p>
              </div>
              <div className='stat'>
                <h6>Speed</h6>
                <p>{this.props.speed.get('score')}</p>
              </div>
              <div className='stat'>
                <h6>Initiative</h6>
                <p>{this.props.initiative.get('score')}</p>
              </div>
              <div className='stat'>
                <h6>Hit Dice</h6>
                <p>{`${this.props.hitPoints.get('hitDiceCurrent')} / ${this.props.hitPoints.get('hitDiceMaximum')}${this.props.hitPoints.get('hitDiceType')}`}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }


  // render() {
  //   return (
  //     <div className="pane-container">
  //       <div className='info-section pane-padding'>
  //         <HPCounter 
  //           maximum={this.props.hitPoints.get('maximum')}
  //           current={this.props.hitPoints.get('current')}
  //           temporary={this.props.hitPoints.get('temporary')}
  //         />
  //       </div>

  //       <section className="pane-section pane-border">
  //         <Shield data={this.props.hitPoints} />
  //       </section>

  //       <section className="pane-section pane-border">
  //         <div className="grid">
  //           <div className="row">
  //             <div className="col-xs-6 text-center">
  //               <p>successes</p>
  //               {this.renderSuccesses()}
  //             </div>
  //             <div className="col-xs-6 text-center">
  //               <p>failures</p>
  //               {this.renderFailures()}
  //             </div>
  //           </div>
  //         </div>
  //       </section>

  //       <h3>Saving Throws</h3>
  //       <section className="pane-section pane-border">
  //         <Stat width={3} title={'STR'} trained={this.props.savingThrows.get('str').get('proficient')} background={true} score={this.props.savingThrows.get('str').get('score')}/>
  //         <Stat width={3} title={'DEX'} trained={this.props.savingThrows.get('dex').get('proficient')} background={true} score={this.props.savingThrows.get('dex').get('score')}/>
  //         <Stat width={3} title={'CON'} trained={this.props.savingThrows.get('con').get('proficient')} background={true} score={this.props.savingThrows.get('con').get('score')}/>
  //         <Stat width={3} title={'INT'} trained={this.props.savingThrows.get('int').get('proficient')} background={true} score={this.props.savingThrows.get('int').get('score')}/>
  //         <Stat width={3} title={'WIS'} trained={this.props.savingThrows.get('wis').get('proficient')} background={true} score={this.props.savingThrows.get('wis').get('score')}/>
  //         <Stat width={3} title={'CHA'} trained={this.props.savingThrows.get('cha').get('proficient')} background={true} score={this.props.savingThrows.get('cha').get('score')}/>
  //       </section>

  //       <h3>Resistances</h3>
  //       <section className="pane-section pane-padding">
  //         {this.renderResistances()}
  //       </section>
  //     </div>
  //   );
  // }
})
