import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Modal from '../components/Modal';
import Icon from '../components/Icon';

export default class ProgressModal extends Component {
  static propTypes = {
    active: PropTypes.bool.isRequired,
    progress: PropTypes.number.isRequired,
  }

  getConfirmContent() {
    return (
      <section>
        <div className='modal-header'><h3>Progress</h3></div>
        <div className='modal-content'>
          <h1>{this.props.progress}%</h1>
        </div>
      </section>
    )
  }

  render() {
    return <Modal
      id='progress-modal'
      active={this.props.active}
      content={this.getConfirmContent()}
      onDismiss={() => {}}
      overflowAppContainer='body'
      overflowPaneContainer='body'
    />
  }
}
