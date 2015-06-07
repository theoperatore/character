"use strict";
var React = require('react/addons');
var utils = require('../util/utils');


module.exports = React.createClass({
  displayName : "Panel",

  
  getInitialState : function() {
    return ({
      open : false,
      titleHeight : 0,
      contentHeight : 0,
      dirty : true
    })
  },


  componentDidMount : function() {
    var node = React.findDOMNode(this);
    var title = node.firstChild.nextElementSibling;
    var content = node.firstChild;
    var state = {};

    state.titleHeight = title.getBoundingClientRect().height;
    state.contentHeight = content.getBoundingClientRect().height;

    content.addEventListener(utils.findTransitionEndEvent(), function(el) {
      if (el.target.classList.contains('closing')) {
        var height = this.state.titleHeight;

        if (this.state.dirty) {
          height = React.findDOMNode(this).firstChild.nextElementSibling.getBoundingClientRect().height;
        }

        el.target.classList.remove('closing');
        React.findDOMNode(this).style.height = height + "px";
      }
    }.bind(this))

    this.setState(state);
  },


  open : function() {
    var node = React.findDOMNode(this);
    var title = node.firstChild.nextElementSibling;
    var content = node.firstChild;
    var titleHeight = this.state.titleHeight;
    var contentHeight = this.state.contentHeight;

    if (this.state.dirty) {
      var state = {};

      contentHeight = content.getBoundingClientRect().height;
      titleHeight = title.getBoundingClientRect().height;

      state.contentHeight = contentHeight;
      state.titleHeight = titleHeight;
      state.dirty = false;

      this.setState(state);
    }

    title.classList.add('open');
    content.classList.add('open');

    content.style.webkitTransform = "translate3d(0," + titleHeight + "px,0)";
    content.style.MozTransform    = "translate3d(0," + titleHeight + "px,0)";
    content.style.msTransform     = "translate3d(0," + titleHeight + "px,0)";
    content.style.OTransform      = "translate3d(0," + titleHeight + "px,0)";
    content.style.transform       = "translate3d(0," + titleHeight + "px,0)";

    node.style.height = (titleHeight + contentHeight) + "px";

    this.setState({ open : true });
  },


  close : function() {
    var node = React.findDOMNode(this);
    var title = node.firstChild.nextElementSibling;
    var content = node.firstChild;

    if (this.state.dirty) {
      var state = {};
      var contentHeight;
      var titleHeight;

      contentHeight = content.getBoundingClientRect().height;
      titleHeight = title.getBoundingClientRect().height;

      state.contentHeight = contentHeight;
      state.titleHeight = titleHeight;
      state.dirty = false;

      this.setState(state);
    }

    title.classList.remove('open');
    content.classList.remove('open');
    content.classList.add('closing');

    content.style.webkitTransform = "translate3d(0,0,0)";
    content.style.MozTransform    = "translate3d(0,0,0)";
    content.style.msTransform     = "translate3d(0,0,0)";
    content.style.OTransform      = "translate3d(0,0,0)";
    content.style.transform       = "translate3d(0,0,0)";

    this.setState({ open : false });
  },


  toggle : function() {
    if (this.state.open) {
      this.close();
    }
    else {
      this.open();
    }
  },


  renderTitle : function() {
    return this.props.title;
  },


  renderContent : function() {
    return this.props.children;
  },


  render : function() {
    var { className } = this.props;

    return (
      <div className={"panel-container " + (className || "")}>
        <div className="panel-content-container">{this.renderContent()}</div>
        <div className="panel-title-container" onClick={this.toggle}>{this.renderTitle()}</div>
      </div>
    )
  }
})