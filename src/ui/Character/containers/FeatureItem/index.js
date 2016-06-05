'use strict';

import React from 'react';
import uuid from 'node-uuid';

import Modal from '../../../components/Modal';
import Icon from '../../../components/Icon';
import ListItem from '../../../components/ListItem/v2';
import ConfirmModal from '../../dialogs/ConfirmModal';

export default React.createClass({
  displayName: 'FeatureItem',


  propTypes: {
    name: React.PropTypes.string.isRequired,
    desc: React.PropTypes.string.isRequired,
    id: React.PropTypes.string.isRequired,
    featureType: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    classChargesId: React.PropTypes.string,
    classChargesName: React.PropTypes.string,
    classChargesTotal: React.PropTypes.number
  },


  getInitialState() {
    return {
      detail: false,
      confirm: false,
      message: null,
      dirty: false,
      edit: false,
      willDelete: false,
      typeSelected: this.props.featureType,
      hasCharges: !!this.props.classChargesId,
      cctotal: this.props.classChargesTotal,
    }
  },


  resetState() {
    this.setState({
      detail: false,
      confirm: false,
      message: null,
      dirty: false,
      edit: false,
      willDelete: false,
      typeSelected: this.props.featureType,
      hasCharges: !!this.props.classChargesId,
      cctotal: this.props.classChargesTotal,
    })
  },


  componentWillReceiveProps(nextProps) {
    this.setState({
      typeSelected: nextProps.featureType,
      hasCharges: !!nextProps.classChargesId,
      cctotal: nextProps.classChargesTotal
    });
  },


  makeDirty() {
    if (!this.state.dirty) {
      this.setState({ dirty: true });
    }
  },


  handleTypeSelect(newType) {
    this.setState({ typeSelected: newType, dirty: true });
  },


  dismiss() {
    if (this.state.dirty) {
      this.setState({ confirm: true, message: null });
      return;
    }

    this.resetState();
  },


  confirm(answer) {
    switch(answer) {
      case 'yes':
        if (this.state.willDelete) {
          this.props.onChange({ type: 'FEATURE_DELETE', data: { id: this.props.id, classChargesId: this.props.classChargesId }});
          this.resetState();
          return;
        }

        this.setState({ confirm: false, dirty: false, message: null, edit: false, willDelete: false, cctotal: this.props.classChargesTotal, });
        break;
      case 'no':
        this.setState({ confirm: false, message: null, willDelete: false });
        break;
    }
  },


  handleEditSave() {
    // save mode
    if (this.state.edit) {
      let name = this.refs.newName.value.trim();
      let desc = this.refs.newDesc.value.trim();
      let type = this.state.typeSelected;
      let id = this.props.id;
      let feature = { name, desc, type, id, classChargesId: this.props.classChargesId };

      if (name === '') { return; }

      let giveClassCharge = this.state.hasCharges;
      let isNewClassCharge = this.state.hasCharges && !this.props.classChargesId;

      let ccname = giveClassCharge ? this.refs.ccname.value.trim() : '';
      let cctotal = this.state.cctotal === '' ? 0 : this.state.cctotal;
      let classCharge = { charges: cctotal, name: ccname, current: cctotal };
      let data = { feature };

      if (giveClassCharge && ccname !== '') {

        feature.classChargesId = isNewClassCharge ? uuid.v1() : this.props.classChargesId;
        classCharge.id = isNewClassCharge ? feature.classChargesId : this.props.classChargesId;
        data.classCharge = classCharge;
        data.isNewClassCharge = isNewClassCharge;
      }

      this.props.onChange({ type: 'FEATURE_EDIT', data });
      this.setState({ confirm: false, edit: false, dirty: false, willDelete: false, message: null });
      return;
    }

    // enter edit mode
    this.setState({ edit: true });
  },


  handleDeleteCancel() {
    // cancel mode
    if (this.state.edit) {
      if (this.state.dirty) {
        this.setState({ confirm: true, message: null });
        return;
      }

      this.setState({ confirm: false, dirty: false, message: null, edit: false, willDelete: false, cctotal: this.props.classChargesTotal, });
      return;
    }

    // delete mode
    this.setState({ confirm: true, willDelete: true, message: `Do you really want to delete ${this.props.name}?`});
  },


  createGlyph(type) {
    switch (type) {
      case 'PASSIVE':
        return { icon: <Icon icon='fa fa-cube' className='ml2'/>, style: ''};
      case 'ATTACK':
        return { icon: <Icon icon='icon-attack' className='ml2'/>, style: 'text-attack' };
      case 'SPELL':
        return { icon: <Icon icon='icon-repo' className='ml2'/>, style: 'text-spell' };
      case 'DEFENSE':
        return { icon: <Icon icon='icon-shield' className='ml2'/>, style: 'text-str' };
    }
  },


  validateNumber(ev) {
    this.makeDirty();
    let val = ev.target.value;
    if (val === '') {
      this.setState({ cctotal: val });
      return;
    }

    let num = Number(val);
    if (!isNaN(val)) {
      this.setState({ cctotal: num });
    }
  },


  content() {
    let featureGlyph = this.createGlyph(this.props.featureType);

    return <section>
      <div className='modal-header'>
        <h3>{
          this.state.edit ?
          <input type='text' ref='newName' placeholder={this.props.name} defaultValue={this.props.name} onChange={this.makeDirty} />
          : <span className={`feature-type-header ${featureGlyph.style}`}>{featureGlyph.icon} {this.props.name}</span>
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
          <div>
            <label>Feature Type</label>
            <div className='row'>
              <div className='col-1-4'>
                <div onClick={this.handleTypeSelect.bind(this, 'PASSIVE')} className={`feature-type ${this.state.typeSelected === 'PASSIVE' ? 'selected' : ''}`}>
                  <Icon icon='fa fa-cube'/>
                </div>
              </div>
              <div className='col-1-4'>
                <div onClick={this.handleTypeSelect.bind(this, 'ATTACK')} className={`feature-type text-attack ${this.state.typeSelected === 'ATTACK' ? 'selected' : ''}`}>
                  <Icon icon='icon-attack'/>
                </div>
              </div>
              <div className='col-1-4'>
                <div onClick={this.handleTypeSelect.bind(this, 'SPELL')} className={`feature-type text-spell ${this.state.typeSelected === 'SPELL' ? 'selected' : ''}`}>
                  <Icon icon='icon-repo'/>
                </div>
              </div>
              <div className='col-1-4'>
                <div onClick={this.handleTypeSelect.bind(this, 'DEFENSE')} className={`feature-type text-str ${this.state.typeSelected === 'DEFENSE' ? 'selected' : ''}`}>
                  <Icon icon='icon-shield'/>
                </div>
              </div>
            </div>
            <div className='inputs'>
              <input id='class-charge' type='checkbox' checked={this.state.hasCharges} onChange={(ev) => this.setState({ hasCharges: ev.target.checked, dirty: true })}/>
              <label htmlFor='class-charge'>Enables a class charge</label>
            </div>
            {
              this.state.hasCharges ?
              <div>
                <div className='inputs'>
                  <input ref='ccname' type='text' defaultValue={this.props.classChargesName || ''} placeholder={this.props.classChargesName || 'display name'} onChange={this.makeDirty}/>
                </div>
                <div className='inputs'>
                  <input ref='cctotal' type='text'  value={this.state.cctotal} placeholder={this.props.classChargesTotal} onChange={this.validateNumber}/>
                </div>
              </div>
              : null
            }
          </div>
          : this.props.classChargesId ?
            <h6>Gives class charge: <strong><em>{this.props.classChargesName} ({this.props.classChargesTotal})</em></strong></h6>
            : null
        }
      </div>
      <div className='modal-footer'>
        <button className='text-green' onClick={this.handleEditSave}><Icon icon='fa fa-pencil'/> {this.state.edit ? 'Save' : 'Edit'}</button>
        <button className='text-red' onClick={this.handleDeleteCancel}><Icon icon='fa fa-remove'/> {this.state.edit ? 'Cancel' : 'Delete'}</button>
      </div>
    </section>
  },


  render() {
    let glyph = this.createGlyph(this.props.featureType);

    return (
      <ListItem name={this.props.name} glyph={glyph.icon} glyphCss={glyph.style} onClick={() => this.setState({ detail: true })}>
        <Modal id={`feature-item-${this.props.id}`} active={this.state.detail} content={this.content()} onDismiss={this.dismiss}/>
        <ConfirmModal active={this.state.confirm} onConfirm={this.confirm} message={this.state.message}/>
      </ListItem>
    )
  }
})