'use strict';

import React from 'react';
import Modal from '../components/Modal';
import Icon from '../components/Icon';

export default React.createClass({
  displayName: 'ProgressModal',

  propTypes: {
    active: React.PropTypes.bool.isRequired,
    progress: React.PropTypes.number.isRequired,
  },

  getConfirmContent() {
    return (
      <section>
        <div className='modal-header'><h3>Progress</h3></div>
        <div className='modal-content'>
          <h1>{this.props.progress}%</h1>
        </div>
      </section>
    )
  },

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
})