'use strict';

var React = require('react');

module.exports = React.createClass({
  displayName : "SwipePane",
  render : function() {
    return (
      <div className="swiper-slide">
        <div className='base-pane-container'>
          {this.props.children}
        </div>
      </div>
    )
  }
})