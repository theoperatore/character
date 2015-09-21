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


  renderFeatureTiles() {
    return (
      this.props.features.toJS().map((feature, i) => {
        return (
          <div className='feature-stat-container' key={i}>
            <div className='feature-stat'>
              <span className='fa fa-cube'></span> 
              <h6>{feature.name}</h6>
            </div>
          </div>
        )
      })
    )
  },


  render : function() {
    return (
      <div className="pane-container">
        <h3>Features</h3>
        <div className='feature-container'>
          {this.renderFeatureTiles()}
        </div>
      </div>
    );
  }
})
