'use strict';

var React = require('react/addons');
var cn = require('classnames');


module.exports = React.createClass({
  displayName: 'Modal',


  getInitialState() {
    return ({
      open: false
    })
  },


  getDefaultProps() {
    return ({
      open: false
    })
  },


  renderHeader() {
    return this.props.header ? this.props.header : '';
  },


  renderContent() {
    return this.props.children;
  },


  renderFooter() {
    return this.props.footer ? this.props.footer : '';
  },


  render() {
    var css = cn({
      'modal-overlay': true,
      'modal-active' : this.props.open || this.state.open
    })


    return (
      <div className={css}>
        <div className='modal-container'>
          <div className='modal-header'>
            {this.renderHeader()}
          </div>
          <div className='modal-content'>
            {this.renderContent()}
          </div>
          <div className='modal-footer'>
            {this.renderFooter()}
          </div>
        </div>
      </div>
    )
  }
})