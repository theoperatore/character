'use strict';

import React from 'react';
import ListItem from '../components/ListItem';
import Icon from '../components/Icon';
import Modal from '../components/Modal';

import CreateNewFeature from '../dialogs/features/create';
import FeatureItem from '../containers/FeatureItem';

export default React.createClass({
  displayName : 'PaneFeatures',


  propTypes: {
    features: React.PropTypes.object.isRequired,
    charges: React.PropTypes.object.isRequired,
    handleFeatureChange: React.PropTypes.func.isRequired
  },


  getInitialState() {
    return {
      createFeature: false
    }
  },


  shouldComponentUpdate(nextProps, nextState) {
    return this.props.features !== nextProps.features ||
           this.props.charges !== nextProps.charges ||
           this.state.createFeature !== nextState.createFeature;
  },


  renderFeatures() {
    return (
      this.props.features.toJS().map((feature, i) => {
        let charge = this.props.charges.find(itm => itm.get('id') === feature.classChargesId);
        return (
          <FeatureItem
            key={i}
            id={feature.id}
            name={feature.name}
            desc={feature.desc}
            featureType={feature.type}
            classChargesId={feature.classChargesId}
            classChargesName={charge ? charge.get('name') : ''}
            classChargesTotal={charge ? charge.get('charges') : 0}
            onChange={this.props.handleFeatureChange}
          />
        )
      })
    )
  },


  render() {
    return (
      <div className='pane-container'>
        <section className="info-section pane-padding">
          <div className='info-section-header interactable' onClick={() => this.setState({ createFeature: true })}>
            <h5 className='info-section-title'>Features</h5>
            <p className='info-section-addon'><Icon icon='fa fa-plus'/></p>
            <CreateNewFeature active={this.state.createFeature} onCreate={this.props.handleFeatureChange} dismiss={() => this.setState({ createFeature: false })} />
          </div>
          {this.renderFeatures()}
        </section>
      </div>
    );
  }
})
