'use strict';

import React from 'react/addons';
import Modal from '../Modal';

export default React.createClass({
  displayName: 'ListItem',


  getInitialState() {
    return {
      edit: false
    }
  },


  getDefaultProps() {
    return {
      glyph: '',
      glyphCss: '',
      content: ''
    }
  },


  _open(ev) {
    if (this.state !== true && this.props.content !== '') {
      this.setState({ edit : true });
      ev.preventDefault();
      ev.stopPropagation();
    }
  },


  close() {
    this.setState({ edit : false });
  },


  render() {
    return (
      <div className='container-list-item' onClick={this._open}>
        <div className={`container-list-item-glyph ${this.props.glyphCss}`}>
          {this.props.glyph}
        </div>
        <div className='container-list-item-content'>
          {this.props.children}
        </div>
        <Modal onDismiss={this.close} active={this.state.edit}>
          {this.props.content}
        </Modal>
      </div>
    )
  }
})