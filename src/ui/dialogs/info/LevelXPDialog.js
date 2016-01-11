'use strict';

import React from 'react';
import debug from 'debug';

import Icon from '../../components/Icon';

const log = debug('app:levelXpDialog');

export default React.createClass({
  displayName: 'LevelXPDialog',


  getInitialState() {
    return ({
      dirty: false
    })
  },


  propTypes: {
    currLevel: React.PropTypes.number.isRequired,
    currXp: React.PropTypes.number.isRequired,
    currRace: React.PropTypes.string.isRequired,
    currAlign: React.PropTypes.string.isRequired,
    currBackground: React.PropTypes.string.isRequired,
    currClass: React.PropTypes.string.isRequired,
    onSave: React.PropTypes.func.isRequired,
    onCancel: React.PropTypes.func.isRequired
  },


  refNames: ['newLevel', 'newXp', 'newClass', 'newRace', 'newAlignment', 'newBackground'],


  isDirty() {
    return this.state.dirty;
  },


  makeDirty() {
    if (!this.state.dirty) {
      this.setState({ dirty: true });
    }
  },


  handleSave() {
    let infos = this.refNames
      .map(refName => ({[refName]: this.refs[refName].value}))
      .reduce((obj, ref) => Object.assign(obj, ref), {});
    
    this.props.onSave({ type: 'BASIC_INFO_EDIT', data: infos });
  },


  handleCancel() {
    this.props.onCancel();
  },


  render() {

    return (
      <section>
        <div className='modal-header'>
          <h3>Edit Character Info</h3>
        </div>
        <div className='modal-content row'>
          <div className='col-1-2'>
            <div className='inputs'>
              <label htmlFor='newLevel'>level</label>
              <input id='newLevel' type='text' defaultValue={this.props.currLevel} ref='newLevel' onChange={this.makeDirty}/>
            </div>
            <div className='inputs'>
              <label htmlFor='newXp'>xp</label>
              <input id='newXp' type='text' defaultValue={this.props.currXp} ref='newXp' onChange={this.makeDirty}/>
            </div>
            <div className='inputs'>
              <label htmlFor='newClass'>class</label>
              <input id='newClass' type='text' defaultValue={this.props.currClass} ref='newClass' onChange={this.makeDirty}/>
            </div>
          </div>

          <div className='col-1-2'>
            <div className='inputs'>
              <label htmlFor='newRace'>race</label>
              <input id='newRace' type='text' defaultValue={this.props.currRace} ref='newRace' onChange={this.makeDirty}/>
            </div>
            <div className='inputs'>
              <label htmlFor='newAlignment'>alignment</label>
              <input id='newAlignment' type='text' defaultValue={this.props.currAlign} ref='newAlignment' onChange={this.makeDirty}/>
            </div>
            <div className='inputs'>
              <label htmlFor='newBackground'>background</label>
              <input id='newBackground' type='text' defaultValue={this.props.currBackground} ref='newBackground' onChange={this.makeDirty}/>
            </div>
          </div>
        </div>
        <div className='modal-footer'>
          <button onClick={this.handleSave} className='bg-green text-green'>
            <p><Icon icon='fa fa-pencil' /> Save</p>
          </button>
          <button onClick={this.handleCancel} className='bg-red text-red'>
            <p><Icon icon='fa fa-remove' /> Cancel</p>
          </button>
        </div>
      </section>
    )
  }
})