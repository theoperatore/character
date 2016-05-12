"use strict";

import React from 'react';
import Immutable from 'immutable';

import blankCharacter from '../data/blank';
import blankPreferences from '../data/preferences';

import debug from 'debug';

import SwipePanes from '../components/SwipePanes';
import SwipePane from '../components/SwipePane';
import Tabs from '../components/Tabs';
import Tab from '../components/Tab';
import Icon from '../components/Icon';
import Loading from '../components/Loading';

import Info from '../panes/Info';
import Features from '../panes/Features';
import Abilities from '../panes/Abilities';
import Defenses from '../panes/Defenses';
import Attacks from '../panes/Attacks';
import Spells from '../panes/Spells';
import Equipments from '../panes/Equipments';

let error = debug('app:error');
let log = debug('app:index');

export default React.createClass({
  displayName : "App",


  propTypes: {
    character_data: React.PropTypes.object.isRequired,
    preferences_data: React.PropTypes.object.isRequired,
    onNewState: React.PropTypes.func.isRequired
  },


  getInitialState() {
    return ({
      activePane : 6,
      loading : true,
      character : Immutable.fromJS(blankCharacter),
      preferences : Immutable.fromJS(blankPreferences)
    })
  },


  // load character into immutable map
  componentWillMount() {

    // database stuff should be outside of this component.
    let character = Immutable.fromJS(this.props.character_data);
    let preferences = Immutable.fromJS(this.props.preferences_data);

    character = this.state.character.mergeDeep(character);

    this.setState({ character, preferences, loading: false });

  },


  // should only updated when there is a change to character state data
  // TODO: might run into a problem...swiping between panes is going to trigger
  // a state update. this means that each pane is going to need to explicitly
  // handle it's own `shouldComponentUpdate` function.
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  },


  handlePaneSwipe(ev) {
    this.setState({ activePane : ev.activeIndex });
  },


  handleTabSelect(idx) {
    this.setState({ activePane : idx });
  },


  /////////////////////////////////////////////////////////////////////////////
  // 
  // These functions should call a service that interacts with the api service
  // and then possibly set state.
  //
  // these should all be events with at least a 'type' property. the rest
  // can be tailored to each pane specifically
  //
  /////////////////////////////////////////////////////////////////////////////
  handleInfoChange(event) {
    log(event);
    let character = this.state.character.toJS();

    switch (event.type) {
      case 'BASIC_INFO_EDIT':
        break;
      case 'TRAIT_EDIT':
        break;
      case 'PROFICIENCY_EDIT':
        break;
      case 'PROFICIENCY_DELETE':
        break;
      case 'PROFICIENCY_CREATE':
        break;
      case 'LANGUAGE_EDIT':
        break;
      case 'LANGUAGE_DELETE':
        break;
      case 'LANGUAGE_CREATE':
        break;
    }
  },


  handleFeatureChange(event) {
    log("feaure event", event);
    switch (event.type) {
      case 'FEATURE_CREATE':
        break;
      case 'FEATURE_EDIT':
        break;
      case 'FEATURE_DELETE':
        break;
    }
  },


  handleAbilityChange(event) {
    log("ability event:", event);
    switch (event.type) {
      case 'SKILL_EDIT':
        break;
      case 'ABILITY_SCORE_EDIT':
        break;
      case 'PROFICIENCY_BONUS_EDIT':
        break;
    }
  },


  handleDefenseChange(event) {
    log("defense event:", event);
    switch (event.type) {
      case 'SAVING_THROW_EDIT':
        break;
      case 'HIT_POINTS_EDIT':
        break;
      case 'DEFENSES_EDIT':
        break;
      case 'RESISTANCES_CREATE':
        break;
      case 'RESISTANCES_EDIT':
        break;
      case 'RESISTANCES_DELETE':
        break;
      case 'LONG_REST':
        break;
      case 'SHORT_REST':
        break;
    }
  },


  handleAttacksChange(event) {
    log("attacks event:", event);
    switch(event.type) {
      case 'CLASS_CHARGE_USE':
        break;
      case 'ATTACK_EDIT':
        break;
      case 'ATTACK_DELETE':
        break;
      case 'ATTACK_CREATE':
        break;
    }
  },


  handleSpellsChange(event) {
    log("spells event:", event);
    switch(event.type) {
      case 'SPELL_SLOTS_EDIT':
        break;
      case 'SPELL_DC_EDIT':
        break;
      case 'SPELL_EDIT':
        break;
      case 'SPELL_DELETE':
        break;
      case 'SPELL_CREATE':
        break;
    }
  },


  handleEquipmentChange(event) {
    log("equipment event:", event);
    switch (event.type) {
      case 'EQUIPMENT_ITEM_CREATE':
        break;
      case 'EQUIPMENT_ITEM_EDIT':
        break;
      case 'EQUIPMENT_ITEM_DELETE':
        break;
      case 'EQUIPMENT_CONTAINER_CREATE':
        break;
      case 'EQUIPMENT_CONTAINER_EDIT':
        break;
      case 'EQUIPMENT_CONTAINER_DELETE':
        break;
      case 'MONEY_EDIT':
        break;
    }
  },


  handlePreferencesChange(event) {
    log('preferences event', event);
    switch (event.type) {
      case 'ATTACK_BONUS_CREATE':
        break;
      case 'ATTACK_BONUS_EDIT':
        break;
      case 'ATTACK_BONUS_DELETE':
        break;
      case 'SPELL_ATTACK_BONUS_CREATE':
        break;
      case 'SPELL_ATTACK_BONUS_EDIT':
        break;
      case 'SPELL_ATTACK_BONUS_DELETE':
        break;
    }
  },

  /////////////////////////////////////////////////////////////////////////////

  render() {
    return (
      <div className="character-container">
        <section ref="header" className="character-header">
          <header>
            <div>
              <h5>{this.state.character.get('charName')}</h5>
            </div>
          </header>

          <Tabs activeIdx={this.state.activePane} onTabSelect={this.handleTabSelect}>
            <Tab><Icon icon="icon-crown" /></Tab>
            <Tab><Icon icon="fa fa-sitemap" /></Tab>
            <Tab><Icon icon="fa fa-tasks" /></Tab>
            <Tab><Icon icon="icon-shield" /></Tab>
            <Tab><Icon icon="icon-attack" /></Tab>
            <Tab><Icon icon="icon-repo" /></Tab>
            <Tab><Icon icon="icon-equipment"/></Tab>
          </Tabs>
        </section>

        <section className="character-body">
          <SwipePanes onSlideChangeEnd={this.handlePaneSwipe} activeIdx={this.state.activePane} initialSlide={this.state.activePane}>
            <SwipePane>
              <Info 
                info={this.state.character.get('charInfo')}
                traits={this.state.character.get('charTraits')}
                proficiencies={this.state.character.get('charOtherProficiencies')}
                handleInfoChange={this.handleInfoChange}
              />
            </SwipePane>
            <SwipePane>
              <Features 
                features={this.state.character.get('charFeatures')}
                charges={this.state.character.get('charClassCharges')}
                handleFeatureChange={this.handleFeatureChange}
              />
            </SwipePane>
            <SwipePane>
              <Abilities
                abilities={this.state.character.get('charAbilities')}
                skills={this.state.character.get('charSkills')}
                proficiencyBonus={this.state.character.get('charProficiencyBonus')}
                passivePerception={this.state.character.get('charPassivePerception')}
                handleAbilityChange={this.handleAbilityChange}
               />
            </SwipePane>
            <SwipePane>
              <Defenses 
                hitPoints={this.state.character.get('charHitPoints')}
                speed={this.state.character.get('charSpeed')}
                initiative={this.state.character.get('charInitiative')}
                armorClass={this.state.character.get('charArmorClass')}
                savingThrows={this.state.character.get('charSavingThrows')}
                resistances={this.state.character.get('charResistances')}
                handleDefenseChange={this.handleDefenseChange}
              />
            </SwipePane>
            <SwipePane>
              <Attacks 
                attacks={this.state.character.get('charAttacks')}
                charges={this.state.character.get('charClassCharges')}
                bubbles={this.state.preferences.get('atkBubbles')}
                handleAttacksChange={this.handleAttacksChange}
                handlePreferencesChange={this.handlePreferencesChange}
              />
            </SwipePane>            
            <SwipePane>
              <Spells 
                bubbles={this.state.preferences.get('spellBubbles')}
                spellDC={this.state.character.get('charSpellSaveDC')}
                spells={this.state.character.get('charSpells')}
                handleSpellsChange={this.handleSpellsChange}
                handlePreferencesChange={this.handlePreferencesChange}
              />
            </SwipePane>            
            <SwipePane>
              <Equipments
                equipment={this.state.character.get('charEquipment')}
                handleEquipmentChange={this.handleEquipmentChange}
              />
            </SwipePane>            
          </SwipePanes>
        </section>
        <Loading isLoading={this.state.loading} />
      </div>
    );
  }
})


/*
<Tab><Icon icon="icon-features" /></Tab>
<Tab><Icon icon="icon-chart" /></Tab>
*/