'use strict';

import React from 'react';
import ListItem from '../components/ListItem';
import Icon from '../components/Icon';
import Modal from '../components/Modal';

import EditDialog from '../dialogs/features/edit';
import CreateDialog from '../dialogs/features/create';

export default React.createClass({
  displayName : 'PaneFeatures',


  getInitialState() {
    return {
      createFeature: false
    }
  },


  shouldComponentUpdate : function(nextProps, nextState) {
    return this.props.features !== nextProps.features ||
           this.state.createFeature !== nextState.createFeature;
  },


  handleFeatureCancel(rid, message) {
    return this.refs[`${rid}-item`].confirmCancel(true, message);
  },


  handleDismiss(rid) {
    return this.refs[rid].isDirty();
  },


  // this modal handles dirty checking itself
  handleNewFeatureDismiss() {
    let modal = this.refs.createFeatureDialog;
    if (modal.isDirty()) {
      modal.confirm();
      return;
    }

    this.setState({ createFeature: false });
  },


  handleFeatureCreate(event) {
    this.setState({ featureCreate: false });
    this.props.handleFeatureChange(event);
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


  openCreateFeature() {
    this.setState({ createFeature: true });
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


  createNewFeatureContent() {
    return <CreateDialog
      ref='createFeatureDialog'
      onCreate={this.handleFeatureCreate}
      />
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
          <div className='info-section-header interactable' onClick={this.openCreateFeature}>
            <h3 className='info-section-title'>Features</h3>
            <p className='info-section-addon'><Icon icon='fa fa-plus'/></p>
          </div>
          {this.renderFeatures()}
        </section>
        <Modal id='create-new-feature-modal' content={this.createNewFeatureContent()} onDismiss={this.handleNewFeatureDismiss} active={this.state.createFeature} />
      </div>
    );
  }
})
