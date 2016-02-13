'use strict';

import React from 'react';
import Icon from '../Icon';

export default React.createClass({
  displayName: 'ListItemV2',


  propTypes: {
    glyphCss: React.PropTypes.string,
    glyph: React.PropTypes.element,
    name: React.PropTypes.string.isRequired
  },


  getDefaultProps() {
    return {
      glyphCss: ''
    }
  },


  render() {
    let { glyph, glyphCss, name, children, ...props } = this.props;
    glyph = glyph || <Icon icon='fa fa-cube' />;

    return (
      <div className='container-list-item' {...props}>
        <div className={`container-list-item-glyph ${glyphCss}`}>
          {glyph}
        </div>
        <div className='container-list-item-content'>
          <p>{name}</p>
        </div>
        {children}
      </div>
    )
  }
})