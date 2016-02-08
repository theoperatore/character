'use strict';

import React from 'react';

export default React.createClass({
  displayName: 'SegmentedProgressBar',


  propTypes: {
    segments: React.PropTypes.number.isRequired,
    current: React.PropTypes.number.isRequired
  },


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

    return (
      <div className='segmented-progress-bar-container'>
        {segments}
      </div>
    )
  }
})