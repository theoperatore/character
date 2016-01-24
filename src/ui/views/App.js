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


  getInitialState : function() {
    return ({
      activePane : 3,
      loading : true,
      character : Immutable.fromJS(blankCharacter),
      preferences : Immutable.fromJS(blankPreferences)
    })
  },


  // load character into immutable map
  componentWillMount : function() {

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
  shouldComponentUpdate : function(nextProps, nextState) {
    return true;
  },


  handlePaneSwipe : function(ev) {
    this.setState({ activePane : ev.activeIndex });
  },


  handleTabSelect : function(idx) {
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
        character.charOtherProficiencies.proficiencies[event.id].name = event.name;
        character.charOtherProficiencies.proficiencies[event.id].desc = event.desc;
        this.setState({ character: Immutable.fromJS(character) });
        break;
      case 'PROFICIENCY_DELETE':
        character.charOtherProficiencies.proficiencies.splice(event.id, 1);
        this.setState({ character: Immutable.fromJS(character) });
        break;
      case 'PROFICIENCY_CREATE':
        character.charOtherProficiencies.proficiencies.push(event.data);
        this.setState({ character: Immutable.fromJS(character) });
        break;
      case 'LANGUAGE_EDIT':
        break;
      case 'LANGUAGE_DELETE':
        break;
      case 'LANGUAGE_CREATE':
        break;
    }
  },


  handleFeatureChange : function(event) {
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


  handleAbilityChange : function(event) {
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


  handleDefenseChange : function(event) {
    log("defense event:", event);
    switch (event.type) {
      case 'SAVING_THROW_EDIT':
        break;
      case 'HIT_POINTS_EDIT':
        break;
      case 'SPEED_EDIT':
        break;
      case 'INITIATIVE_EDIT':
        break;
      case 'ARMOR_CLASS_EDIT':
        break;
      case 'RESISTANCES_CREATE':
        break;
      case 'RESISTANCES_EDIT':
        break;
      case 'RESISTANCES_DELETE':
        break;
    }
  },


  handleAttacksChange : function(event) {
    log("attacks event:", event);
  },


  handleSpellsChange : function(event) {
    log("spells event:", event);
  },


  handleEquipmentChange : function(event) {
    log("equipment event:", event);
    switch (event.type) {
      case 'EQUIPMENT_CREATE':
        break;
      case 'EQUIPMENT_EDIT':
        break;
      case 'EQUIPMENT_DELETE':
        break;
      case 'MONEY_EDIT':
        break;
    }
  },

  /////////////////////////////////////////////////////////////////////////////

  render : function() {
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
            <Tab><Icon icon="icon-features" /></Tab>
            <Tab><Icon icon="icon-chart" /></Tab>
            <Tab><Icon icon="icon-shield" /></Tab>
            <Tab><Icon icon="icon-attack" /></Tab>
            <Tab><Icon icon="icon-repo" /></Tab>
            <Tab><Icon icon="icon-equipment"/></Tab>
            
          </Tabs>
        </section>

        <section className="character-body">
          <SwipePanes onSlideChangeEnd={this.handlePaneSwipe} activeIdx={this.state.activePane} initialSlide={this.state.activePane}>
            <SwipePane>
              <Info info={this.state.character.get('charInfo')}
                    traits={this.state.character.get('charTraits')}
                    proficiencies={this.state.character.get('charOtherProficiencies')}
                    handleInfoChange={this.handleInfoChange}/>
            </SwipePane>
            <SwipePane>
              <Features features={this.state.character.get('charFeatures')}
                        handleFeatureChange={this.handleFeatureChange}/>
            </SwipePane>
            <SwipePane>
              <Abilities abilities={this.state.character.get('charAbilities')}
                         skills={this.state.character.get('charSkills')}
                         proficiencyBonus={this.state.character.get('charProficiencyBonus')}
                         passivePerception={this.state.character.get('charPassivePerception')}
                         handleAbilityChange={this.handleAbilityChange}/>
            </SwipePane>


            <SwipePane>
              <Defenses hitPoints={this.state.character.get('charHitPoints')}
                        speed={this.state.character.get('charSpeed')}
                        initiative={this.state.character.get('charInitiative')}
                        armorClass={this.state.character.get('charArmorClass')}
                        savingThrows={this.state.character.get('charSavingThrows')}
                        resistances={this.state.character.get('charResistances')}
                        handleDefenseChange={this.handleDefenseChange}/>
            </SwipePane>
            <SwipePane>
              <h1>Attacks Pane</h1>
            </SwipePane>            
            <SwipePane>
              <h1>Spells Pane</h1>
            </SwipePane>            
            <SwipePane>
              <h1>Equipments Pane</h1>
            </SwipePane>            
          </SwipePanes>
        </section>
        <Loading isLoading={this.state.loading} />
      </div>
    );
  }
})


/*


<Tab><Icon icon="icon-shield" /></Tab>
<Tab><Icon icon="icon-attack" /></Tab>
<Tab><Icon icon="icon-repo" /></Tab>
<Tab><Icon icon="icon-equipment"/></Tab>
            



<SwipePane>
  <Attacks attacks={this.state.character.get('charAttacks')}
           charges={this.state.character.get('charClassCharges')}
           abilities={this.state.character.get('charAbilities')}
           proficiencyBonus={this.state.character.get('charProficiencyBonus')}
           bubbles={this.state.preferences.get('atkBubbles')}
           handleAttacksChange={this.handleAttacksChange}/>
</SwipePane>
<SwipePane>
  <Spells bubbles={this.state.preferences.get('spellBubbles')}
          spellDC={this.state.preferences.get('spellDC')}
          spells={this.state.character.get('charSpells')}
          abilities={this.state.character.get('charAbilities')}
          proficiencyBonus={this.state.character.get('charProficiencyBonus')}
          handleSpellsChange={this.handleSpellsChange}/>
</SwipePane>
<SwipePane>
  <Equipments equipment={this.state.character.get('charEquipment')}
              handleEquipmentChange={this.handleEquipmentChange}/>
</SwipePane>
*/