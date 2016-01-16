'use strict';

import React from 'react';

import Icon from '../../components/Icon';

export default React.createClass({
  displayName: 'CreateNewFeatureDialog',


  propTypes: {
    name: React.PropTypes.string.isRequired,
    desc: React.PropTypes.string.isRequired,
    featureType: React.PropTypes.string.isRequired,
    featureId: React.PropTypes.string.isRequired,
    onUpdate: React.PropTypes.func.isRequired,
    onCancel: React.PropTypes.func.isRequired,
    onRemove: React.PropTypes.func.isRequired
  },


  getInitialState() {
    return {
      dirty: false,
      edit: false,
      typeSelected: ''
    }
  },


  componentWillMount() {
    this.setState({ typeSelected: this.props.featureType })
  },


  isDirty() {
    return this.state.dirty;
  },


  makeDirty() {
    if (!this.state.dirty) {
      this.setState({ dirty: true });
    }
  },


  handleTypeSelect(newType) {
    this.setState({ typeSelected: newType, dirty: true });
  },


  editSave() {

    // intent to start editing
    if (!this.state.edit) {
      this.setState({ edit: true });
      return;
    }

    // save new stuffs
    let newName = this.refs.newName.value.trim();
    let newDesc = this.refs.newDesc.value.trim();
    let newType = this.state.typeSelected;

    let shouldUpdate = this.props.name !== newName ||
                       this.props.desc !== newDesc ||
                       this.props.featureType !== newType;

     if (shouldUpdate) {
      this.props.onUpdate({ type: 'FEATURE_EDIT', data: {
        name: newName,
        desc: newDesc,
        type: newType,
        id: this.props.featureId
      }})
     }

     this.setState({ edit: false, dirty: false });
  },


  handleRemove() {

    // edit mode and dirty
    if (this.state.edit && this.state.dirty) {
      this.props.onCancel().then(answer => {
        if (answer === 'yes') {
          this.setState({ edit: false, dirty: false, typeSelected: this.props.featureType });
        }
      });
      return;
    }
    
    // just normal edit mode; no changes
    if (this.state.edit) {
      this.setState({ edit: false, dirty: false });
      return;
    }

    // remove item
    if (!this.state.edit) {
      this.props.onRemove(`Are you sure you want to delete: ${this.props.name} ? `);
    }
  },


  render() {
    return (
      <section>
        <div className='modal-header'>
          <h3>{
            this.state.edit ? 
            <input type='text' ref='newName' defaultValue={this.props.name} placeholder={this.props.name} onChange={this.makeDirty}/>
            : this.props.name
          }</h3>
        </div>
        <div className='modal-content'>
          <div>
          {
            this.state.edit ?
            <textarea defaultValue={this.props.desc} ref='newDesc' placeholder={this.props.desc} onChange={this.makeDirty}/>
            : <p>{this.props.desc}</p>
          }
          </div>
          {
            this.state.edit ?
            <div className='row'>
              <div className='col-1-3'>
                <div onClick={this.handleTypeSelect.bind(this, 'PASSIVE')} className={`feature-type ${this.state.typeSelected === 'PASSIVE' ? 'selected' : ''}`}>
                  <Icon icon='fa fa-cube'/>
                </div>
              </div>
              <div className='col-1-3'>
                <div onClick={this.handleTypeSelect.bind(this, 'ATTACK')} className={`feature-type text-red ${this.state.typeSelected === 'ATTACK' ? 'selected' : ''}`}>
                  <Icon icon='icon-attack'/>
                </div>
              </div>
              <div className='col-1-3'>
                <div onClick={this.handleTypeSelect.bind(this, 'SPELL')} className={`feature-type text-purple ${this.state.typeSelected === 'SPELL' ? 'selected' : ''}`}>
                  <Icon icon='icon-repo'/>
                </div>
              </div>
            </div>
            : null
          }
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