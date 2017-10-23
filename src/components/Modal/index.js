import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import cn from 'classnames';

import './index.css';

export default class Modal extends Component {
  static propTypes = {
    /** Set to true to show the modal */
    active: PropTypes.bool,
    onDismiss: PropTypes.func.isRequired,
  };

  static defaultProps = {
    active: false,
  };

  overlayRef = null;

  constructor(props) {
    super(props);

    this.el = document.createElement('div');
    this.el.classList.add('modal');

    this.state = {
      shouldRenderPortal: props.active,
      hasEntered: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    // if we need to take action...
    if (this.props.active !== nextProps.active) {

      // if we should be opening...
      if (nextProps.active) {
        this.addtoDom();

        this.setState(
          { shouldRenderPortal: true },
          () => setTimeout(
            () => this.setState({ hasEntered: true }),
            100
          )
        );
      }

      // if we should be closing...
      else {
        this.setState(
          { hasEntered: false },
          () => setTimeout(
            () => this.setState(
              { shouldRenderPortal: false },
              this.removeFromDom
            ),
            300
          )
        );
      }
    }
  }

  componentWillUnmount() {
    this.removeFromDom();
    this.el = null;
  }

  handleClick = e => e.target === this.overlayRef && this.props.onDismiss();
  handleEsc = e => e.keyCode === 27 && this.props.onDismiss();

  addtoDom = () => {
    document.body.style.overflow = 'hidden';
    document.body.appendChild(this.el);
    window.addEventListener('keydown', this.handleEsc);
  }

  removeFromDom = () => {
    document.body.style.overflow = 'inherit';
    if (document.body.contains(this.el)) {
      document.body.removeChild(this.el);
    }
    window.removeEventListener('keydown', this.handleEsc);
  }

  render() {
    const { hasEntered, shouldRenderPortal } = this.state;
    const css = cn('modal_overlay', {
      'modal_overlay--events': true,
      'modal_overlay--enter': hasEntered,
    });

    if (!shouldRenderPortal) return null;

    return createPortal(
      (<div ref={e => (this.overlayRef = e)} className={css} onClick={this.handleClick}>
        {this.props.children}
      </div>),
      this.el
    );
  }
}
