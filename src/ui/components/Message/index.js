'use strict';

import React, { Component } from 'react';
import classnames from 'classnames';
import Icon from '../Icon';

module.exports = React.createClass({
  displayName : "Message",


  getDefaultProps : function() {
    return ({
      type : "info",
      message : ""
    })
  },


  render : function() {
    let css = classnames({
      'message-container' : true,
      'message-alert' : (this.props.type === 'alert'),
      'message-info' : (this.props.type === 'info'),
      'message-success' : (this.props.type === 'success'),
      'message-warn' : (this.props.type === 'warn'),
      'message-hide' : (this.props.message === "")
    });

    let glyph;
    switch (this.props.type) {
      case 'warn':
      case 'alert':
        glyph = <Icon icon='fa fa-exclamation-triangle'/>
        break;
      case 'success':
      case 'info':
      default:
        glyph = <Icon icon='fa fa-info-circle'/>
    } 

    return (
      <div className={css}>
        <div className='message-content'>
          {glyph}
          <span className='ml1'>{this.props.message}</span>
        </div>
      </div>
    )
  }
})