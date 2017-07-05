'use strict';

import PropTypes from 'prop-types';

import {Component} from 'react';
import createReactClass from 'create-react-class';
import debug from 'debug';

import Icon from '../../../components/Icon';

const log = debug('app:levelXpDialog');

const refNames = ['level', 'xp', 'class', 'race', 'alignment', 'background'];

export default createReactClass({
  displayName: 'LevelXPDialog',


  getInitialState() {
    return ({
      dirty: false,
      level: this.props.currLevel,
      xp: this.props.currXp,
    });
  },


  propTypes: {
    currLevel: PropTypes.number.isRequired,
    currXp: PropTypes.number.isRequired,
    currRace: PropTypes.string.isRequired,
    currAlign: PropTypes.string.isRequired,
    currBackground: PropTypes.string.isRequired,
    currClass: PropTypes.string.isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
  },


  isDirty() {
    return this.state.dirty;
  },


  makeDirty() {
    if (!this.state.dirty) {
      this.setState({ dirty: true });
    }
  },


  handleSave() {
    let infos = refNames
      .map(refName => ({[refName]: this.refs[refName].value}))
      .reduce((obj, ref) => Object.assign(obj, ref), {});

    infos.xp = this.state.xp === '' ? 0 : this.state.xp;
    infos.level = this.state.level === '' ? 0 : this.state.level;

    this.props.onSave({ type: 'BASIC_INFO_EDIT', data: infos });
  },


  handleCancel() {
    this.props.onCancel();
  },

  validateNumber(type, ev) {
    if (ev.target.value === '') {
      return this.setState({ [type]: '', dirty: true });
    }

    let num = Number(ev.target.value);
    if (isNaN(num)) return;

    this.setState({ [`${type}`]: num, dirty: true });
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
              <input id='newLevel' type='text' value={this.state.level} placeholder={this.props.currLevel} ref='level' onChange={this.validateNumber.bind(this, 'level')}/>
            </div>
            <div className='inputs'>
              <label htmlFor='newXp'>xp</label>
              <input id='newXp' type='text' value={this.state.xp} placeholder={this.props.currXp} ref='xp' onChange={this.validateNumber.bind(this, 'xp')}/>
            </div>
            <div className='inputs'>
              <label htmlFor='newClass'>class</label>
              <input id='newClass' type='text' defaultValue={this.props.currClass} ref='class' onChange={this.makeDirty}/>
            </div>
          </div>

          <div className='col-1-2'>
            <div className='inputs'>
              <label htmlFor='newRace'>race</label>
              <input id='newRace' type='text' defaultValue={this.props.currRace} ref='race' onChange={this.makeDirty}/>
            </div>
            <div className='inputs'>
              <label htmlFor='newAlignment'>alignment</label>
              <input id='newAlignment' type='text' defaultValue={this.props.currAlign} ref='alignment' onChange={this.makeDirty}/>
            </div>
            <div className='inputs'>
              <label htmlFor='newBackground'>background</label>
              <input id='newBackground' type='text' defaultValue={this.props.currBackground} ref='background' onChange={this.makeDirty}/>
            </div>
          </div>
        </div>
        <div className='modal-footer'>
          <button onClick={this.handleSave} className='text-green'>
            <p><Icon icon='fa fa-pencil' /> Save</p>
          </button>
          <button onClick={this.handleCancel} className='text-red'>
            <p><Icon icon='fa fa-remove' /> Cancel</p>
          </button>
        </div>
      </section>
    )
  }
});
