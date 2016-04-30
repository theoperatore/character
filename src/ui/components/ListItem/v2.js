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
      children,
      className,
      ...props
    } = this.props;

    return (
      <div className={`container-list-item ${className}`} {...props}>
        {
          glyph 
          ? <div className={`container-list-item-glyph ${glyphCss}`}>
              {glyph}
            </div>
          : null
        }
        <div className='container-list-item-content'>
          <p className='list-item-text'>{name}</p>
          <p className='list-item-subtext'>{subtext}</p>
        </div>
        {children}
      </div>
    )
  }
})