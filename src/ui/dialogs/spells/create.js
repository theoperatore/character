'use strict';

import React from 'react';
import uuid from 'node-uuid';
import Icon from '../../components/Icon';


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
    onChange: React.PropTypes.func.isRequired,
    onCancel: React.PropTypes.func.isRequired,
  },

  getEditedSpell() {
    return {
      id: this.props.spell ? this.props.spell.id : uuid.v1(),
      name: this.nameInput.value.trim(),
      desc: this.descInput.value.trim(),
      cast: this.castInput.value.trim(),
      range: this.rangeInput.value.trim(),
      cmp: this.cmpInput.value.trim(),
      dur: this.durInput.value.trim(),
    }
  },

  handleSave() {
    let type = this.props.spell
      ? 'SPELL_EDIT'
      : 'SPELL_CREATE';

    let data = this.getEditedSpell();

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
    } = this.props.spell || {};

    return (
      <section className='create-edit-spell-container'>
        <div className='modal-header'>
          <h3><input type='text' ref={ref => this.nameInput = ref} defaultValue={name} placeholder={name || NEW_SPELL.name}/></h3>
        </div>
        <div className='modal-content row'>
          <textarea ref={ref => this.descInput = ref} defaultValue={desc} placeholder={desc || NEW_SPELL.desc}></textarea>
          <div className='col-1-2'>
            <div>
              <label>
                <p><strong>Casting Time</strong></p>
                <input type='text' ref={ref => this.castInput = ref} defaultValue={cast} placeholder={cast || NEW_SPELL.cast}/>
              </label>
            </div>
            <div>
              <label>
                <p><strong>Range</strong></p>
                <input type='text' ref={ref => this.rangeInput = ref} defaultValue={range} placeholder={range || NEW_SPELL.range}/>
              </label>
            </div>
          </div>
          <div className='col-1-2'>
            <div>
              <label>
                <p><strong>Components</strong></p>
                <input type='text' ref={ref => this.cmpInput = ref} defaultValue={cmp} placeholder={cmp || NEW_SPELL.cmp}/>
              </label>
            </div>
            <div>
              <label>
                <p><strong>Duration</strong></p>
                <input type='text' ref={ref => this.durInput = ref} defaultValue={dur} placeholder={dur || NEW_SPELL.dur}/>
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