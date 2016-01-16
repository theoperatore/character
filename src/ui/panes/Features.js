'use strict';

import React from 'react';
import ListItem from '../components/ListItem';
import Icon from '../components/Icon';

import EditDialog from '../dialogs/features/edit';

export default React.createClass({
  displayName : 'PaneFeatures',


  shouldComponentUpdate : function(nextProps) {
    return this.props.features !== nextProps.features;
  },


  // handleFeatureChange : function() {
  //   var data = "some data";

  //   this.props.handleFeatureChange(data);
  // },


  handleFeatureCancel(rid) {
    this.refs[`${rid}-item`].confirmCancel();
  },


  handleDismiss(rid) {
    return this.refs[rid].isDirty();
  },


  handleFeatureRemove(featureId, rid) {
    this.refs[`${rid}-item`].confirmCancel().then(answer => {
      if (answer === 'yes') {
        this.props.handleFeatureChange({
          type: 'FEATURE_DELETE',
          data: featureId
        });
      }
    })
  },


  createModalContent(rid, name, desc, featureId) {
    return <EditDialog
      ref={rid}
      name={name}
      desc={desc}
      onUpdate={this.props.handleFeatureChange}
      onCancel={this.handleFeatureCancel.bind(this, rid)}
      onRemove={this.handleFeatureRemove.bind(this, featureId, rid)}
    />
  },


  renderFeatures() {
    return (
      this.props.features.toJS().map((feature, i) => {
        let rid = `feature-${i}`;
        return (
          <ListItem
            ref={`${rid}-item`}
            key={i} 
            title={feature.name} 
            id={rid} 
            modalContent={this.createModalContent(`feature-${i}`, feature.name, feature.desc, feature.id)} 
            onDismiss={this.handleDismiss.bind(this, rid)}
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
