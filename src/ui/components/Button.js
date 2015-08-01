'use strict';

var React = require('react/addons');
var cn = require('classnames');

module.exports = React.createClass({
  displayName : 'Button',


  getDefaultProps : function() {
    return ({
      size : 'md'
    })
  },


  render : function() {
    var { size, style, children, ...props } = this.props;
    var css = cn({
      'button' : true,
      'button-sm' : size === 'sm',
      'button-md' : size === 'md',
      'button-lg' : size === 'lg',
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
