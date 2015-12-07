'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import ModalComponent from './modal-component';

export default React.createClass({
  displayName: 'Modal',


  getInitialState() {
    return ({
      active: false
    })
  },


  getDefaultProps() {
    return ({
      active: false,
      container: ''
    })
  },


  componentWillReceiveProps(nextProps) {
    if (nextProps.active !== undefined || nextProps.active !== null) {
      this.setState({ active: nextProps.active });
    }
  },


  toggle() {
    this.setState({ active: !this.state.active });
  },


  _dismiss() {
    if (this.props.checkDismiss) {
      let result = this.props.checkDismiss();
      if (result) {
        this.setState({ active: false });
        return;
      }
    }

    this.setState({ active: false });
  },


  componentDidUpdate() {
    if (this.state.active === true && this.props.modalContent) {
      ReactDOM.render(
        <ModalComponent onDismiss={this._dismiss} active={this.state.active} container={this.props.container}>
          {this.props.modalContent}
        </ModalComponent>,
        document.querySelector('#details')
      );
    }
    else if (this.state.active === false) {
      ReactDOM.unmountComponentAtNode(document.querySelector('#details'));
    }
  },


  render() {
    return this.props.children;
  }
})