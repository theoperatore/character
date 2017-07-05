'use strict';

import PropTypes from 'prop-types';

import React, { Component } from 'react';
import Modal from '../../../components/Modal';
import Icon from '../../../components/Icon';


export default class extends React.Component {
  static displayName = 'Cast';

  static propTypes = {
    active: PropTypes.bool.isRequired,
    initialSpellLevel: PropTypes.number.isRequired,

    // each object must have levelId
    slotsPerLevel: PropTypes.array.isRequired,
    spellId: PropTypes.string.isRequired,
    onDismiss: PropTypes.func.isRequired,
    onCast: PropTypes.func.isRequired,
  };

  state = {
    numSpellSlots: 1,
  };

  validateNumber = (ev) => {
    if (ev.target.value === '') {
      this.setState({ numSpellSlots: '' });
      return;
    }

    if (!isNaN(Number(ev.target.value))) {
      this.setState({ numSpellSlots: Number(ev.target.value) })
    }
  };

  castSpell = () => {
    let type = 'SPELL_CAST';
    let data = {
      id: this.props.spellId,
      slotsUsed: Number(this.state.numSpellSlots),
      levelSelected: Number(this.lvlSelect.value),
    };

    let { slots, used } = this.props.slotsPerLevel[data.levelSelected];

    if (used + data.slotsUsed <= slots) {
      this.props.onCast({ type, data });
      this.props.onDismiss();
    }
  };

  getContent = () => {
    return <section>
      <div className='modal-header'>
        <h3>Cast Spell</h3>
      </div>
      <div className='modal-content'>
        <label className='block inputs'>
          <p>Spell Level</p>
          <select ref={ref => this.lvlSelect = ref} defaultValue={this.props.initialSpellLevel}>
            {
              this.props.slotsPerLevel
                .filter(lvl => lvl.slots - lvl.used > 0)
                .map((lvl, idx) => {
                  return <option key={idx} value={lvl.idx}>{`Level ${lvl.idx} (${lvl.slots - lvl.used})`}</option>
                })
            }
          </select>
        </label>
        <label className='block inputs'>
          <p>Number of spell slots to use</p>
          <input
            type='text'
            defautlValue='1'
            value={this.state.numSpellSlots}
            placeholder='1'
            onChange={this.validateNumber}
          />
        </label>
      </div>
      <div className='modal-footer'>
        <button className='text-purple' onClick={this.castSpell}><Icon icon='icon-repo'/> Cast Spell</button>
        <button className='text-red' onClick={this.props.onDismiss}><Icon icon='fa fa-remove'/> Cancel</button>
      </div>
    </section>
  };

  render() {
    return <Modal
      id='cast-spell'
      active={this.props.active}
      content={this.getContent()}
      onDismiss={this.props.onDismiss}
    />;
  }
}