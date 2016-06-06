'use strict';

import React from 'react';
import Router from './Router';

export default React.createClass({


  navigate() {
    if (this.props.disabled !== undefined && this.props.disabled === true) {
      return;
    }

    let { href } = this.props;
    href = '#' + href.replace("#", "");

    Router.nav(href);
  },


  render : function() {
    let href = '#' + this.props.href.replace("#", "");
    let className = this.props.className;
    return (
      <span
        className={className}
        onClick={this.navigate}
      >{this.props.children}</span>
    );
  }
})
