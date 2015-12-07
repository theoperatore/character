'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Modal from '../Modal';
import Icon from '../Icon';

export default React.createClass({
  displayName: 'ListItem',


  getInitialState() {
    return {
      edit: false
    }
  },


  getDefaultProps() {
    return {
      glyphCss: '',
      container: '.character-body'
    }
  },


  propTypes: {
    glyphCss: React.PropTypes.string,
    container: React.PropTypes.string,
    checkDismiss: React.PropTypes.func
  },


  _open(ev) {
    if (this.state.edit !== true && this.props.children) {
      this.setState({ edit : true });
      ev.preventDefault();
      ev.stopPropagation();
    }
  },


  checkDismiss() {
    if (this.props.checkDismiss) {
      let result = this.props.checkDismiss();
      if (result) {
        this.setState({ edit: false });
      }

      return result;
    }

    this.setState({ edit: false });
    return true;
  },


  _dismiss() {
    this.setState({ edit: false });
  },


  render() {

    let glyph = this.props.glyph || <Icon icon='fa fa-cube' />;
    let children = React.Children.map(this.props.children, child => React.cloneElement(child, { dismiss: this._dismiss }));

    return (
      <Modal active={this.state.edit} container={this.props.container} modalContent={children} checkDismiss={this.checkDismiss}>
        <div className='container-list-item' onClick={this._open}>
          <div className={`container-list-item-glyph ${this.props.glyphCss}`}>
            {glyph}
          </div>
          <div className='container-list-item-content'>
            <p>{this.props.title}</p>
          </div>
        </div>
      </Modal>
    )
  }
})