'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Swiper from 'swiper';

let swipe;

module.exports = class extends React.Component {
  static displayName = "SwipePanes";

  componentDidUpdate() {
    swipe.onResize();
    swipe.slideTo(this.props.activeIdx);
  }

  componentDidMount() {
    let mount = ReactDOM.findDOMNode(this);
    let { activeIdx, ...opts } = this.props;

    let height = document.querySelector('.character-body').getBoundingClientRect().height;
    document.querySelector('.swiper-container').style.height = `${height}px`;
    document.querySelector('.swiper-wrapper').style.height = `${height}px`;

    swipe = new Swiper(mount, opts);
  }

  componentWillUnmount() {
    swipe.destroy(true, true);
    swipe = null;
  }

  render() {
    return (
      <div className="swiper-container">
        <div className="swiper-wrapper">
          {this.props.children}
        </div>
      </div>
    )
  }
}
