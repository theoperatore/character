'use strict';

import PropTypes from 'prop-types';

import React, { Component } from 'react';
import cn from 'classnames';
import Portal from '../Portal';

// TODO: should require some constants to find config identifiers for html;
// also see Modal/index.js
const appContainer = '.character-body';
const paneContainer = '.swiper-slide-active>.base-pane-container';

export default class extends React.Component {
  static displayName = 'Popup';

  static propTypes = {
    active: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    content: PropTypes.element.isRequired,
    overflowAppContainer: PropTypes.string,
    overflowPaneContainer: PropTypes.string,
  };

  static defaultProps = {
    active: false,
  };

  state = {
    active: false,
    moving: false,
    open: false,
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

  render() {
    let { id, content, children } = this.props;

    let overlay = cn({
      'modal-overlay': true,
      'modal-overlay-active': this.state.open
    })

    let container = cn({
      'popup-container': true,
      'popup-moving': this.state.moving,
      'popup-active': this.state.open,
    })

    return this.state.active 
      ? <Portal id={id}>
          <div className={overlay}>
            <div className={container}>
              { content }
              { children }
            </div>
          </div>
        </Portal>
      : null;
  }
}