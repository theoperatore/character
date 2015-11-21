'use strict';

var React = require('react/addons');
var classnames = require('classnames');
var utils = require('../../utils');

module.exports = React.createClass({
  displayName : "SettingsWell",


  getInitialState : function() {
    return ({
      height : 0,
      closing : false
    })
  },


  componentDidMount : function() {
    var mount = React.findDOMNode(this);
    var content = mount.firstChild;

    content.addEventListener(utils.findTransitionEndEvent(), () => {
      if (this.state.closing) {
        this.setState({ closing : false });
        this.recomputeHeight();
      }
    });

    this.setState({ height : content.getBoundingClientRect().height });
  },


  componentWillReceiveProps : function(nextProps) {
    this.recomputeHeight();
    this.setState({ closing : (this.props.open && (this.props.open !== nextProps.open)) });
  },


  recomputeHeight : function(childHeight) {
    var mount = React.findDOMNode(this);
    var content = mount.firstChild;
    this.setState({ height : content.getBoundingClientRect().height });
  },


  renderChildren : function() {
    return React.Children.map(this.props.children, (child) => {
      var props = {};

      props._recompute = this.recomputeHeight;

      return React.addons.cloneWithProps(child, props);
    })
  },


  renderContent : function() {
    var { open } = this.props;

    var trans = open ? 0 : -this.state.height;

    var cssContent = classnames({
      "settings-well-content" : true,
      "open" : open,
      "closing" : this.state.closing
    });

    var contentStyle = {
      WebkitTransform : "translate3d(0," + trans + "px,0)",
      MozTransform    : "translate3d(0," + trans + "px,0)",
      msTransform     : "translate3d(0," + trans + "px,0)",
      OTransform      : "translate3d(0," + trans + "px,0)",
      transform       : "translate3d(0," + trans + "px,0)"
    };

    return (
      <div className={cssContent} style={contentStyle}>
        {this.renderChildren()}
      </div>
    );
  },


  render : function() {
    var { open } = this.props;

    var containerStyle = {
      height : (open || this.state.closing) ? this.state.height : 0
    };

    var cssContainer = classnames({
      "settings-well-container" : true,
      "open" : open
    })

    return (
      <div className={cssContainer} style={containerStyle}>
        {this.renderContent()}
      </div>
    )
  }
})
