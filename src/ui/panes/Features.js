'use strict';

var React = require('react/addons');
var Panel = require('../components/Panel');

module.exports = React.createClass({
  displayName : 'PaneFeatures',


  shouldComponentUpdate : function(nextProps) {
    return this.props.features !== nextProps.features;
  },


  handleFeatureChange : function() {
    var data = "some data";

    this.props.handleFeatureChange(data);
  },


  renderFeatures : function() {
    return (
      this.props.features.toJS().map((feature, i) => {
        return (
          <Panel header={feature.name} key={i}>
            <p>{feature.desc}</p>
          </Panel>
        )
      })
    )
  },


  render : function() {
    return (
      <div className="pane-container">
        <h3>Features</h3>
        {this.renderFeatures()}
      </div>
    );
  }
})
