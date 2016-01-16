'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Swiper from 'swiper';

let swipe;

module.exports = React.createClass({
  displayName : "SwipePanes",


  componentDidUpdate : function() {
    // let height = document.querySelector('.swiper-slide-active>.pane-container').getBoundingClientRect().height;

    swipe.slideTo(this.props.activeIdx);

    // document.querySelector('.swiper-container').style.height = `${height}px`;
    // document.querySelector('.swiper-wrapper').style.height = `${height}px`;
  },


  _slideChangeStart() {
    let height = document.querySelector('.swiper-slide-active>.pane-container').getBoundingClientRect().height;

    document.querySelector('.swiper-container').style.height = `${height}px`;
    document.querySelector('.swiper-wrapper').style.height = `${height}px`;
  },


  componentDidMount : function() {
    let mount = ReactDOM.findDOMNode(this);
    let { activeIdx, ...opts } = this.props;

    // opts.onSlideChangeStart = this._slideChangeStart;
    let height = document.querySelector('.character-body').getBoundingClientRect().height;
    document.querySelector('.swiper-container').style.height = `${height}px`;
    document.querySelector('.swiper-wrapper').style.height = `${height}px`;

    swipe = new Swiper(mount, opts);
  },


  render : function() {
    return (
      <div className="swiper-container">
        <div className="swiper-wrapper">
          {this.props.children}
        </div>
      </div>
    )
  }
})
