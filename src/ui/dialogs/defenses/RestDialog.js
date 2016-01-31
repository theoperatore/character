'use strict';

import React from 'react';
import Modal from '../../components/Modal';
import Icon from '../../components/Icon';

export default React.createClass({
  displayName: 'RestDialog',


  propTypes: {
    active: React.PropTypes.bool.isRequired,
    dismiss: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
    hitDice: React.PropTypes.number.isRequired,
    hitDiceType: React.PropTypes.string.isRequired
  },


  getInitialState() {
    return {
      short: false,
      roll: ''
    }
  },


  getContent() {
    return <section className='rest-dialog'>
      <div className='modal-header'><h3>Take a Rest?</h3></div>
      <div className='modal-content'>
        <p>Take a <span className='text-green'>Long Rest</span> to regain all hit points and 1/2 total hit dice. Take a <span className='text-blue'>Short Rest</span> to spend some hit dice and regain some hp.</p>
      </div>
      <div className='modal-footer'>
        <button className='text-green' onClick={this.longRest}>Long Rest</button>
        <button className='text-blue' onClick={() => this.setState({ short: true })}>Short Rest</button>
      </div>
    </section>
  },


  shortRestContent() {
    return <section className='rest-dialog'>
      <div className='modal-header'><h3>Short Rest</h3></div>
      <div className='modal-content'>
        <p>A hit die will be spent each time you <em className='text-blue'>Use Hit Dice</em>.</p>
        <p>You have <strong><em>{this.props.hitDice}</em></strong> hit dice remaining of type(s) <strong><em>{this.props.hitDiceType}</em></strong>.</p>
        <div className='inputs'>
          <input type='text' placeholder='hit die roll value' id='hitDiceValue' value={this.state.roll} onChange={this.validateInput}/>
        </div>
      </div>
      <div className='modal-footer'>
        <button className='text-blue' onClick={this.shortRest}>Use Hit Die</button>
        <button className='text-red' onClick={this.dismiss}>Stop Resting</button>
      </div>
    </section>
  },


  validateInput(ev) {
    let roll = Number(ev.target.value);
    if (roll === '' || (!isNaN(roll) && roll !== Infinity)) {
      this.setState({ roll });
    }
  },


  dismiss() {
    this.setState({ short: false, roll: '' });
    this.props.dismiss();
  },


  shortRest() {
    if (!isNaN(this.state.roll) && this.state.roll !== '') {
      let data = {
        hpGained: this.state.roll
      }

      this.props.onChange({ type: 'SHORT_REST', data });
      this.setState({ roll: '' });
    }
  },


  longRest() {
    this.props.onChange({ type: 'LONG_REST' });
    this.dismiss();
  },


  render() {
    return <span>
      <Modal id='rest-dialog' active={this.props.active} content={this.getContent()} onDismiss={this.dismiss} />
      <Modal id='short-rest-dialog' active={this.state.short} content={this.shortRestContent()} onDismiss={() => this.setState({ short: false })} />
    </span>
  }
})