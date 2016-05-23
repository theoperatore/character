'use strict';

import React from 'react';
import ListItem from '../../components/ListItem/v2';
import Modal from '../../components/Modal';
import ConfirmModal from '../../dialogs/ConfirmModal';
import EditSpell from '../../dialogs/spells/edit';
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
    onSpellChange: React.PropTypes.func.isRequired,
  },

  getInitialState() {
    return {
      showDetails: false,
      editSpell: false,
      confirm: false,
      message: null,
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
        <button className='text-purple'
          onClick={() => {}}
        ><Icon icon='icon-repo'/> Cast</button>
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
        className={spell.prepared ? 'prepared-spell' : ''}
        name={spell.name}
        subtext={subtext}
        glyph={<Icon icon='icon-repo' />}
        glyphCss='text-spell'
        onClick={() => this.setState({ showDetails: true })}
      >
        <Modal
          id={spell.id}
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
        <ConfirmModal
          active={this.state.confirm}
          onConfirm={this.handleConfirm}
          message={this.state.message}
        />
      </ListItem>
    )
  }
})
