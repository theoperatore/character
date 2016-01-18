'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Icon from '../Icon';

export default React.createClass({
  displayName: 'SkillItem',

  // this component should not know anything about calculating scores
  // only that it must display a skill's score.
  // the calculation of what that score is should be done elsewhere
  propTypes: {
    name: React.PropTypes.string.isRequired,
    score: React.PropTypes.number.isRequired,
    trained: React.PropTypes.bool.isRequired,
    ability: React.PropTypes.string.isRequired,
    maxScore: React.PropTypes.number.isRequired
  },


  getInitialState() {
    return {
      maxWidth: 0
    }
  },


  componentDidMount() {
    let maxWidth = ReactDOM.findDOMNode(this).getBoundingClientRect().width - 20;
    this.setState({ maxWidth });
  },


  componentWillReceiveProps() {
    let maxWidth = ReactDOM.findDOMNode(this).getBoundingClientRect().width - 20;
    this.setState({ maxWidth });
  },


  render() {
    let style = {
      width: Math.floor((this.props.score / this.props.maxScore) * this.state.maxWidth)
    }


    return (
      <div className={`container-list-item ${this.props.trained ? 'proficient' : ''}`}>
        <span className={`skill-item-bar border-${this.props.ability}`} style={style} ></span>
        <div className={`container-list-item-glyph text-${this.props.ability}`}>
          <Icon icon='fa fa-cube' />
        </div>
        <div className='container-list-item-content'>
          <span className='skill-item-name'>{this.props.name}</span>
        </div>
        <div className='container-list-item-content skill-item-score-container pull-right'>
          <span className='skill-item-score'>{this.props.score}</span>
        </div>
      </div>
    )
  }
})