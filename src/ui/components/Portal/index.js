'use strict';

import React, { Component } from 'react';
import reactDOM from 'react-dom';

export default React.createClass({
  displayName: 'Portal',


  portalContainer: null,


  propTypes: {
    id: PropTypes.string.isRequired
  },


  componentDidMount() {
    let portal = document.querySelector(`#${this.props.id}`);

    if (!portal) {
      portal = document.createElement('div');
      portal.id = this.props.id;


      this.portalContainer = portal;
      document.body.appendChild(this.portalContainer);

      portal = null;
    }

    this.renderPortal();
  },


  // unmount node from both React and DOM
  componentWillUnmount() {
    reactDOM.unmountComponentAtNode(this.portalContainer);
    document.body.removeChild(this.portalContainer);
  },


  componentDidUpdate() {
    this.renderPortal();
  },


  renderPortal() {
    reactDOM.render(<div className={this.props.className}>{this.props.children}</div>, this.portalContainer);
  },


  render() {
    return null;
  }
})
