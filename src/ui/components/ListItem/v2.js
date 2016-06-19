'use strict';

import React from 'react';
import Icon from '../Icon';

export default React.createClass({
  displayName: 'ListItemV2',


  propTypes: {
    glyphCss: React.PropTypes.string,
    glyph: React.PropTypes.element,
    name: React.PropTypes.node.isRequired,
    subtext: React.PropTypes.node,
    addon: React.PropTypes.element,
  },


  getDefaultProps() {
    return {
      glyphCss: '',
      // glyph: <Icon icon='fa fa-cube' />
    }
  },


  render() {
    let { 
      glyph,
      glyphCss,
      name,
      subtext,
      addon,
      children,
      className,
      onClick,
      ...props
    } = this.props;

    return (
      <div className={`container-list-item flex flex-center ${className}`} {...props}>
        {
          glyph 
          ? <div className={`container-list-item-glyph ${glyphCss}`} onClick={onClick}>
              {glyph}
            </div>
          : null
        }
        <div className='container-list-item-content flex-auto' onClick={onClick}>
          <p className='list-item-text'>{name}</p>
          <p className='list-item-subtext'>{subtext}</p>
        </div>
        <div className='container-list-item-addon'>{addon}</div>
        {children}
      </div>
    )
  }
})