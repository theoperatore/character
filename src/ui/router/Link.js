'use strict';

import React from 'react';
import Router from './Router';

module.exports = React.createClass({


  navigate : function() {
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
