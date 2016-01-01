'use strict';

import React from 'react';
import Icon from '../../../components/Icon';

export default React.createClass({
  displayName: 'CreateProficiency',

  propTypes: {
    onCreate: React.PropTypes.func.isRequired,
    onCancel: React.PropTypes.func.isRequired
  },

  getInitialState() {
    return {
      dirty: false
    }
  },


  isDirty() {
    return this.state.dirty;
  },


  handleCreate() {
    let name = this.refs.newName.value.trim();
    let desc = this.refs.newDesc.value.trim();

    this.props.onCreate({ type: 'PROFICIENCY_CREATE', data: { name, desc }});
  },


  handleCancel() {
    this.props.onCancel();
  },


  makeDirty() {
    if (!this.state.dirty) {
      this.setState({ dirty: true });
    }
  },

  render() {
    return (
      <section>
        <div className='modal-header'>  
          <h3>
            <input type='text' defaultValue='New Proficiency' ref='newName' onChange={this.makeDirty}/>
          </h3>
        </div>
        <div className='modal-content'>
          <textarea defaultValue='description...' ref='newDesc' onChange={this.makeDirty}/>
        </div>
        <div className='modal-footer'>
          <button onClick={this.handleCreate} className='bg-green text-green'>
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