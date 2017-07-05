

import PropTypes from 'prop-types';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import cn from 'classnames';
import Portal from '../Portal';

// TODO: should require some constants to find config identifiers for html
// also see Popup/index.js
const appContainer = '.character-body';
const paneContainer = '.swiper-slide-active>.base-pane-container';

export default class extends React.Component {
  static displayName = 'Modal';

  static propTypes = {
    active: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    content: PropTypes.element.isRequired,
    onDismiss: PropTypes.func.isRequired,
    overflowAppContainer: PropTypes.string,
    overflowPaneContainer: PropTypes.string,
  };

  static defaultProps = {
    active: false
  };

  state = {
    active: false,
    open: false,
    moving: false
  };

  componentWillReceiveProps(nextProps) {
    let _appContainer = nextProps.overflowAppContainer || appContainer;
    let _paneContainer = nextProps.overflowPaneContainer || paneContainer;

    if (nextProps.active !== this.props.active && nextProps.active === true) {
      document.querySelector(_appContainer).style.overflow = 'hidden';
      document.querySelector(_paneContainer).style.overflow = 'hidden';
      this.setState({ active: true, moving: true }, () => {
        setTimeout(() => {
          this.setState({ open: true, moving: false });
        }, 100);
      })
    }
    else if (nextProps.active !== this.props.active && nextProps.active === false) {
      this.setState({ open: false, moving: true }, () => {
        setTimeout(() => {
          document.querySelector(_appContainer).style.overflow = 'auto';
          document.querySelector(_paneContainer).style.overflow = 'auto';
          this.setState({ active: false, moving: false });
        }, 300);
      })
    }
  }

  dismiss = (ev) => {
    if (ev.target === ReactDOM.findDOMNode(this.refs.overlay)) {
      ev.preventDefault();
      ev.stopPropagation();

      this.props.onDismiss();
    }
  };

  _dismiss = () => {
    this.props.onDismiss();
  };

  componentWillUnmount() {
    let app = document.querySelector(appContainer);
    let pane = document.querySelector(paneContainer);

    if (app) {
      app.style.overflow = 'auto';
    }

    if (pane) {
      pane.style.overflow = 'auto';
    }
  }

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
            { this.props.children }
          </div>
        </div>
      </Portal>
      : null)
  }
}
