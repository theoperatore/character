'use strict';

import React from 'react';
import classnames from 'classnames';

module.exports = React.createClass({
  displayName : "Message",


  getDefaultProps : function() {
    return ({
      type : "info",
      message : ""
    })
  },


  render : function() {
    var css = classnames({
      'message-container' : true,
      'message-alert' : (this.props.type === 'alert'),
      'message-info' : (this.props.type === 'info'),
      'message-success' : (this.props.type === 'success'),
      'message-warn' : (this.props.type === 'warn'),
      'message-hide' : (this.props.message === "")
    });

    return (
      <div className={css}>
        <div className='message-content'>
          {this.props.message}
        </div>
      </div>
    )
  }
})