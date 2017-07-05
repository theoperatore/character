'use strict';

import React, { Component } from 'react';
import ListItem from '../../components/ListItem';
import Icon from '../../components/Icon';
import Modal from '../../components/Modal';

import CreateNewFeature from '../dialogs/features/create';
import FeatureItem from '../containers/FeatureItem';

export default class extends React.Component {
  static displayName = 'PaneFeatures';

  static propTypes = {
    features: PropTypes.object.isRequired,
    charges: PropTypes.object.isRequired,
    handleFeatureChange: PropTypes.func.isRequired
  };

  state = {
    createFeature: false
  };

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.features !== nextProps.features ||
           this.props.charges !== nextProps.charges ||
           this.state.createFeature !== nextState.createFeature;
  }

  renderFeatures = () => {
    if (!this.props.features) {
      return null;
    }
    
    return (
      this.props.features.toJS().map((feature, i) => {

        let charge = this.props.charges
          ? this.props.charges.find(itm => itm.get('id') === feature.classChargesId)
          : null;

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
  };

  render() {
    return (
      <div className='pane-container'>
        <section className="info-section pane-padding">
          <div className='info-section-header'>
            <h5 className='info-section-title'>Features</h5>
            <CreateNewFeature active={this.state.createFeature} onCreate={this.props.handleFeatureChange} dismiss={() => this.setState({ createFeature: false })} />
          </div>
          {this.renderFeatures()}
          <p
            className='subtext text-center p2 interactable'
            onClick={() => this.setState({ createFeature: true })}
          ><Icon icon='fa fa-plus' /> Create a new feature</p>
        </section>
      </div>
    );
  }
}
