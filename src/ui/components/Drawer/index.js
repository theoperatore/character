import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import cn from 'classnames';
import Portal from '../Portal';

// TODO: should require some constants to find config identifiers for html;
// also see Modal/index.js
const appContainer = '.character-body';
const paneContainer = '.swiper-slide-active>.base-pane-container';

export default class Drawer extends Component {
  static propTypes =  {
    active: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    content: PropTypes.element.isRequired,
    onDismiss: PropTypes.func,
    direction: PropTypes.oneOf(['left', 'right']),
    overflowAppContainer: PropTypes.string,
    overflowPaneContainer: PropTypes.string,
  }

  static defaultProps = {
    active: false,
    direction: 'left',
    onDismiss() {},
  }

  state = {
    active: false,
    moving: false,
    open: false,
  }

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

  dismiss(ev) {
    if (ev.target === ReactDOM.findDOMNode(this.refs.overlay)) {
      ev.preventDefault();
      ev.stopPropagation();

      this.props.onDismiss();
    }
  }

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
}
