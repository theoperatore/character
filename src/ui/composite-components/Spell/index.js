'use strict';

import React from 'react';
import ListItem from '../../components/ListItem/v2';
import Modal from '../../components/Modal';
import Icon from '../../components/Icon';

export default React.createClass({
  displayName: 'Spell',

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
    spellLevel: React.PropTypes.number.isRequired,
  },

  getInitialState() {
    return {
      showDetails: false,
      editSpell: false,
    }
  },

  handleCancel() {
    this.setState({ showDetails: false });
  },

  getEditDetailContent() {
    return (<section>
      <div className='modal-header'>
        <h3><input type='text' defaultValue={this.props.spell.name} placeholder={this.props.spell.name}/></h3>
      </div>
      <div className='modal-content'>
      </div>
      <div className='modal-footer'>
        <button className='text-green'><Icon icon='fa fa-pencil'/> Save</button>
        <button className='text-red'><Icon icon='fa fa-remove'/> Cancel</button>
      </div>
    </section>);
  },

  getDetailContent() {
    let {
      name,
      desc,
      cast,
      range,
      cmp,
      dur,
      prepared,
    } = this.props.spell;

    return (<section>
      <div className='modal-header'>
        <h3>{name}</h3>
      </div>
      <div className='modal-content'>
        <p>{desc}</p>
        <hr/>
        <dl className='dl-horizontal'>
          <dt><strong>Casting Time</strong></dt>
          <dd>{cast}</dd>
          <dt><strong>Range</strong></dt>
          <dd>{range}</dd>
          <dt><strong>Components</strong></dt>
          <dd>{cmp}</dd>
          <dt><strong>Duration</strong></dt>
          <dd>{dur}</dd>
        </dl>
      </div>
      <div className='modal-footer'>
        <button className='text-green'><Icon icon='fa fa-pencil'/> Edit</button>
        <button className='text-red'><Icon icon='fa fa-remove'/> Delete</button>
      </div>
    </section>);
  },

  render() {
    let { spell, spellLevel } = this.props;
    let subtext = `${spellLevel === 0 ? 'cantrip' : `lvl ${spellLevel}`}`;

    subtext = spell.prepared 
      ? <span><Icon icon='fa fa-bookmark text-spell' /> {subtext}</span>
      : subtext;

    return (
      <ListItem
        className={spell.prepared ? 'prepared-spell' : ''}
        name={spell.name}
        subtext={subtext}
        glyph={<Icon icon='icon-repo' />}
        glyphCss='text-spell'
        onClick={() => this.setState({ showDetails: true })}
      >
        <Modal
          id={this.props.spell.id}
          active={this.state.showDetails}
          onDismiss={this.handleCancel}
          content={this.state.editSpell
            ? this.getEditDetailContent()
            : this.getDetailContent()
          }
        />
      </ListItem>
    )
  }
})
