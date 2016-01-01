'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var cn = require('classnames');
var utils = require('../../utils');


module.exports = React.createClass({
  displayName : 'Menu',


  propTypes : {
    anchor : React.PropTypes.element
  },


  getInitialState : function() {
    return ({
      active : false,
      top : 0
    })
  },


  shouldComponentUpdate : function(nextProps, nextState) {
    return (nextState.active !== this.state.active);
  },


  componentDidMount : function() {
    var elem = ReactDOM.findDOMNode(this);

    this.setState({ top : elem.getBoundingClientRect().height });
  },


  outsideClick : function(ev) {
    var node = ReactDOM.findDOMNode(this);

    if (!utils.isTargetInRoot(ev.target, node)) {
      document.body.removeEventListener('click', this.outsideClick);
      this.setState({ active : false })
    }
  },


  toggle : function(ev) {
    var active = this.state.active;

    if (!active) {
      document.body.addEventListener('click', this.outsideClick);
    }

    this.setState({ active : !this.state.active });
  },


  renderChildren : function() {
    return React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, { className : 'menu-item' });
    })
  },


  render : function() {
    var style = {};
    var css = cn({
      'menu-content' : true,
      'menu-left' : !this.props.right,
      'menu-right' : this.props.right,
      'menu-active' : this.state.active
    });


    style.top = (this.state.active) ? this.state.top : 0;

    return (
      <div className='menu-container'>
        <div className='menu-header' onClick={this.toggle}>
          {this.props.anchor}
        </div>
        <div className={css} style={style}>
          {this.renderChildren()}
        </div>
      </div>
    )
  }
})
