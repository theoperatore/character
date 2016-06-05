"use strict";

import React from 'react';

import Router from '../router/Router';

import { db } from '../../api';

import SwipePanes from '../components/SwipePanes';
import SwipePane from '../components/SwipePane';
import Tabs from '../components/Tabs';
import Tab from '../components/Tab';
import Icon from '../components/Icon';
import Loading from '../components/Loading';
import Drawer from '../components/Drawer';

import Info from './panes/Info';
import Features from './panes/Features';
import Abilities from './panes/Abilities';
import Defenses from './panes/Defenses';
import Attacks from './panes/Attacks';
import Spells from './panes/Spells';
import Equipments from './panes/Equipments';

export default React.createClass({
  displayName : "CharacterApp",


  propTypes: {
    character: React.PropTypes.object.isRequired,
    preferences: React.PropTypes.object.isRequired,
    updateState: React.PropTypes.func.isRequired,
  },


  getInitialState() {
    return ({
      activePane : 0,
      loading : false, // TODO: figure this out...perhaps a thunk?
      mainMenu: false,
      settingsMenu: false,
    })
  },

  // should only updated when there is a change to character state data
  // TODO: might run into a problem...swiping between panes is going to trigger
  // a state update. this means that each pane is going to need to explicitly
  // handle it's own `shouldComponentUpdate` function.
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  },

  logout() {
    db.auth().signOut().then(() => {
      console.log('signed out');
    }).catch(err => {
      console.error(err);
    })
  },


  handlePaneSwipe(ev) {
    this.setState({ activePane : ev.activeIndex });
  },


  handleTabSelect(idx) {
    this.setState({ activePane : idx });
  },

  getMenuContent() {
    return <section>
      <div className='drawer-header'><p>Menu</p></div>
      <div className='drawer-content p3'>
        <button
          onClick={() => Router.nav('#/profile')}
          className='btn btn-default btn-primary block mb2 mt2 full-width'
        >
          <Icon icon='fa fa-random' /> Switch Characters
        </button>
        <button
          onClick={this.logout}
          className='btn btn-default btn-danger block mb2 mt6 full-width'
        >
          <Icon icon='fa fa-sign-out'/> Sign Out</button>
      </div>
    </section>
  },

  getSettingsContent() {
    return <section>
      <div className='drawer-header'><p>Preferences</p></div>
      <div className='drawer-content p2'>
        <div className='input-grouping'>
          <p>Panes</p>
          <div className='inputs'>
            <input
              type='checkbox'
              id='settings-attack-pane'
              defaultChecked={!this.props.preferences.getIn(['Attacks', 'display'])}
              onChange={() => {
                this.props.updateState({ type: 'TOGGLE_ATTACK_PANE' });
              }}
            />
            <label htmlFor='settings-attack-pane'>Hide Attacks Pane</label>
          </div>
          <div className='inputs'>
            <input
              type='checkbox'
              id='settings-spells-pane'
              checked={!this.props.preferences.getIn(['Spells', 'display'])}
              onChange={() => {
                this.props.updateState({ type: 'TOGGLE_SPELLS_PANE' })
              }}
            />
            <label htmlFor='settings-spells-pane'>Hide Spells Pane</label>
          </div>
        </div>
        <div className='input-grouping'>
          <p>Class Charges</p>
          <div className='inputs'>
            <input
              type='radio'
              id='settings-chrgs-attack'
              checked={this.props.preferences.get('classCharges') === 'ATTACK_ONLY'}
              onChange={() => {
                this.props.updateState({ type: 'SET_CLASS_CHARGES', data: 'ATTACK_ONLY' });
              }}
            />
            <label htmlFor='settings-chrgs-attack'>Attack pane only</label>
          </div>
          <div className='inputs'>
            <input
              type='radio'
              id='settings-chrgs-spells'
              checked={this.props.preferences.get('classCharges') === 'SPELLS_ONLY'}
              onChange={() => {
                this.props.updateState({ type: 'SET_CLASS_CHARGES', data: 'SPELLS_ONLY' })
              }}
            />
            <label htmlFor='settings-chrgs-spells'>Spell pane only</label>
          </div>
          <div className='inputs'>
            <input
              type='radio'
              id='settings-chrgs-both'
              checked={this.props.preferences.get('classCharges') === 'BOTH'}
              onChange={() => {
                this.props.updateState({ type: 'SET_CLASS_CHARGES', data: 'BOTH' })
              }}
            />
            <label htmlFor='settings-chrgs-both'>Both Attack and Spell panes</label>
          </div>
        </div>
      </div>
    </section>
  },

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
            <div className='flex'>
              <h5
                className='flex-auto p3'
                onClick={() => this.setState({ mainMenu: true })}
              >{character.get('charName')}</h5>
              <Icon
                icon='fa fa-ellipsis-v'
                className='p3 interactable'
                onClick={() => this.setState({ settingsMenu: true })}
              />
            </div>
          </header>
          <Drawer
            direction='left'
            id='main-menu'
            active={this.state.mainMenu}
            content={this.getMenuContent()}
            onDismiss={() => this.setState({ mainMenu: false })}
          />
          <Drawer
            direction='right'
            id='settings-menu'
            active={this.state.settingsMenu}
            content={this.getSettingsContent()}
            onDismiss={() => this.setState({ settingsMenu: false })}
          />
          <Tabs activeIdx={this.state.activePane} onTabSelect={this.handleTabSelect}>
            {
              this.props.preferences.get('tabs')
                .filter(tab => {
                  let prefs = this.props.preferences.getIn([tab.get('name')]);
                  return prefs 
                    ? prefs.get('display')
                    : true
                })
                .map((tab, i) => {
                  return (
                    <Tab key={i}>
                      <div>
                        <p><Icon icon={tab.get('icon')} /></p>
                        <p className='small'>{tab.get('name')}</p>
                      </div>
                    </Tab>
                  );
                })
            }
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
            {
              (function conditionalAttacks(props) {
                if (props.preferences.getIn(['Attacks', 'display'])) {
                  return <SwipePane>
                    <Attacks
                      attacks={character.get('charAttacks')}
                      charges={character.get('charClassCharges')}
                      bubbles={character.get('charAttackBubbles')}
                      preferences={props.preferences}
                      handleAttacksChange={updateState}
                      handlePreferencesChange={updateState}
                    />
                  </SwipePane>
                }
              })(this.props)
            }
            {            
              (function conditionalSpells(props) {
                if (props.preferences.getIn(['Spells', 'display'])) {
                  return <SwipePane>
                    <Spells 
                      bubbles={character.get('charSpellBubbles')}
                      spellDC={character.get('charSpellSaveDC')}
                      spells={character.get('charSpells')}
                      charges={character.get('charClassCharges')}
                      preferences={props.preferences}
                      handleSpellsChange={updateState}
                    />
                  </SwipePane>
                }
              })(this.props)
            }
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