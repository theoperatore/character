'use strict';

import React from 'react';

import Icon from '../../../../components/Icon';
import ConfirmModal from '../../ConfirmModal';

export default React.createClass({
  displayName: 'EditProficiencies',


  getInitialState() {
    return ({
      editMode: false,
      dirty: false,
      confirm: false,
      message: null,
    })
  },


  propTypes: {
    name: React.PropTypes.string.isRequired,
    desc: React.PropTypes.string.isRequired,
    id: React.PropTypes.string.isRequired,
    onProficiencyChange: React.PropTypes.func.isRequired,
    dismiss: React.PropTypes.func
  },


  makeDirty() {
    if (!this.state.dirty) {
      this.setState({ dirty: true });
    }
  },


  isDirty() {
    return this.state.dirty;
  },


  editSave() {
    if (this.state.editMode) {
      let name = this.refs.newName.value.trim();
      let desc = this.refs.newDesc.value.trim();

      let shouldUpdate = name !== this.props.name || desc !== this.props.desc;

      if (shouldUpdate) {
        let data = {
          id: this.props.id,
          name,
          desc,
        };

        this.props.onProficiencyChange({ type: 'PROFICIENCY_EDIT', data });  
      }
    }

    this.setState({ editMode: !this.state.editMode, dirty: false })
  },


  handleRemove() {
    if (this.state.editMode) {
      this.setState({ editMode: false, dirty: false });
      return;
    }

    this.setState({ confirm: true, message: `Delete Proficiency: ${this.props.name}?` });
  },

  handleAnswer(choice) {
    switch(choice) {
      case 'yes':
        this.props.onProficiencyChange({ type: 'PROFICIENCY_DELETE', data: { id: this.props.id }});
        break;
      case 'no':
        this.setState({ confirm: false });
        break;
    }
  },


  render() {

    return (
      <section>
        <div className='modal-header'>
          <h3>
          {
            this.state.editMode ? 
            <input type='text' defaultValue={this.props.name} ref='newName' onChange={this.makeDirty}/> :
            this.props.name
          }
          </h3>
        </div>
        <div className='modal-content'>
          {
            this.state.editMode ?
            <textarea defaultValue={this.props.desc} ref='newDesc' onChange={this.makeDirty}/> :
            <p>{this.props.desc}</p>
          }
        </div>
        <div className='modal-footer'>
          <button onClick={this.editSave} className={'bg-green text-green'}>
            <p><Icon icon='fa fa-pencil' /> {this.state.editMode ? 'Save' : 'Edit'}</p>
          </button>
          <button onClick={this.handleRemove} className={'bg-red text-red'}>
            <p><Icon icon='fa fa-remove' /> {this.state.editMode ? 'Cancel' : 'Remove'}</p>
          </button>
        </div>
        <ConfirmModal
          active={this.state.confirm}
          message={this.state.message}
          onConfirm={this.handleAnswer}
        />
      </section>
    )
  }
})