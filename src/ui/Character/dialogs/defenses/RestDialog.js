'use strict';

import React, { Component } from 'react';
import Modal from '../../../components/Modal';
import Tabs from '../../../components/Tabs';
import Tab from '../../../components/Tab';
import { createRestBtn, createCancelBtn } from '../../../components/Modal/buttons';

export default class extends React.Component {
  static displayName = 'RestDialog';

  static propTypes = {
    active: PropTypes.bool.isRequired,
    onDismiss: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    hitDice: PropTypes.object.isRequired,
    hitDiceDefinitions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    let longRestInputs = props.hitDice
      .map((d, i) => {
        return `lrInput${i}`
      })
      .reduce((agg, id) => {
        agg[id] = 0;
        return agg;
      }, {});

    let shortRestInputs = props.hitDice
      .map((d, i) => {
        return `srInput${i}`
      })
      .reduce((agg, id) => {
        agg[id] = 0;
        return agg;
      }, {});

    this.state = {
      restType: 0, // short rest === 0
      longRestInputs,
      shortRestInputs,
      regainHp: 0,
      useAll: true,
    };
  }

  componentWillReceiveProps(nextProps) {
    let longRestInputs = this.props.hitDice
      .map((d, i) => {
        return `lrInput${i}`
      })
      .reduce((agg, id) => {
        agg[id] = 0;
        return agg;
      }, {});

    let shortRestInputs = this.props.hitDice
      .map((d, i) => {
        return `srInput${i}`
      })
      .reduce((agg, id) => {
        agg[id] = 0;
        return agg;
      }, {});

    this.setState({ longRestInputs, shortRestInputs, regainHp: 0, restType: 0 });
  }

  validateInput = (inputType, inputId, ev) => {
    let num = Number(ev.target.value.trim());

    if (isNaN(num)) return;

    let inputState = Object.assign({}, this.state[inputType], {
      [`${inputId}`]: num
    });

    let newState = Object.assign({}, this.state, {
      [`${inputType}`]: inputState
    })

    this.setState(newState);
  };

  validateHp = (ev) => {
    let num = Number(ev.target.value);

    if (isNaN(num)) return;

    this.setState({ regainHp: num });
  };

  handleShortRest = () => {
    let diceUsed = this.props.hitDice
      .map((id, i) => ({ ref: `srInput${i}`, id }))
      .map(datum => Object.assign({}, datum, { value: this.state.shortRestInputs[datum.ref] }))
      .reduce((agg, datum) => {
        agg[datum.id] = {
          num: datum.value
        }

        return agg;
      }, {});

    this.props.onChange({
      type: 'SHORT_REST',
      data: {
        hpRegained: this.state.regainHp,
        diceUsed,
      }
    })
  };

  handleLongRest = () => {
    let inputValues = this.props.hitDice
      .map((id, i) => ({ref: `lrInput${i}`, id }))
      .map(datum => Object.assign({}, datum, { value: this.state.longRestInputs[datum.ref] }))
      .reduce((agg, datum) => {
        agg[datum.id] = {
          valueToAdd: this.state.useAll
            ? this.props.hitDiceDefinitions.getIn([datum.id, 'maximum'])
            : datum.value
        };

        return agg;
      }, {});

    this.props.onChange({
      type: 'LONG_REST',
      data: inputValues,
    });

    this.props.onDismiss();
  };

  handleUseAll = () => {
    let useAll = this.useAllInput.checked;
    this.setState({ useAll });
  };

  longRestContent = () => {
    return <div>
      <p className='subtext'>A <span className='text-blue'>Long Rest</span> will restore all of your hit points and some spent hit dice.</p>
      
      <div className='inputs'>
        <input id='useAll' type='checkbox' ref={ref => this.useAllInput = ref} defaultChecked={this.state.useAll} onChange={this.handleUseAll}/>
        <label htmlFor='useAll'>Regain all hit dice</label>
      </div>

      <label className={`block mt1 ${this.state.useAll ? 'disabled' : ''}`}>Regain how many hit dice per type?</label>
      {
        this.props.hitDice
          .map(id => this.props.hitDiceDefinitions.get(id))
          .map((hitDice, i) => {
            return (
              <div key={hitDice.get('id')} className='inline-block m1'>
                <label className={`labeled-input ${this.state.useAll ? 'disabled' : ''}`}>
                  <input
                    disabled={this.state.useAll}
                    value={this.state.longRestInputs[`lrInput${i}`]}
                    onChange={this.validateInput.bind(this, 'longRestInputs', `lrInput${i}`)}
                  />
                  { `${hitDice.get('type')} (${hitDice.get('current')} / ${hitDice.get('maximum')})` }
                </label>
              </div>
            );
          })
      }
    </div>
  };

  shortRestContent = () => {
    return <div>
      <p className='subtext'>A <span className='text-blue'>Short Rest</span> will allow you to spend hit dice to regain lost hit points.</p>
      <label className='block mt1'>Use how many hit dice?</label>
      {
        this.props.hitDice
          .map(id => this.props.hitDiceDefinitions.get(id))
          .map((hitDice, i) => {
            return (
              <div key={hitDice.get('id')} className='inline-block m1'>
                <label className='labeled-input'>
                  <input
                    value={this.state.shortRestInputs[`srInput${i}`]}
                    onChange={this.validateInput.bind(this, 'shortRestInputs', `srInput${i}`)}
                  />
                  { `${hitDice.get('type')} (${hitDice.get('current')} / ${hitDice.get('maximum')})` }
                </label>
              </div>
            );
          })
      }
      <div className='inputs'>
        <label className='block mt1' htmlFor='regainHpInput'>Regain how many hit points?</label>
        <input
          id='regainHpInput'
          type='text'
          className='block mb1'
          value={this.state.regainHp}
          onChange={this.validateHp}
        />
        <p className='subtext'>Enter the total number of hit points to regain across all dice rolls and modifiers.</p>
      </div>
    </div>
  };

  getContent = () => {
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
  };

  render() {
    return <Modal
      id='rest-dialog'
      active={this.props.active}
      content={this.getContent()}
      onDismiss={this.props.onDismiss}
    />
  }
}