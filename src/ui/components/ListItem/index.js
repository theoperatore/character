'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Modal from '../Modal';
import Icon from '../Icon';

export default React.createClass({
  displayName: 'ListItem',


  getInitialState() {
    return {
      edit: false,
      areYouSure: false,
      resolve: null
    }
  },


  getDefaultProps() {
    return {
      glyphCss: ''
    }
  },


  propTypes: {
    glyphCss: React.PropTypes.string,
    glyph: React.PropTypes.element,
    container: React.PropTypes.string,
    onDismiss: React.PropTypes.func.isRequired,
    id: React.PropTypes.string.isRequired
  },


  _open(ev) {
    this.setState({ edit : true });
    ev.preventDefault();
    ev.stopPropagation();
  },


  // don't close the confirmation dialog by tapping overlay
  noop() {},


  onDismiss() {
    let isDirty = this.props.onDismiss();

    if (isDirty) {
      if (!this.state.areYouSure) {
        this.setState({ areYouSure: true });
      }
    }
    else {
      this.setState({ edit: false });
      
    }
  },


  confirmCancel() {
    return new Promise(resolve => {
      this.setState({ areYouSure: true, resolve });
    })
  },


  dismiss() {
    this.handleYes();
  },


  handleYes() {
    if (this.state.resolve) {
      this.state.resolve('yes');
    }

    this.setState({
      areYouSure: false,
      edit: false,
      resolve: null
    });
  },


  handleNo() {
    if (this.state.resolve) {
      this.state.resolve('no');
    }

    this.setState({ areYouSure: false, resolve: null });
  },


  areYouSureContent() {
    return (
      <section>
        <div className='modal-header'>  
          <h3>Are You Sure?</h3>
        </div>
        <div className='modal-content'>
          <p>Do you really want to cancel and lose any unsaved changes?</p>
        </div>
        <div className='modal-footer'>
          <button onClick={this.handleYes} className='bg-green text-green'>
            <p>Yes</p>
          </button>
          <button onClick={this.handleNo} className='bg-red text-red'>
            <p>No</p>
          </button>
        </div>
      </section>
    )
  },


  render() {

    let glyph = this.props.glyph || <Icon icon='fa fa-cube' />;

    return (
      <div className='container-list-item' onClick={this._open}>
        <div className={`container-list-item-glyph ${this.props.glyphCss}`}>
          {glyph}
        </div>
        <div className='container-list-item-content'>
          <p>{this.props.title}</p>
        </div>
        <Modal ref='editContent' active={this.state.edit} id={this.props.id} content={this.props.modalContent} onDismiss={this.onDismiss} />
        <Modal active={this.state.areYouSure} id={`areYouSure-${this.props.id}`} content={this.areYouSureContent()} onDismiss={this.noop} />
      </div>
    )
  }
})