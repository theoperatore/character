'use strict';

import React, { Component } from 'react';
import ListItem from '../../../components/ListItem/v2';
import Modal from '../../../components/Modal';
import ConfirmModal from '../../dialogs/ConfirmModal';
import EditSpell from '../../dialogs/spells/edit';
import CastSpell from '../../dialogs/spells/cast';
import Icon from '../../../components/Icon';

export default React.createClass({
  displayName: 'Spell',

  propTypes: {
    spell: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      desc: PropTypes.string.isRequired,
      cast: PropTypes.string.isRequired,
      range: PropTypes.string.isRequired,
      cmp: PropTypes.string.isRequired,
      dur: PropTypes.string.isRequired,
      prepared: PropTypes.bool.isRequired,
    }),
    spellLevel: PropTypes.number.isRequired,
    onSpellChange: PropTypes.func.isRequired,
    slotsPerLevel: PropTypes.array.isRequired,
  },

  getInitialState() {
    return {
      showDetails: false,
      editSpell: false,
      confirm: false,
      message: null,
      castSpell: false,
    }
  },

  handleConfirm(answer) {
    switch (answer) {
      case 'yes':
        this.props.onSpellChange({
          type: 'SPELL_DELETE',
          data: {
            id: this.props.spell.id,
            level: this.props.spellLevel,
          }
        });
        this.setState({
          confirm: false,
          showDetails: false,
          editSpell: false,
        });
        break;
      case 'no':
        this.setState({
          confirm: false,
        });
        break;
    }
  },

  handleDelete() {
    this.setState({
      confirm: true,
      message: `Are you sure you want to delete the spell: ${this.props.spell.name}?`
    });
  },

  handleEditCancel() {
    this.setState({
      editSpell: false,
    });
  },

  handleDetailCancel() {
    this.setState({
      showDetails: false,
    });
  },

  prepareSpell() {
    let type = this.props.spell.prepared
      ? 'SPELL_UNPREPARE'
      : 'SPELL_PREPARE';

    let data = {
      level: this.props.spellLevel,
      id: this.props.spell.id,
    };

    this.props.onSpellChange({ type, data });
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

    let icon = `fa fa-bookmark${prepared ? '' : '-o'}`;

    return (<section>
      <div className='modal-header cf'>
        <h3 className='left'>{name}</h3>
        <h3
          className='right text-purple prepare-spell-icon'
          onClick={this.prepareSpell}
        ><Icon icon={icon}/></h3>
      </div>
      <div className='modal-content row'>
        <p>{desc}</p>
        <hr />
        <div className='col-1-2'>
          <div className='spell-detail'>
            <p><strong>Casting Time</strong></p>
            <p>{cast}</p>
          </div>
          <div className='spell-detail'>
            <p><strong>Range</strong></p>
            <p>{range}</p>
          </div>
        </div>
        <div className='col-1-2'>
          <div className='spell-detail'>
            <p><strong>Components</strong></p>
            <p>{cmp}</p>
          </div>
          <div className='spell-detail'>
            <p><strong>Duration</strong></p>
            <p>{dur}</p>
          </div>
        </div>
      </div>
      <div className='modal-footer'>
        <button className='text-green'
          onClick={() => this.setState({ editSpell: true })}
        ><Icon icon='fa fa-pencil'/> Edit</button>
        {
          this.props.spellLevel !== 0
            ? <button className='text-purple'
                onClick={() => this.setState({ castSpell: true })}
              ><Icon icon='icon-repo'/> Cast</button>
            : null
        }
        <button
          className='text-red'
          onClick={this.handleDelete}
        ><Icon icon='fa fa-remove'/> Delete</button>
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
        className={spell.prepared ? 'prepared-spell pl2' : 'pl2'}
        name={spell.name}
        subtext={subtext}
        glyph={<Icon icon='icon-repo' />}
        glyphCss='text-spell'
        onClick={() => this.setState({ showDetails: true })}
      >
        <Modal
          id={`spell-${spell.id}`}
          active={this.state.showDetails}
          onDismiss={this.handleDetailCancel}
          content={this.state.editSpell
            ? <EditSpell
                spell={this.props.spell}
                level={spellLevel}
                onChange={this.props.onSpellChange}
                onCancel={this.handleEditCancel}
              />
            : this.getDetailContent()
          }
        />
        <CastSpell
          active={this.state.castSpell}
          spellId={this.props.spell.id}
          initialSpellLevel={this.props.spellLevel}
          slotsPerLevel={this.props.slotsPerLevel}
          onCast={this.props.onSpellChange}
          onDismiss={() => this.setState({ castSpell: false })}
        />
        <ConfirmModal
          active={this.state.confirm}
          onConfirm={this.handleConfirm}
          message={this.state.message}
        />
      </ListItem>
    )
  }
})
