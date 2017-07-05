'use strict';

import React, { Component } from 'react';
import SegmentedProgressBar from '../../../components/SegmentedProgressBar';
import Icon from '../../../components/Icon';

export default React.createClass({
  displayName: 'ClassChargeItem',

  propTypes: {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    charges: PropTypes.number.isRequired,
    current: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
  },

  useCharge() {
    let data = { id: this.props.id };
    this.props.onChange({ type: 'CLASS_CHARGE_DECREMENT', data });
  },

  addCharge() {
    let data = { id: this.props.id };
    this.props.onChange({ type: 'CLASS_CHARGE_INCREMENT', data });
  },

  render() {
    let {
      name,
      current,
      charges
    } = this.props;

    return (
      <div className='class-charges-container'>
        <h6>{name}<small>{`${current} / ${charges}`}</small></h6>
        <div className='flex'>
          <div className='p1 pr3' onClick={this.useCharge}>
            <Icon icon='fa fa-chevron-left'/>
          </div>
          <SegmentedProgressBar
            className='flex-auto mt1'
            segments={charges}
            current={current}
          />
          <div className='p1 pl3' onClick={this.addCharge}>
            <Icon icon='fa fa-chevron-right'/>
          </div>
        </div>
      </div>
    );
  },
})