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


  handleFeatureCancel(rid, message) {
    return this.refs[`${rid}-item`].confirmCancel(true, message);
  },


  handleDismiss(rid) {
    return this.refs[rid].isDirty();
  },


  handleFeatureRemove(featureId, rid, message) {
    this.refs[`${rid}-item`].confirmCancel(false, message).then(answer => {
      if (answer === 'yes') {
        this.props.handleFeatureChange({
          type: 'FEATURE_DELETE',
          data: featureId
        });
      }
    })
  },


  createGlyph(type) {
    switch (type) {
      case 'PASSIVE':
        return { icon: <Icon icon='fa fa-cube' />, style: ''};
      case 'ATTACK':
        return { icon: <Icon icon='icon-attack' />, style: 'text-red' };
      case 'SPELL':
        return { icon: <Icon icon='icon-repo' />, style: 'text-purple' };
    }
  },


  createModalContent(rid, feature) {
    return <EditDialog
      ref={rid}
      name={feature.name}
      desc={feature.desc}
      featureId={feature.id}
      featureType={feature.type}
      onUpdate={this.props.handleFeatureChange}
      onCancel={this.handleFeatureCancel.bind(this, rid)}
      onRemove={this.handleFeatureRemove.bind(this, feature.id, rid)}
    />
  },


  renderFeatures() {
    return (
      this.props.features.toJS().map((feature, i) => {
        let rid = `feature-${i}`;
        let glyph = this.createGlyph(feature.type);

        return (
          <ListItem
            ref={`${rid}-item`}
            key={i} 
            title={feature.name} 
            id={rid}
            glyphCss={glyph.style}
            glyph={glyph.icon}
            modalContent={this.createModalContent(`feature-${i}`, feature)} 
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
