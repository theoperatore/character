'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import cn from 'classnames';
import Portal from '../Portal';

// TODO: should require some constants to find config identifiers for html
const appContainer = '.character-body';
const paneContainer = '.swiper-slide-active>.base-pane-container';

export default React.createClass({
  displayName: 'ModalV2',


  propTypes: {
    active: React.PropTypes.bool.isRequired,
    id: React.PropTypes.string.isRequired,
    content: React.PropTypes.element.isRequired,
    onDismiss: React.PropTypes.func.isRequired
  },


  getInitialState() {
    return {
      active: false,
      open: false,
      moving: false
    }
  },


  getDefaultProps() {
    return {
      active: false
    }
  },


  componentWillReceiveProps(nextProps) {
    if (nextProps.active !== this.props.active && nextProps.active === true) {
      document.querySelector(appContainer).style.overflow = 'hidden';
      document.querySelector(paneContainer).style.overflow = 'hidden';
      this.setState({ active: true, moving: true }, () => {
        setTimeout(() => {
          this.setState({ open: true, moving: false });
        }, 100);
      })
    }
    else if (nextProps.active !== this.props.active && nextProps.active === false) {
      this.setState({ open: false, moving: true }, () => {
        setTimeout(() => {
          document.querySelector(appContainer).style.overflow = 'auto';
          document.querySelector(paneContainer).style.overflow = 'auto';
          this.setState({ active: false, moving: false });
        }, 300);
      }) 
    }
  },


  dismiss(ev) {
    if (ev.target === ReactDOM.findDOMNode(this.refs.overlay)) {
      ev.preventDefault();
      ev.stopPropagation();

      this.props.onDismiss();
    }
  },


  _dismiss() {
    this.props.onDismiss();
  },


  render() {
    let css = cn({
      'modal-overlay': true,
      'modal-overlay-active': this.state.open
    })

    let container = cn({
      'modal-content-container': true,
      'modal-content-transitioning': this.state.moving,
      'modal-content-active': this.state.open
    })

    return (this.state.active ?
      <Portal id={this.props.id}>
        <div ref='overlay' className={css} onClick={this.dismiss}>
          <div ref='content' className={container}>
            {React.cloneElement(this.props.content, { parentDismiss: this._dismiss })}
          </div>
        </div>
      </Portal>
      : null)
  }
})