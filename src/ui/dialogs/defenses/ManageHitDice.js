'use strict';

import React from 'react';
import Modal from '../../components/Modal';
import Icon from '../../components/Icon';
import { dieTypes } from '../../constants';
import { debounce } from '../../utils';

export default React.createClass({
  displayName: 'ManageHitDice',

  propTypes: {
    hitDice: React.PropTypes.object.isRequired,
    hitDiceDefinitions: React.PropTypes.object.isRequired,
    onDismiss: React.PropTypes.func.isRequired,
    active: React.PropTypes.bool.isRequired,
    onChange: React.PropTypes.func.isRequired,
  },

  getInitialState() {
    let current = this.props.hitDice.map(id => {
      return {
        value: this.props.hitDiceDefinitions.getIn([id, 'current']),
        id,
      }
    }).reduce((agg, datum) => {
      agg[datum.id] = datum.value;
      return agg;
    }, {});

    let maximum = this.props.hitDice.map(id => {
      return {
        value: this.props.hitDiceDefinitions.getIn([id, 'maximum']),
        id,
      }
    }).reduce((agg, datum) => {
      agg[datum.id] = datum.value;
      return agg;
    }, {});

    let debouncedChange = debounce(this.props.onChange, 500);

    return {
      current,
      maximum,
      debouncedChange,
    }
  },

  componentWillReceiveProps(nextProps) {
    let current = nextProps.hitDice.map(id => {
      return {
        value: nextProps.hitDiceDefinitions.getIn([id, 'current']),
        id,
      }
    }).reduce((agg, datum) => {
      agg[datum.id] = datum.value;
      return agg;
    }, {});

    let maximum = nextProps.hitDice.map(id => {
      return {
        value: nextProps.hitDiceDefinitions.getIn([id, 'maximum']),
        id,
      }
    }).reduce((agg, datum) => {
      agg[datum.id] = datum.value;
      return agg;
    }, {});

    this.setState({
      current,
      maximum,
    });
  },

  handleRemove(id) {
    this.props.onChange({
      type: 'HIT_DICE_DELETE',
      data: {
        id,
      }
    });
  },

  handleCreate() {
    this.props.onChange({
      type: 'HIT_DICE_CREATE',
    });
  },

  handleSave(hitDieId, inputType, ev) {
    let newCurrent;
    let newMaximum;
    let type;
    
    switch (inputType) {
      case 'current':
        newCurrent = Number(ev.target.value);
        newMaximum = this.state.maximum[hitDieId];
        type = this.props.hitDiceDefinitions.getIn([hitDieId, 'type']);
        break;
      case 'maximum':
        newCurrent = this.state.current[hitDieId];
        newMaximum = Number(ev.target.value);
        type = this.props.hitDiceDefinitions.getIn([hitDieId, 'type']);
        break;
      default:
        newCurrent = this.state.current[hitDieId];
        newMaximum = this.state.maximum[hitDieId];
        type = ev.target.value;
    }

    if (isNaN(newCurrent) || isNaN(newMaximum)) return;

    let { current, maximum } = this.state;
    let newState = Object.assign({}, this.state, {
      current: Object.assign({}, current, {
        [`${hitDieId}`]: newCurrent
      }),
      maximum: Object.assign({}, maximum, {
        [`${hitDieId}`]: newMaximum
      })
    });

    this.setState(newState);
    this.state.debouncedChange({
      type: 'HIT_DICE_EDIT',
      data: {
        id: hitDieId,
        current: newCurrent,
        maximum: newMaximum,
        type,
      }
    });
  },

  getHitDiceContent() {
    return this.props.hitDice.map(id => {
      return (
        <div key={id} className='mb1'>
          <input
            className='number-input'
            type='text'
            value={this.state.current[id]}
            onChange={this.handleSave.bind(this, id, 'current')}
          />
          {' / '}
          <input
            className='number-input mr2'
            type='text'
            value={this.state.maximum[id]}
            onChange={this.handleSave.bind(this, id, 'maximum')}
          />
          <select defaultValue={this.props.hitDiceDefinitions.get(id).get('type')} onChange={this.handleSave.bind(this, id, null)}>
            {
              dieTypes.map(type => {
                return <option key={id + type.stringValue} value={type.stringValue}>{type.display}</option>
              })
            }
          </select>
          <Icon className='p1 ml2 text-red interactable' onClick={() => this.handleRemove(id)} icon='fa fa-remove' />
        </div>
      )
    }) 
  },

  getContent() {
    return <section>
      <div className='modal-header'>
        <h3>Manage Hit Dice</h3>
      </div>
      <div className='modal-content text-center'>
        { this.getHitDiceContent() }
        <p className='subtext interactable p1' onClick={this.handleCreate}><Icon icon='fa fa-plus'/> Add hit dice</p>
      </div>
    </section>
  },

  render() {
    return <Modal
      id='manage-hit-dice'
      active={this.props.active}
      onDismiss={this.props.onDismiss}
      content={this.getContent()}
    />
  },
});