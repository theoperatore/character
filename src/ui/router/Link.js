'use strict';

import React from 'react';
import Router from './Router';

module.exports = React.createClass({


  navigate : function() {
    var { href } = this.props;
    href = '#' + href.replace("#", "");

    Router.nav(href);
  },


  render : function() {
    var href = '#' + this.props.href.replace("#", "");

    return (
      <a href={href} onClick={this.navigate}>{this.props.children}</a>
    );
  }
})
