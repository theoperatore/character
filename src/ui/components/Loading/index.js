'use strict';

import React from 'react';
import cn from 'classnames';
import Icon from '../Icon';

export default React.createClass({
  displayName: "LoadingOverlay",

  getDefaultProps() {
    return ({
      isLoading : false
    })
  },

  shouldComponentUpdate(nextProps) {
    return nextProps.isLoading !== this.props.isLoading;
  },

  render() {
    let css = cn({
      'loading-indicator-container' : true,
      'loading-active' : this.props.isLoading
    })

    return (
      <div className={css}>
        <span className='loading-animation'></span>
      </div>
    )
  }
})
