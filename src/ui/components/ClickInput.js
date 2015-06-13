'use strict';

var React = require('react/addons');
var cn = require('classnames');

module.exports = React.createClass({
  displayName : 'ClickInput',


  getInitialState : function() {
    return ({
      active : false,
      input : (this.props.label !== '' && this.props.label) ? this.props.label : null,
      cache : '',
    })
  },


  getDefaultProps : function() {
    return ({
      label : 'Click Me',
      onUserInput : function noop() {},
      onUserInputEnd : function noop() {}
    })
  },


  shouldComponentUpdate : function(nextProps, nextState) {
    return (this.state.active !== nextState.active ||
            this.state.input  !== nextState.input  ||
            this.state.cache  !== nextState.cache  ||
            this.props.label  !== nextProps.label  );
  },


  comonentWillReceiveProps : function(nextProps) {
    this.setState({ input : nextProps.label });
  },


  componentDidUpdate : function() {
    if (this.state.active && (this.state.input === this.state.cache)) {
      var elem = React.findDOMNode(this.refs['input']);

      elem.focus();
      elem.setSelectionRange(0, 9999);
    }
  },


  handleChange : function(ev) {
    var val = ev.target.value;
    this.props.onUserInput(val);
    this.setState({ input : val });
  },


  handleClick : function() {
    this.setState({ active : true, cache : this.props.label });
  },


  handleBlur : function() {
    var out;

    if (this.state.input === '' || !this.state.input) {
      out = this.state.cache;
    }
    else {
      out = this.state.input;
    }

    this.props.onUserInputEnd(out);
    this.setState({ active : false, cache : out, input : out });
  },


  render : function() {
    var cssh1 = cn({
      'click-input-title' : true,
      'click-input-hidden' : this.state.active
    })

    var cssin = cn({
      'click-input-input' : true,
      'click-input-hidden' : !this.state.active
    })


    return (
      <div className='click-input-container'>
        <h1 className={cssh1} onClick={this.handleClick}>{this.props.label}</h1>
        <input 
          ref='input'
          className={cssin}
          placeholder={this.props.label}
          value={this.state.input}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
        />
      </div>
    )
  }
})