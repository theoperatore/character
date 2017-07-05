'use strict';

import React, { Component } from 'react';
import uuid from 'uuid/v1';
import Icon from '../../../components/Icon';

const NEW_SPELL = {
  name: 'New Spell Name',
  desc: 'description',
  cast: 'Casting time',
  range: 'Range',
  cmp: 'Components',
  dur: 'Duration',
}

export default React.createClass({
  displayName: 'CreateSpell',

  propTypes: {
    onChange: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  },

  getSpellInput() {
    return {
      spell: {
        id: `spell-${uuid()}`,
        name: this.nameInput.value.trim(),
        desc: this.descInput.value.trim(),
        cast: this.castInput.value.trim(),
        range: this.rangeInput.value.trim(),
        cmp: this.cmpInput.value.trim(),
        dur: this.durInput.value.trim(),
        prepared: false,
      },
      level: Number(this.levelInput.value),
    }
  },

  handleSave() {
    let type = 'SPELL_CREATE';
    let data = this.getSpellInput();

    if (data.name !== '') {
      this.props.onChange({ type, data });
      this.props.onCancel();
    }
  },

  handleCancel() {
    this.props.onCancel();
  },

  render() {

    return (
      <section className='create-edit-spell-container'>
        <div className='modal-header'>
          <h3><input type='text' ref={ref => this.nameInput = ref} placeholder={NEW_SPELL.name}/></h3>
        </div>
        <div className='modal-content row inputs'>
          <textarea ref={ref => this.descInput = ref} placeholder={NEW_SPELL.desc}></textarea>
          <p><strong>Spell Level</strong></p>
          <select ref={ref => this.levelInput = ref} defaultValue='1'>
            <option value='0'>Cantrip</option>
            <option value='1'>Level 1</option>
            <option value='2'>Level 2</option>
            <option value='3'>Level 3</option>
            <option value='4'>Level 4</option>
            <option value='5'>Level 5</option>
            <option value='6'>Level 6</option>
            <option value='7'>Level 7</option>
            <option value='8'>Level 8</option>
            <option value='9'>Level 9</option>
          </select>
          <div className='col-1-2'>
            <div>
              <label>
                <p><strong>Casting Time</strong></p>
                <input type='text' ref={ref => this.castInput = ref} placeholder={NEW_SPELL.cast}/>
              </label>
            </div>
            <div>
              <label>
                <p><strong>Range</strong></p>
                <input type='text' ref={ref => this.rangeInput = ref} placeholder={NEW_SPELL.range}/>
              </label>
            </div>
          </div>
          <div className='col-1-2'>
            <div>
              <label>
                <p><strong>Components</strong></p>
                <input type='text' ref={ref => this.cmpInput = ref} placeholder={NEW_SPELL.cmp}/>
              </label>
            </div>
            <div>
              <label>
                <p><strong>Duration</strong></p>
                <input type='text' ref={ref => this.durInput = ref} placeholder={NEW_SPELL.dur}/>
              </label>
            </div>
          </div>
          <hr />
        </div>
        <div className='modal-footer'>
          <button className='text-green' onClick={this.handleSave}><Icon icon='fa fa-pencil'/> Save</button>
          <button className='text-red' onClick={this.handleCancel}><Icon icon='fa fa-remove'/> Cancel</button>
        </div>
      </section>
    );
  },
});
