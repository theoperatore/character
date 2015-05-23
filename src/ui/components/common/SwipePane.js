'use strict';

var React = require('react/addons');

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