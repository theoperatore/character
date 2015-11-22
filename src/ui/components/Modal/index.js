'use strict';

import React from 'react/addons';
import cn from 'classnames';

export default React.createClass({
  displayName: 'Modal',


  getInitialState() {
    return {
      transition: false,
      open: false
    }
  },


  getDefaultProps() {
    return {
      onDismiss: () => {},
      active: false
    }
  },


  dismiss(ev) {
    if (ev.target === React.findDOMNode(this.refs.overlay)) {
      this.props.onDismiss();
      ev.preventDefault();
      ev.stopPropagation();
    }
  },


  componentWillReceiveProps(nextProps) {
    if (nextProps.active === true) {
      this.setState({ transition: true }, () => {
        setTimeout(() => {
          this.setState({ open: true });
        }, 100)
      })
    }
    else {
      this.setState({ open: false }, () => {
        setTimeout(() => {
          this.setState({ transition: false })
        }, 300)
      })
    }
  },


  componentDidUpdate() {
    if (this.props.active === false) {
      document.querySelector('.main-content').style.overflow = 'auto';
      return;
    }

    document.querySelector('.main-content').style.overflow = 'hidden';
  },


  render() {
    let css = cn({
      'modal-overlay': true,
      'modal-overlay-transition': this.state.transition,
      'modal-overlay-active': this.state.open
    })

    let container = cn({
      'modal-content-container': true,
      'modal-content-transition': this.state.transition,
      'modal-content-active': this.state.open
    })

    let content = this.state.transition || this.state.open ?
      <div ref='overlay' className={css} onClick={this.dismiss}>
        <div ref='content' className={container}>
          {this.props.children}
        </div>
      </div> : React.DOM.noscript();

    return content;
  }
})