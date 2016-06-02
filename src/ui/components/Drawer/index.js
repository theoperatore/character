'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import cn from 'classnames';
import Portal from '../Portal';

// TODO: should require some constants to find config identifiers for html;
// also see Modal/index.js
const appContainer = '.character-body';
const paneContainer = '.swiper-slide-active>.base-pane-container';

export default React.createClass({
  displayName: 'Drawer',

  propTypes: {
    active: React.PropTypes.bool.isRequired,
    id: React.PropTypes.string.isRequired,
    content: React.PropTypes.element.isRequired,
    onDismiss: React.PropTypes.func,
    direction: React.PropTypes.oneOf(['left', 'right']),
  },

  getInitialState() {
    return {
      active: false,
      moving: false,
      open: false,
    };
  },

  getDefaultProps() {
    return {
      active: false,
      direction: 'left',
      onDismiss() {},
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

  render() {
    let { id, content } = this.props;

    let overlay = cn({
      'modal-overlay': true,
      'modal-overlay-active': this.state.open
    })

    let container = cn({
      'drawer-container': true,
      'drawer-moving': this.state.moving,
      'drawer-active': this.state.open,
      'from-left': this.props.direction === 'left',
      'from-right': this.props.direction === 'right',
    })

    let drawerOverlay = cn({
      'from-left': this.props.direction === 'left',
      'from-right': this.props.direction === 'right',
    })

    return this.state.active 
      ? <Portal id={id} className={drawerOverlay}>
          <div ref='overlay' className={overlay} onClick={this.dismiss}>
            <div className={container}>
              { content }
            </div>
          </div>
        </Portal>
      : null;
  }
})