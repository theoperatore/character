'use strict';

import PropTypes from 'prop-types';

import React, { Component } from 'react';
import Modal from '../../components/Modal';
import Icon from '../../components/Icon';

export default class extends React.Component {
  static displayName = 'ConfirmDialog';

  static propTypes = {
    message: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
    ]),
    onConfirm: PropTypes.func.isRequired,
    active: PropTypes.bool.isRequired
  };

  defaultMessage = 'Cancel and lose any unsaved changes?';

  confirmChoice = (choice) => {
    this.props.onConfirm(choice);
  };

  getConfirmContent = () => {
    return (
      <section>
        <div className='modal-header'><h3>Are You Sure?</h3></div>
        <div className='modal-content'>{this.props.message || this.defaultMessage}</div>
        <div className='modal-footer'>
          <button onClick={this.confirmChoice.bind(this, 'yes')} className='text-green'>Yes</button>
          <button onClick={this.confirmChoice.bind(this, 'no')} className='text-red'>No</button>
        </div>
      </section>
    )
  };

  render() {
    return <Modal id='confirm-dialog' active={this.props.active} content={this.getConfirmContent()} onDismiss={() => {}}/>
  }
}