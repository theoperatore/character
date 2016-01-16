'use strict';

import React from 'react';

import Icon from '../../components/Icon';

export default React.createClass({
  displayName: 'CreateNewFeatureDialog',


  propTypes: {
    name: React.PropTypes.string.isRequired,
    desc: React.PropTypes.string.isRequired,
    onUpdate: React.PropTypes.func.isRequired,
    onCancel: React.PropTypes.func.isRequired,
    onRemove: React.PropTypes.func.isRequired
  },


  getInitialState() {
    return {
      dirty: false,
      edit: false
    }
  },


  isDirty() {
    return this.state.dirty;
  },


  makeDirty() {
    if (!this.state.dirty) {
      this.setState({ dirty: true });
    }
  },


  editSave() {

  },


  handleRemove() {

    // edit mode and dirty
    if (this.state.edit && this.state.dirty) {
      this.props.onCancel();
      return;
    }
    
    // just normal edit mode; no changes
    if (this.state.edit) {
      this.setState({ edit: false, dirty: false });
      return;
    }

    // remove item
    if (!this.state.edit) {
      this.props.onRemove();
    }
  },


  render() {
    return (
      <section>
        <div className='modal-header'>
          <h3>{this.props.name}</h3>
        </div>
        <div className='modal-content'>
          <p>{this.props.desc}</p>
        </div>
        <div className='modal-footer'>
          <button onClick={this.editSave} className={this.state.edit ? 'bg-green text-green' : ''}>
            <p><Icon icon='fa fa-pencil' /> {this.state.edit ? 'Save' : 'Edit'}</p>
          </button>
          <button onClick={this.handleRemove} className={this.state.edit ? 'bg-red text-red' : ''}>
            <p><Icon icon='fa fa-remove' /> {this.state.edit ? 'Cancel' : 'Remove'}</p>
          </button>
        </div>
      </section>
    )
  }
})