'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import cn from 'classnames';

export default React.createClass({
  displayName: 'Modal',


  getInitialState() {
    return {
      open: false
    }
  },


  getDefaultProps() {
    return {
      onDismiss: () => {},
      container: ''
    }
  },


  dismiss(ev) {
    if (ev.target === ReactDOM.findDOMNode(this.refs.overlay)) {
      ev.preventDefault();
      ev.stopPropagation();

      if (this.props.checkDismiss) {
        let result = this.props.checkDismiss();
        if (result) {
          this._close();
        }
      }
      else {
        this._close();    
      }
    }
  },


  _close() {
    this.setState({ open: false }, () => {
      document.querySelector(this.props.container).style.overflow = 'auto';
      setTimeout(() => {
        this.props.onDismiss();
      }, 300);
    })
  },


  componentDidMount() {
    document.querySelector(this.props.container).style.overflow = 'hidden';
    setTimeout(() => {
      this.setState({ open: true });
    }, 100);
  },


  componentWillUnmount() {
    document.querySelector(this.props.container).style.overflow = 'auto';
  },


  componentWillReceiveProps(nextProps) {
    if (nextProps.active !== undefined && nextProps.active === false) {
      this._close();
    }
  },


  render() {
    let css = cn({
      'modal-overlay': true,
      'modal-overlay-active': this.state.open
    })

    let container = cn({
      'modal-content-container': true,
      'modal-content-active': this.state.open
    })

    return (
      <div ref='overlay' className={css} onClick={this.dismiss}>
        <div ref='content' className={container}>
          {this.props.children}
        </div>
      </div>
    )
  }
})