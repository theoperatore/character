'use strict';

import React from 'react';
import Modal from '../../components/Modal';
import Icon from '../../components/Icon';
import ConfirmModal from '../ConfirmModal';

export default React.createClass({
  displayName: 'EditDefenseStatDialog',


  propTypes: {
    active: React.PropTypes.bool.isRequired,
    dismiss: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
    armorClass: React.PropTypes.number.isRequired,
    speed: React.PropTypes.string.isRequired,
    initiative: React.PropTypes.number.isRequired
  },


  getContent() {
    return <section>
      <div className='modal-header'><h3>Edit Defenses</h3></div>
      <div className='modal-content'>
        
      </div>
      <div className='modal-footer'></div>
    </section>
  },


  dismiss() {
    this.props.dismiss();
  },


  render() {
    return <Modal id='edit-defense-dialog' active={this.props.active} content={this.getContent()} onDismiss={this.dismiss} />
  }
})