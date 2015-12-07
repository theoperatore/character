'use strict';

var React = require('react');
var cn = require('classnames');

module.exports = React.createClass({
  displayName : "LoadingOverlay",


  getDefaultProps : function() {
    return ({
      isLoading : false
    })
  },


  shouldComponentUpdate : function(nextProps) {
    return nextProps.isLoading !== this.props.isLoading;
  },


  render : function() {
    var css = cn({
      'loading-indicator-container' : true,
      'loading-active' : this.props.isLoading
    })

    return (
      <div className={css}></div>
    )
  }
})
