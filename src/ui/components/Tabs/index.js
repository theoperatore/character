'use strict';

var React = require('react');

module.exports = React.createClass({
  displayName : "Tabs",


  getInitialState : function() {
    return ({
      activeIdx : this.props.activeIdx
    });
  },


  getDefaultProps : function() {
    return ({
      activeIdx : 0,
      onTabSelect : function() {}
    })
  },


  shouldComponentUpdate : function(nextProps, nextState) {
    return (nextProps.activeIdx !== this.props.activeIdx) ||
           (nextState.activeIdx !== this.state.activeIdx); 
  },


  componentWillReceiveProps : function(nextProps) {
    this.setState({ activeIdx : nextProps.activeIdx });
  },


  handleChildSelect : function(id) {
    this.setState({ activeIdx : id });
    this.props.onTabSelect(id);
  },


  renderChildren : function() {
    return React.Children.map(this.props.children, (child, i) => {
      var props = {};

      props.active = (i === this.state.activeIdx) ? true : false;
      props.idx = i;
      props._handleClick = this.handleChildSelect;

      return React.cloneElement(child, props);
    })
  },

  render : function() {
    let {
      className
    } = this.props;
    
    return (
      <div className={`tabs-container ${className || ''}`}>
        {this.renderChildren()}
      </div>
    );
  }
})