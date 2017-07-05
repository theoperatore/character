

import PropTypes from 'prop-types';

import React, { Component } from 'react';
import uuid from 'uuid/v1';
import Icon from '../../../../components/Icon';

export default class extends React.Component {
  static displayName = 'CreateLanguage';

  static propTypes = {
    onCreate: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
  };

  state = {
    dirty: false
  };

  isDirty = () => {
    return this.state.dirty;
  };

  handleCreate = () => {
    let name = this.refs.newName.value.trim();
    let desc = this.refs.newDesc.value.trim();
    let id = `lang-${uuid()}`;

    this.props.onCreate({ type: 'LANGUAGE_CREATE', data: { name, desc, id }});
  };

  handleCancel = () => {
    this.props.onCancel();
  };

  makeDirty = () => {
    if (!this.state.dirty) {
      this.setState({ dirty: true });
    }
  };

  render() {
    return (
      <section>
        <div className='modal-header'>  
          <h3>
            <input type='text' placeholder='New Language' ref='newName' onChange={this.makeDirty}/>
          </h3>
        </div>
        <div className='modal-content'>
          <textarea placeholder='description...' ref='newDesc' onChange={this.makeDirty}/>
        </div>
        <div className='modal-footer'>
          <button onClick={this.handleCreate} className='text-green'>
            <p><Icon icon='fa fa-pencil' /> Save</p>
          </button>
          <button onClick={this.handleCancel} className='text-red'>
            <p><Icon icon='fa fa-remove' /> Cancel</p>
          </button>
        </div>
      </section>
    )
  }
}