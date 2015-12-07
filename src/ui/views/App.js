"use strict";

import React from 'react';
import Immutable from 'immutable';
import db from '../../api';
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

let error = debug('logs:app:error');
let log = debug('logs:app');

export default React.createClass({
  displayName : "App",


  getInitialState : function() {
    return ({
      activePane : 0,
      loading : true,
      character : Immutable.fromJS(blankCharacter),
      preferences : Immutable.fromJS(blankPreferences)
    })
  },


  // load character into immutable map
  componentWillMount : function() {

    // /users/id/character/pushID must be the same pushId as /characters/pushID
    // in order to write
    //
    // also need to give each entry an id to help with updating character state
    if (this.props.characterUID !== 'noload') {
      db.once('characters/' + this.props.characterUID).then((snap) => {
        var character = snap.val();
        var data;
        var preferences;

        data = JSON.parse(character.character_data);
        preferences = JSON.parse(character.preference_data);

        data = Immutable.fromJS(data);
        preferences = Immutable.fromJS(preferences);

        data = this.state.character.mergeDeep(data);

        // TODO: remove
        window.characterjs = data.toJS();
        window.character = data;
        window.preferences = preferences.toJS();

        this.setState({ character : data, preferences : preferences, loading : false });
      }).catch((err) => {
        error(err.message);
        error('using blank character');
        this.setState({ loading : false });
      })
    }
    else {
      this.setState({ loading : false });
    }
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
  // These functions should call a servie that interacts with the api service
  // and then possibly set state.
  //
  // these should all be events with at least a 'type' property. the rest
  // can be tailored to each pane specifically
  //
  /////////////////////////////////////////////////////////////////////////////
  handleInfoChange : function(event) {
    log("info event:", event);
  },


  handleFeatureChange : function(event) {
    log("feaure event", event);
  },


  handleAbilityChange : function(event) {
    log("ability event:", event);
  },


  handleDefenseChange : function(event) {
    log("defense event:", event);
  },


  handleAttacksChange : function(event) {
    log("attacks event:", event);
  },


  handleSpellsChange : function(event) {
    log("spells event:", event);
  },


  handleEquipmentChange : function(event) {
    log("equipment event:", event);
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
              <Equipments equipment={this.state.character.get('charEquipment')}
                          handleEquipmentChange={this.handleEquipmentChange}/>
            </SwipePane>
          </SwipePanes>
        </section>
        <span id='details'></span>
        <Loading isLoading={this.state.loading} />
      </div>
    );
  }
})


/*

<Tab><Icon icon="icon-chart" /></Tab>
<Tab><Icon icon="icon-shield" /></Tab>
<Tab><Icon icon="icon-attack" /></Tab>
<Tab><Icon icon="icon-repo" /></Tab>
            

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
*/