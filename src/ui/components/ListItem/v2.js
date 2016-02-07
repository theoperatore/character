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

    let glyph = this.props.glyph || <Icon icon='fa fa-cube' />;

    return (
      <div className='container-list-item'>
        <div className={`container-list-item-glyph ${this.props.glyphCss}`}>
          {glyph}
        </div>
        <div className='container-list-item-content'>
          <p>{this.props.name}</p>
        </div>
      </div>
    )
  }
})