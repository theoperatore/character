'use strict';

import React from 'react';
import Modal from '../../components/Modal';
import Tabs from '../../components/Tabs';
import Tab from '../../components/Tab';
import { createRestBtn, createCancelBtn } from '../../components/Modal/buttons';

export default React.createClass({
  displayName: 'RestDialog',

  propTypes: {
    active: React.PropTypes.bool.isRequired,
    onDismiss: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
    hitDice: React.PropTypes.object.isRequired,
    hitDiceDefinitions: React.PropTypes.object.isRequired,
  },

  getInitialState() {
    return {
      restType: 0, // short rest === 0
    }
  },

  handleShortRest() {

  },

  handleLongRest() {
    let inputValues = this.props.hitDice
      .map((id, i) => ({ref: `typeInput${i}`, id }))
      .map(datum => Object.assign({}, datum, { value: Number(this[datum.ref].value.trim()) }))
      .reduce((agg, datum) => {
        agg[datum.id] = {
          valueToAdd: datum.value
        };

        return agg;
      }, {});

    this.props.onChange({
      type: 'LONG_REST',
      data: inputValues,
    });

    this.setState({ restType: 0 });
    this.props.onDismiss();
  },

  longRestContent() {
    return <div>
      <p>A <span className='text-blue'>Long Rest</span> will restore all of your hit points and give you the ability to restore spent hit dice.</p>
      <label className='block mt1'>Regain how many hit dice per type?</label>
      {
        this.props.hitDice
          .map(id => this.props.hitDiceDefinitions.get(id))
          .map((hitDice, i) => {
            return (
              <div key={hitDice.get('id')} className='inline-block m1'>
                <label className='labeled-input'>
                  <input
                    ref={ref => this[`typeInput${i}`] = ref}
                    placeholder='amount to add'
                    defaultValue={0}
                  />
                  { hitDice.get('type') }
                </label>
              </div>
            );
          })
      }
    </div>
  },

  shortRestContent() {
    return <div>
      <p>A <span className='text-blue'>Short Rest</span> will allow you to spend hit dice to regain lost hit points.</p>
    </div>
  },

  getContent() {
    return <section className='rest-dialog'>
      <div className='modal-header'><h3>Take a Rest?</h3></div>
      <div className='modal-content'>
        <label>Rest Type</label>
        <Tabs
          className='basic-tabs'
          activeIdx={this.state.restType}
          onTabSelect={idx => this.setState({ restType: idx })}
        >
          <Tab>Short Rest</Tab>
          <Tab>Long Rest</Tab>
        </Tabs>

        {
          this.state.restType === 0
            ? this.shortRestContent()
            : this.longRestContent()
        }
      </div>
      <div className='modal-footer'>
        {
          this.state.restType === 0
            ? createRestBtn(this.handleShortRest)
            : createRestBtn(this.handleLongRest)
        }
        { createCancelBtn(this.props.onDismiss) }
      </div>
    </section>
  },

  render() {
    return <Modal
      id='rest-dialog'
      active={this.props.active}
      content={this.getContent()}
      onDismiss={this.props.onDismiss}
    />
  }
})