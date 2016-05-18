"use strict";

import React from 'react';

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

export default React.createClass({
  displayName : "App",


  propTypes: {
    character: React.PropTypes.object.isRequired,
    preferences: React.PropTypes.object.isRequired,
    updateState: React.PropTypes.func.isRequired,
  },


  getInitialState() {
    return ({
      activePane : 6,
      loading : false, // TODO: figure this out...
    })
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

  render() {
    let {
      character,
      preferences,
      updateState
    } = this.props;

    return (
      <div className="character-container">
        <section ref="header" className="character-header">
          <header>
            <div>
              <h5>{character.get('charName')}</h5>
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
                info={character.get('charInfo')}
                traits={character.get('charTraits')}
                proficiencies={character.get('charOtherProficiencies')}
                handleInfoChange={updateState}
              />
            </SwipePane>
            <SwipePane>
              <Features 
                features={character.get('charFeatures')}
                charges={character.get('charClassCharges')}
                handleFeatureChange={updateState}
              />
            </SwipePane>
            <SwipePane>
              <Abilities
                abilities={character.get('charAbilities')}
                skills={character.get('charSkills')}
                proficiencyBonus={character.get('charProficiencyBonus')}
                passivePerception={character.get('charPassivePerception')}
                handleAbilityChange={updateState}
               />
            </SwipePane>
            <SwipePane>
              <Defenses 
                hitPoints={character.get('charHitPoints')}
                speed={character.get('charSpeed')}
                initiative={character.get('charInitiative')}
                armorClass={character.get('charArmorClass')}
                savingThrows={character.get('charSavingThrows')}
                resistances={character.get('charResistances')}
                handleDefenseChange={updateState}
              />
            </SwipePane>
            <SwipePane>
              <Attacks 
                attacks={character.get('charAttacks')}
                charges={character.get('charClassCharges')}
                bubbles={character.get('charAttackBubbles')}
                handleAttacksChange={updateState}
                handlePreferencesChange={updateState}
              />
            </SwipePane>            
            <SwipePane>
              <Spells 
                bubbles={character.get('charSpellBubbles')}
                spellDC={character.get('charSpellSaveDC')}
                spells={character.get('charSpells')}
                handleSpellsChange={updateState}
                handlePreferencesChange={updateState}
              />
            </SwipePane>            
            <SwipePane>
              <Equipments
                equipment={character.get('charEquipment')}
                handleEquipmentChange={updateState}
              />
            </SwipePane>            
          </SwipePanes>
        </section>
        <Loading isLoading={this.state.loading} />
      </div>
    );
  }
});