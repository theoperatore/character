import React, { Component } from 'react';
import cn from 'classnames';
import Icon from '../Icon';

export default class LoadingOverlay extends Component {
  static defaultProps = {
    isLoading: false
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.isLoading !== this.props.isLoading;
  }

  render() {
    let css = cn({
      'loading-indicator-container' : true,
      'loading-active' : this.props.isLoading
    })

    return (
      <div className={css}>
        <span className='loading-animation-top'></span>
        <span className='loading-animation-middle'></span>
        <span className='loading-animation-bottom'></span>
      </div>
    )
  }
}
