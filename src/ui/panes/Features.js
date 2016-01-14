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


  handleDismiss(refid) {

  },


  createModalContent(name, desc) {
    return <div>
      <div className='modal-header'>
        <h3>{name}</h3>
      </div>
      <div className='modal-content'>
        <p>{desc}</p>
      </div>
    </div>
  },


  renderFeatures() {
    return (
      this.props.features.toJS().map((feature, i) => {
        return (
          <ListItem 
            ref={`feature-${i}`}
            key={i} 
            title={feature.name} 
            id={`feature-${i}`} 
            modalContent={this.createModalContent(feature.name, feature.desc)} 
            onDismiss={this.handleDismiss.bind(this, `feature-${i}`)}
          />
        )
      })
    )
  },


  render() {
    return (
      <div className='pane-container'>
        <section className="info-section pane-padding">
          <div className='info-section-header'>
            <h3 className='info-section-title'>Features</h3>
            <p className='info-section-addon'><Icon icon='fa fa-plus'/></p>
          </div>
          {this.renderFeatures()}
        </section>
      </div>
    );
  }
})
