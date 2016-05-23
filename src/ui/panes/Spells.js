'use strict';

import React from 'react';
import Spell from '../containers/Spell';
import AttackBonusItem from '../containers/AttackBonusItem';
import SpellSlotsModal from '../dialogs/spells/spell-slots/edit';
import CreateSpellContent from '../dialogs/spells/create';
import CreateAttackBonusDialog from '../dialogs/attacks/CreateAttackBonusDialog';
import Icon from '../components/Icon';
import Modal from '../components/Modal';

export default React.createClass({
  displayName: "PaneSpells",

  propTypes: {
    spells: React.PropTypes.object.isRequired,
    spellDC: React.PropTypes.object.isRequired,
    bubbles: React.PropTypes.object.isRequired,
    handleSpellsChange: React.PropTypes.func.isRequired,
    handlePreferencesChange: React.PropTypes.func.isRequired,
  },


  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.bubbles !== nextProps.bubbles ||
      this.props.spellDC !== nextProps.spellDC ||
      this.props.spells !== nextProps.spells ||
      this.state.flattenedSpells !== nextState.flattenedSpells ||
      this.state.viewSpellSlots !== nextState.viewSpellSlots ||
      this.state.createSpellAttackBonus !== nextState.createSpellAttackBonus ||
      this.state.createNewSpell !== nextState.createNewSpell
    )
  },

  getInitialState() {
    return {
      flattenedSpells: [],
      viewSpellSlots: false,
      createSpellAttackBonus: false,
      createNewSpell: false,
    }
  },

  componentWillReceiveProps(nextProps) {
    let flattenedSpells = nextProps.spells.toJS().reduce((flattened, level, levelId) => {
      level.spells.forEach(spell => {
        flattened.push(
          Object.assign(
            { levelId },
            spell)
        );
      })
      return flattened;
    }, []);

    this.setState({ flattenedSpells });
  },

  onSpellAttackBonusChange(event) {
    let updatedEvent = Object.assign({}, event, {
      type: 'SPELL_' + event.type
    });

    this.props.handlePreferencesChange(updatedEvent);
  },

  onSpellDCChange(event) {
    let updatedEvent = Object.assign({}, event, {
      type: 'SPELL_DC_EDIT'
    });

    this.props.handleSpellsChange(updatedEvent);
  },

  handleCreateCancel() {
    this.setState({ createNewSpell: false });
  },

  renderSpellDC() {
    let subtitle = this.props.spellDC.get('abil');

    subtitle = this.props.spellDC.get('prof')
      ? subtitle + ' - proficient'
      : subtitle;

    return <AttackBonusItem
      removable={false}
      id={this.props.spellDC.get('id')}
      score={this.props.spellDC.get('score')}
      ability={this.props.spellDC.get('abil')}
      proficient={this.props.spellDC.get('prof')}
      bonus={this.props.spellDC.get('bonus')}
      title={this.props.spellDC.get('name')}
      subtitle={subtitle}
      onChange={this.onSpellDCChange}
    />
  },

  renderSpellAttackBonuses() {
    return this.props.bubbles.toJS().map(bubble => {
      let subtitle = bubble.abil;

      subtitle = bubble.prof
        ? subtitle + ' - proficient'
        : subtitle;

      return <AttackBonusItem
        key={bubble.id}
        id={bubble.id}
        score={bubble.score}
        ability={bubble.abil}
        proficient={bubble.prof}
        bonus={bubble.bonus}
        title={bubble.name}
        subtitle={subtitle}
        onChange={this.onSpellAttackBonusChange}
      />
    })
  },

  renderSpellSlots() {
    return this.props.spells.toJS()
      .slice(1)
      .map((level, i) => {
      return (
        <div className='spell-slots-item' key={i}>
          <p className='spell-slots-title'>{`lvl ${i + 1}`}</p>
          <p className='spell-slots-count'>{level.slots - level.used}</p>
        </div>
      )
    })
  },

  renderSpells() {
    if (this.state.flattenedSpells.length === 0) {
      return <p className='subtext text-center border-top'>Add a spell by tapping on the 'plus' icon.<Icon icon='fa fa-level-up' /></p>
    }

    return this.state.flattenedSpells.map(spell => {
      return (<Spell 
        key={spell.id}
        spell={spell}
        spellLevel={spell.levelId}
        onSpellChange={this.props.handleSpellsChange}
      />)
    })
  },

  render() {

    return (
      <div className="pane-container">
        <section className='info-section'>
          <div className='info-section-header interactable' onClick={() => this.setState({ createSpellAttackBonus: true })}>
            <h5 className='info-section-title'>Spellcasting Bonuses</h5>
            <p className='info-section-addon'><Icon icon='fa fa-plus'/></p>
            <CreateAttackBonusDialog
              active={this.state.createSpellAttackBonus}
              dismiss={() => this.setState({ createSpellAttackBonus: false })}
              onCreate={this.onSpellAttackBonusChange}
            />
          </div>
          { this.renderSpellDC() }
          { this.renderSpellAttackBonuses() }
        </section>
        <section className='info-section'>
          <div className='info-section-header interactable' onClick={() => this.setState({ createNewSpell: true })}>
            <h5 className='info-section-title'>Spells</h5>
            <p className='info-section-addon'><Icon icon='fa fa-plus'/></p>
          </div>
          <div className='spell-slots-container' onClick={() => this.setState({ viewSpellSlots: true })}>
            { this.renderSpellSlots() }
          </div>
          <div className='spells-container'>
            { this.renderSpells() }
          </div>
          <Modal
            id='create-new-spell'
            active={this.state.createNewSpell}
            onDismiss={this.handleCreateCancel}
            content={<CreateSpellContent onChange={this.props.handleSpellsChange} onCancel={this.handleCreateCancel}/>}
          />
        </section>
        <SpellSlotsModal
          slots={this.props.spells.toJS()}
          active={this.state.viewSpellSlots}
          onDismiss={() => this.setState({ viewSpellSlots: false })}
          onSpellSlotsChange={this.props.handleSpellsChange}
        />
      </div>
    );
  }
})
