'use strict';

import React from 'react';
import ListItem from '../components/ListItem';
import Icon from '../components/Icon';

export default React.createClass({
  displayName : 'PaneFeatures',


  shouldComponentUpdate : function(nextProps) {
    return this.props.features !== nextProps.features;
  },


  handleFeatureChange : function() {
    var data = "some data";

    this.props.handleFeatureChange(data);
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


  renderListItems() {
    return (
      this.props.features.toJS().map((feature, i) => {
        return (
          <ListItem key={i} title={feature.name} id={`feature-${i}`} modalContent={<div>
            <div className='modal-header'>
              <h3>{feature.name}</h3>
            </div>
            <div className='modal-content'>
              <p>{feature.desc}</p>
            </div>
          </div>} />
        )
      })
    )
  },


  render : function() {
    return (
      <div className="pane-container">
        <h3>Features</h3>
        {this.renderListItems()}
      </div>
    );
  }
})
