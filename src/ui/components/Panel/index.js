'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var cn = require('classnames');
var utils = require('../../utils');

module.exports = React.createClass({
  displayName : 'Panel',

  getInitialState : function() {
    return ({
      active : false,
      headerHeight : 0,
      totalHeight : 0,
      closing : false,
      dirty : true
    })
  },


  // this is very un-React-like
  getDefaultProps : function() {
    return ({
      onOpen : () => {},
      onClosing : () => {}
    })
  },


  componentDidMount : function() {
    var node = ReactDOM.findDOMNode(this);
    var header = ReactDOM.findDOMNode(this.refs['panel-header']);
    var content = ReactDOM.findDOMNode(this.refs['panel-content']);
    var headerHeight;
    var totalHeight;

    content.addEventListener(utils.findTransitionEndEvent(), (ev) => {
      if (this.state.closing) {
        this.setState({ closing : false, active : false });
        this.props.onClosing();
      }

      // panel inside settings well
      if (this.props._recompute) {
        this.props._recompute();
      }
    });

    headerHeight = header.getBoundingClientRect().height;
    totalHeight = headerHeight + content.getBoundingClientRect().height;

    this.setState({ headerHeight : headerHeight, totalHeight : totalHeight });
  },


  componentWillReceiveProps : function() {
    this.setState({ dirty : true });
  },


  recalculate : function() {
    var node = ReactDOM.findDOMNode(this);
    var header = ReactDOM.findDOMNode(this.refs['panel-header']);
    var content = ReactDOM.findDOMNode(this.refs['panel-content']);
    var headerHeight;
    var totalHeight;

    headerHeight = header.getBoundingClientRect().height;
    totalHeight = headerHeight + content.getBoundingClientRect().height;

    this.setState({ headerHeight : headerHeight, totalHeight : totalHeight, dirty : false });
  },


  toggle : function() {
    if (this.state.active) {
      this.setState({ closing : true });
      this.recalculate();
    }
    else {
      this.setState({ active : true });
      this.props.onOpen();
    }
  },


  renderHeader : function() {
    var css = cn({
      'panel-header-container' : true,
      'panel-active' : this.state.active
    })

    return (
      <div ref='panel-header' className={css} onClick={this.toggle}>
        {this.props.header || "Panel_Header"}
      </div>
    );
  },


  renderContent : function() {
    var trans = this.state.closing ? -this.state.headerHeight : 0;
    var cssContent;
    var children;
    var style;

    trans = this.state.active ? trans : -this.state.headerHeight;

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

      return React.cloneElement(child, props);
    })


    return (
      <div ref='panel-content' className={cssContent} style={style}>
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
