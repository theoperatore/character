'use strict';

var React = require('react/addons');
var classnames = require('classnames');
var Popover = require('../Popover');
var StatPopover = require('../../popovers/StatPopover');

module.exports = React.createClass({
  displayName : "Stat",


  getDefaultProps : function() {
    return ({
      title : 'stat',
      subtitle : '',
      score : 0,
      background : false,
      color : 'blue',
      trained : false,
      width : 1,
      popover : false,
      onPopoverChange : () => {}
    })
  },


  shouldComponentUpdate : function(nextProps) {
    return (
      nextProps.score !== this.props.score ||
      nextProps.title !== this.props.title ||
      nextProps.trained !== this.props.trained ||
      nextProps.subtitle !== this.props.subtitle
    );
  },


  render : function() {
    var css = classnames({
      'stat-content' : true,
      'stat-background' : this.props.background,
      'bg-blue' : this.props.background && this.props.color === 'blue',
      'bg-green' : this.props.background && this.props.color === 'green',
      'text-blue' : this.props.background && this.props.color === 'blue',
      'text-green' : this.props.background && this.props.color === 'green',
      'stat-trained' : this.props.trained,
      'stat-width-full' : this.props.width !== 1
    });

    var container = classnames({
      'stat-container' : true,
      'stat-width-2' : this.props.width === 2,
      'stat-width-3' : this.props.width === 3,
      'stat-width-4' : this.props.width === 4,
      'stat-width-34' : this.props.width === 34
    })

    var popover = <StatPopover
                    onChange={this.props.onPopoverChange}
                    label='Enter a new value'
                    stat={this.props.score}
                    checked={this.props.trained}>
                  </StatPopover>


    return (
      <Popover popover={popover} css={container}>
        <div className="stat-title">
          <p><strong>{this.props.title}</strong></p>
        </div>
        <div className={css}>
          <p>{this.props.score}</p>
        </div>
        <div className="stat-subtitle">
          <p>{this.props.subtitle}</p>
        </div>
      </Popover>
    )
  }
})
