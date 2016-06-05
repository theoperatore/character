'use strict';

import React from 'react';
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
  displayName: 'EditSpell',

  propTypes: {
    spell: React.PropTypes.shape({
      id: React.PropTypes.string.isRequired,
      name: React.PropTypes.string.isRequired,
      desc: React.PropTypes.string.isRequired,
      cast: React.PropTypes.string.isRequired,
      range: React.PropTypes.string.isRequired,
      cmp: React.PropTypes.string.isRequired,
      dur: React.PropTypes.string.isRequired,
      prepared: React.PropTypes.bool.isRequired,
    }),
    level: React.PropTypes.number.isRequired,
    onChange: React.PropTypes.func.isRequired,
    onCancel: React.PropTypes.func.isRequired,
  },

  getSpellInput() {
    return {
      spell: {
        id: this.props.spell.id,
        name: this.nameInput.value.trim(),
        desc: this.descInput.value.trim(),
        cast: this.castInput.value.trim(),
        range: this.rangeInput.value.trim(),
        cmp: this.cmpInput.value.trim(),
        dur: this.durInput.value.trim(),
        prepared: this.props.spell.prepared,
      },
      level: Number(this.levelInput.value),
    }
  },

  handleSave() {
    let type = 'SPELL_EDIT';
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
    let {
      name,
      desc,
      cast,
      range,
      cmp,
      dur,
      prepared,
    } = this.props.spell;

    return (
      <section className='create-edit-spell-container'>
        <div className='modal-header'>
          <h3><input type='text' ref={ref => this.nameInput = ref} defaultValue={name} placeholder={name}/></h3>
        </div>
        <div className='modal-content row inputs'>
          <textarea ref={ref => this.descInput = ref} defaultValue={desc} placeholder={desc}></textarea>
          <p><strong>Spell Level</strong></p>
          <select ref={ref => this.levelInput = ref} defaultValue={this.props.level} disabled={true}>
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
                <input type='text' ref={ref => this.castInput = ref} defaultValue={cast} placeholder={cast}/>
              </label>
            </div>
            <div>
              <label>
                <p><strong>Range</strong></p>
                <input type='text' ref={ref => this.rangeInput = ref} defaultValue={range} placeholder={range}/>
              </label>
            </div>
          </div>
          <div className='col-1-2'>
            <div>
              <label>
                <p><strong>Components</strong></p>
                <input type='text' ref={ref => this.cmpInput = ref} defaultValue={cmp} placeholder={cmp}/>
              </label>
            </div>
            <div>
              <label>
                <p><strong>Duration</strong></p>
                <input type='text' ref={ref => this.durInput = ref} defaultValue={dur} placeholder={dur}/>
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