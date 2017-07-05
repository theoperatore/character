import PropTypes from 'prop-types';
import React, { Component } from 'react';

import ReactDOM from 'react-dom';
import cn from 'classnames';

export default class HPCounter extends Component {
  static propTypes = {
    maximum: PropTypes.number.isRequired,
    current: PropTypes.number.isRequired,
    temporary: PropTypes.number.isRequired
  }

  state = {
    hp: 0,
    tempHp: 0
  }

  tempInterval = null;
  hpInterval = null;
  tempPromise = null;
  hpPromise = null;
  maxWidth = 0;

  componentDidMount() {
    this.animateTempHpCounting(this.props.temporary);
    this.animateHpCounting(this.props.current);
    this.maxWidth = ReactDOM.findDOMNode(this).getBoundingClientRect().width;
  }

  componentWillReceiveProps(nextProps) {
    this.maxWidth = ReactDOM.findDOMNode(this).getBoundingClientRect().width;
    if (nextProps.current !== this.props.current && nextProps.temporary === this.props.temporary) {
      clearInterval(this.hpInterval);
      if (this.hpPromise) {
        this.hpPromise();
      }
      this.animateHpCounting(nextProps.current);
      return;
    }

    if (nextProps.current === this.props.current && nextProps.temporary !== this.props.temporary) {
      clearInterval(this.tempInterval);
      if (this.tempPromise) {
        this.tempPromise();
      }
      this.animateTempHpCounting(nextProps.temporary);
      return;
    }

    if (nextProps.current !== this.props.current && nextProps.temporary !== this.props.temporary) {
      clearInterval(this.tempInterval);
      clearInterval(this.hpInterval);
      if (this.tempPromise) {
        this.tempPromise();
      }
      if (this.hpPromise) {
        this.hpPromise();
      }
      this.animateTempHpCounting(nextProps.temporary).then(() => {
        this.animateHpCounting(nextProps.current);
      });
      return;
    }
  }

  animateTempHpCounting(nextTemp) {
    return new Promise(resolve => {
      let dist = Math.abs(nextTemp - this.state.tempHp);
      let direction = nextTemp < this.state.tempHp ? 'neg' : 'pos';

      this.tempPromise = resolve;
      this.tempInterval = setInterval(() => {
        if (dist === 0) {
          clearInterval(this.tempInterval);
          this.tempPromise();
          return;
        }

        let tempHp = this.state.tempHp + (1 * (direction === 'pos' ? 1 : -1));
        dist -= 1;
        this.setState({ tempHp });
      }, 20)
    })
  }

  animateHpCounting(nextHp) {
    return new Promise(resolve => {
      let dist = Math.abs(nextHp - this.state.hp);
      let direction = nextHp < this.state.hp ? 'neg' : 'pos';

      this.hpPromise = resolve;
      this.hpInterval = setInterval(() => {
        if (dist === 0) {
          this.hpPromise();
          clearInterval(this.hpInterval);
          return;
        }

        let hp = this.state.hp + (1 * (direction === 'pos' ? 1 : -1));
        dist -= 1;
        this.setState({ hp });
      }, 20)
    })
  }

  render() {
    let hpCss = cn({
      'hp-counter-count': true,
      'text-red': this.state.hp < Math.round(this.props.maximum / 3),
      'text-gold': this.state.hp <= Math.round(2 * this.props.maximum / 3) && this.state.hp >= Math.round(this.props.maximum / 3),
      'text-green': this.state.hp > Math.round(2 * this.props.maximum / 3),
      'pulse': this.state.hp < Math.round(this.props.maximum / 4)
    })

    let tempCss = cn({
      'hp-counter-count': true,
      'text-blue': this.state.tempHp !== 0
    })

    let hpBarCss = cn({
      'hp-counter-progress-bar': true,
      'border-bad': this.state.hp < Math.round(this.props.maximum / 3),
      'border-warning': this.state.hp <= Math.round(2 * this.props.maximum / 3) && this.state.hp >= Math.round(this.props.maximum / 3),
      'border-good': this.state.hp > Math.round(2 * this.props.maximum / 3)
    })

    let tempBarCss = cn({
      'hp-counter-stacked-progress-bar': true,
      'border-blue': true
    })

    let hpStyle = {
      width: Math.max(0, Math.min(Math.round((this.props.current / this.props.maximum) * this.maxWidth), this.maxWidth))
    }

    let tempStyle = {
      width: Math.max(0, Math.min(Math.round((this.props.temporary / this.props.maximum) * this.maxWidth), this.maxWidth))
    }

    return (
      <div className='hp-counter-container'>
        <h6 className='hp-counter-header'>Hit Points</h6>
        <div className={hpBarCss} style={hpStyle}></div>
        <div className={tempBarCss} style={tempStyle}></div>
        <div className={this.state.tempHp === 0 ? hpCss : tempCss}>{this.state.tempHp === 0 ? this.state.hp : this.state.tempHp}</div>
        <h6>{this.props.temporary === 0 ? ` / ${this.props.maximum}` : 'temporary'}</h6>
      </div>
    )
  }
}
