'use strict';

import PropTypes from 'prop-types';

import React, { Component } from 'react';

export default class extends React.Component {
  static displayName = 'SegmentedProgressBar';

  static propTypes = {
    segments: PropTypes.number.isRequired,
    current: PropTypes.number.isRequired
  };

  render() {
    let segmentStyle = {
      width: this.props.segments > 0 ? `${(100 / this.props.segments)}%` : '100%'
    }

    // create segments with proper active css class
    let segments = [];
    segments.length = this.props.segments;
    segments = segments.fill(1).map((n, i) => {
      return <div key={i} style={segmentStyle} className={`segment ${i < this.props.current ? 'filled' : ''}`}></div>
    })

    let { className } = this.props;

    return (
      <div className={`${className} segmented-progress-bar-container`}>
        {segments}
      </div>
    )
  }
}