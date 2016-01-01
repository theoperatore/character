'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Modal from '../Modal';
import Icon from '../Icon';

export default React.createClass({
  displayName: 'ListItemV2',


  getInitialState() {
    return {}
  },


  getDefaultProps() {
    return {
      glyphCss: ''
    }
  },


  propTypes: {
    glyphCss: React.PropTypes.string,
    container: React.PropTypes.string,
    onDismiss: React.PropTypes.func,
    id: React.PropTypes.string.isRequired
  },


  _open(ev) {
    this.setState({ edit : true });
    ev.preventDefault();
    ev.stopPropagation();
  },


  onDismiss() {
    if (this.props.onDismiss) {
      let result = this.props.onDismiss();
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

    return (
      <div className='container-list-item' onClick={this._open}>
        <div className={`container-list-item-glyph ${this.props.glyphCss}`}>
          {glyph}
        </div>
        <div className='container-list-item-content'>
          <p>{this.props.title}</p>
        </div>
        <Modal active={this.state.edit} id={this.props.id} content={this.props.modalContent} onDismiss={this.onDismiss} />
      </div>
    )
  }
})