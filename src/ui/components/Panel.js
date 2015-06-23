'use strict';

var React = require('react/addons');
var cn = require('classnames');
var utils = require('../utils');

module.exports = React.createClass({
  displayName : 'Panel',

  getInitialState : function() {
    return ({
      active : false,
      headerHeight : 0,
      totalHeight : 0,
      closing : false
    })
  },


  componentDidMount : function() {
    var node = React.findDOMNode(this);
    var header = node.firstChild;
    var content = node.firstChild.nextElementSibling;
    var headerHeight;
    var totalHeight;

    content.addEventListener(utils.findTransitionEndEvent(), (ev) => {
      if (this.state.closing) {
        this.setState({ closing : false, active : false });
      }
    });

    headerHeight = header.getBoundingClientRect().height;
    totalHeight = headerHeight + content.getBoundingClientRect().height;

    this.setState({ headerHeight : headerHeight, totalHeight : totalHeight });
  },


  recalculate : function() {
    var node = React.findDOMNode(this);
    var header = node.firstChild;
    var content = node.firstChild.nextElementSibling;
    var headerHeight;
    var totalHeight;

    headerHeight = header.getBoundingClientRect().height;
    totalHeight = headerHeight + content.getBoundingClientRect().height;

    this.setState({ headerHeight : headerHeight, totalHeight : totalHeight });
  },


  toggle : function() {
    if (this.state.active) {
      this.setState({ closing : true });
    }
    else {
      this.setState({ active : true });
    }
  },


  renderHeader : function() {
    var css = cn({
      'panel-header-container' : true,
      'panel-active' : this.state.active
    })

    return (
      <div className={css} onClick={this.toggle}>
        {this.props.header || "Panel_Header"}      
      </div>
    );
  },


  renderContent : function() {
    var trans = this.state.closing ? -this.state.headerHeight : 0;
    var cssContent;
    var children;
    var style;
    
    style = {
      WebkitTransform : "translate3d(0," + trans + "px,0)",
      MozTransform    : "translate3d(0," + trans + "px,0)",
      msTransform     : "translate3d(0," + trans + "px,0)",
      OTransform      : "translate3d(0," + trans + "px,0)",
      transform       : "translate3d(0," + trans + "px,0)"
    };

    cssContent = cn({
      'panel-content-container' : true,
      'panel-active' : this.state.active && !this.state.closing
    });

    children = React.Children.map(this.props.children, (child) => {
      var props = {};

      props.recalculate = this.recalculate;

      return React.addons.cloneWithProps(child, props);
    })


    return (
      <div className={cssContent} style={style}>
        {children}    
      </div>
    );
  },


  render : function() {
    var containerStyle = {
      height : (this.state.active || this.state.closing) ? this.state.totalHeight : this.state.headerHeight
    };

    return (
      <div className='panel-container' style={containerStyle}>
        {this.renderHeader()}
        {this.renderContent()}
      </div>
    );
  }
})