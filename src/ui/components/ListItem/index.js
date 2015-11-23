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
      content: '',
      container: ''
    }
  },


  componentDidUpdate() {
    if (this.state.edit === true) {
      React.render(
        <Modal onDismiss={this.close} active={this.state.edit} container={this.props.container}>
          {this.props.content}
        </Modal>,
        document.querySelector('#modal')
      );
    }
    else if (this.state.edit === false) {
      React.unmountComponentAtNode(document.querySelector('#modal'));
    }
  },


  _open(ev) {
    if (this.state.edit !== true && this.props.content !== '') {
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
      </div>
    )
  }
})