import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';

export default class ListItemV2 extends Component {
  static propTypes = {
    glyphCss: PropTypes.string,
    glyph: PropTypes.element,
    name: PropTypes.node.isRequired,
    subtext: PropTypes.node,
    addon: PropTypes.element,
  }

  static defaultProps = {
    glyphCss: '',
    // glyph: <Icon icon='fa fa-cube' />
  }

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
}
