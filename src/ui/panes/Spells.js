'use strict';

import React from 'react';
import Spell from '../containers/Spell';
import AttackBonusItem from '../containers/AttackBonusItem';
import ClassChargeItem from '../containers/ClassChargeItem';
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
    charges: React.PropTypes.object.isRequired,
    preferences: React.PropTypes.object.isRequired,
    handleSpellsChange: React.PropTypes.func.isRequired,
  },


  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.bubbles !== nextProps.bubbles ||
      this.props.spellDC !== nextProps.spellDC ||
      this.props.spells !== nextProps.spells ||
      this.props.charges !== nextProps.charges ||
      this.state.flattenedSpells !== nextState.flattenedSpells ||
      this.state.viewSpellSlots !== nextState.viewSpellSlots ||
      this.state.createSpellAttackBonus !== nextState.createSpellAttackBonus ||
      this.state.createNewSpell !== nextState.createNewSpell ||
      this.state.slotsPerLevel !== nextState.slotsPerLevel
    );
  },

  getInitialState() {
    return {
      flattenedSpells: [],
      slotsPerLevel: [],
      viewSpellSlots: false,
      createSpellAttackBonus: false,
      createNewSpell: false,
    }
  },

  componentWillReceiveProps(nextProps) {
    let spells = nextProps.spells.toJS();
    let flattenedSpells = spells.reduce((flattened, level, levelId) => {
      if (level.spells) {
        level.spells.forEach(spell => {
          flattened.push(
            Object.assign(
              { levelId },
              spell)
          );
        })
      }
      return flattened;
    }, []);

    let slotsPerLevel = spells.map((lvl, idx) => {
      return {
        idx,
        slots: lvl.slots,
        used: lvl.used,
      }
    });

    this.setState({ flattenedSpells, slotsPerLevel });
  },

  onSpellAttackBonusChange(event) {
    let updatedEvent = Object.assign({}, event, {
      type: 'SPELL_' + event.type
    });

    this.props.handleSpellsChange(updatedEvent);
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
    if (!this.props.bubbles) return null;

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

  renderClassCharges() {
    if (!this.props.charges) return null;
    if (this.props.preferences.get('classCharges') === 'ATTACK_ONLY') return null;
    
    let charges = this.props.charges.map((charge, i) => {
      return <ClassChargeItem
        key={charge.get('id')}
        id={charge.get('id')}
        name={charge.get('name')}
        charges={charge.get('charges')}
        current={charge.get('current')}
        onChange={this.props.handleSpellsChange}
      />
    })

    return (<section className='info-section'>
      { charges }
    </section>)
  },

  renderSpellSlots() {
    return this.props.spells.toJS()
      .slice(1)
      .map((level, i) => {

        let css = '';
        if (level.slots > 0) {
          if (level.slots - level.used === 0) {
            css = 'bg-red text-red';
          }
          else if (level.slots !== level.used && level.used !== 0) {
            css = 'bg-gold text-gold';
          }
          else {
            css = 'bg-green text-green';
          }
        }

      return (
        <div className={`spell-slots-item ${css}`} key={i}>
          <p className='spell-slots-title'>{`lvl ${i + 1}`}</p>
          <p className='spell-slots-count'>{level.slots - level.used}</p>
        </div>
      )
    })
  },

  renderSpells() {
    return this.state.flattenedSpells.map(spell => {
      return (<Spell 
        key={spell.id}
        spell={spell}
        spellLevel={spell.levelId}
        slotsPerLevel={this.state.slotsPerLevel}
        onSpellChange={this.props.handleSpellsChange}
      />)
    })
  },

  render() {

    return (
      <div className="pane-container">
        <section className='info-section'>
          <div className='info-section-header'>
            <h5 className='info-section-title'>Spellcasting Bonuses</h5>
            <CreateAttackBonusDialog
              active={this.state.createSpellAttackBonus}
              dismiss={() => this.setState({ createSpellAttackBonus: false })}
              onCreate={this.onSpellAttackBonusChange}
            />
          </div>
          { this.renderSpellDC() }
          { this.renderSpellAttackBonuses() }
          <p
            className='subtext text-center p2 interactable'
            onClick={() => this.setState({ createSpellAttackBonus: true })}
          ><Icon icon='fa fa-plus' /> Create a new spell attack bonus</p>
        </section>
        { this.renderClassCharges() }
        <section className='info-section'>
          <div className='info-section-header'>
            <h5 className='info-section-title'>Spells</h5>
          </div>
          <div className='spell-slots-container' onClick={() => this.setState({ viewSpellSlots: true })}>
            { this.renderSpellSlots() }
          </div>
          <div className='spells-container'>
            { this.renderSpells() }
            <p
            className='subtext text-center p2 interactable'
            onClick={() => this.setState({ createNewSpell: true })}
          ><Icon icon='fa fa-plus' /> Create a new spell</p>
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
