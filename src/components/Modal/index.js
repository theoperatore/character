import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import cn from 'classnames';

import './index.css';

export default class Modal extends Component {
  static propTypes = {
    onDismiss: PropTypes.func.isRequired,
    /** use flex centering and css transition on enter with dark overlay */
    animateOverlay: PropTypes.bool,
  };

  static defaultProps = {
    animateOverlay: true,
  };

  overlayRef = null;

  constructor(props) {
    super(props);

    this.el = document.createElement('div');
    this.el.classList.add('modal');

    this.state = {
      hasEntered: false,
    };
  }

  componentDidMount() {
    document.body.style.overflow = 'hidden';
    document.body.appendChild(this.el);

    window.addEventListener('keydown', this.handleEsc);

    setTimeout(() => {
      this.setState({ hasEntered: true });
    }, 100);
  }

  componentWillUnmount() {
    document.body.style.overflow = 'inherit';
    document.body.removeChild(this.el);
    window.removeEventListener('keydown', this.handleEsc);
    this.el = null;
  }

  handleClick = e => e.target === this.overlayRef && this.props.onDismiss();
  handleEsc = e => e.keyCode === 27 && this.props.onDismiss();

  render() {
    const { animateOverlay } = this.props;
    const { hasEntered } = this.state;
    const css = cn('modal_overlay', {
      'modal_overlay--events': animateOverlay,
      'modal_overlay--enter': hasEntered,
    });

    return createPortal(
      (<div ref={e => (this.overlayRef = e)} className={css} onClick={this.handleClick}>
        {this.props.children}
      </div>),
      this.el
    );
  }
}
