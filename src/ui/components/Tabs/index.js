'use strict';

var React = require('react');

module.exports = class extends React.Component {
  static displayName = "Tabs";

  static defaultProps = {
    activeIdx : 0,
    onTabSelect : function() {}
  };

  state = {
    activeIdx : this.props.activeIdx
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ activeIdx : nextProps.activeIdx });
  }

  handleChildSelect = (id) => {
    this.setState({ activeIdx : id });
    this.props.onTabSelect(id);
  };

  renderChildren = () => {
    return React.Children.map(this.props.children, (child, i) => {
      var props = {};

      props.active = (i === this.state.activeIdx) ? true : false;
      props.idx = i;
      props._handleClick = this.handleChildSelect;

      return React.cloneElement(child, props);
    })
  };

  render() {
    let {
      className
    } = this.props;
    
    return (
      <div className={`tabs-container ${className || ''}`}>
        {this.renderChildren()}
      </div>
    );
  }
}