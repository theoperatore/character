'use strict';

import React from 'react';
import cn from 'classnames';

module.exports = React.createClass({
  displayName : 'Button',


  getDefaultProps : function() {
    return ({
      size : 'md'
    })
  },


  render : function() {
    let { size, style, children, ...props } = this.props;
    let css = cn({
      'button' : true,
      'button-sm' : size === 'sm',
      'button-md' : size === 'md',
      'button-lg' : size === 'lg',
      'button-sq' : size === 'sq',
      'button-bl' : style === 'blue',
      'button-gr' : style === 'green',
      'button-rd' : style === 'red',
      'button-gd' : style === 'gold'
    })

    return (
      <button className={css} {...props}>{children}</button>
    )
  }
})
