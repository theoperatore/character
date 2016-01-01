'use strict';

var React = require('react');

module.exports = React.createClass({
  displayName : "SwipePane",
  render : function() {
    return (
      <div className="swiper-slide">
        {this.props.children}
      </div>
    )
  }
})