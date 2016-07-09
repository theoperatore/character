"use strict";

import React from 'react';

import Router from '../router/Router';
import { db } from '../../api';
import { signOut } from '../state/actions';
import { ROUTE_PROFILE } from '../routes';

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

import { characterProvider } from './characterProvider';
import connectUserRoute from '../connectUserRoute';

let Character = React.createClass({
  displayName: "CharacterApp",

  propTypes: {
    dispatch: React.PropTypes.func.isRequired,
    state: React.PropTypes.object.isRequired,
    isLoading: React.PropTypes.bool,
    isSaving: React.PropTypes.bool,
    saveError: React.PropTypes.object,
    lastSavedDate: React.PropTypes.number,
  },

  getInitialState() {
    return ({
      activePane : 0,
      mainMenu: false,
      settingsMenu: false,
    })
  },

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.state.character !== this.props.state.character ||
           nextProps.isLoading !== this.props.isLoading ||
           nextProps.isSaving !== this.props.isSaving ||
           nextProps.saveError !== this.props.saveError ||
           nextProps.lastSavedDate !== this.props.lastSavedDate ||
           nextState.activePane !== this.state.activePane ||
           nextState.mainMenu !== this.state.mainMenu ||
           nextState.settingsMenu !== this.state.settingsMenu

  },

  signOut() {
    this.props.dispatch(signOut());
  },


  handlePaneSwipe(ev) {
    this.setState({ activePane : ev.activeIndex });
  },


  handleTabSelect(idx) {
    this.setState({ activePane : idx });
  },

  getMenuContent() {
    let date = new Date(this.props.lastSavedDate);
    let time = date.toDateString();

    return <section>
      <div className='drawer-header'><p>Menu</p></div>
      <div className='drawer-content p3'>
        <button
          onClick={() => Router.nav(ROUTE_PROFILE)}
          className='btn btn-default btn-primary block mb2 mt2 full-width'
        >
          <Icon icon='fa fa-random' /> Switch Characters
        </button>
        <hr />
        <p className='subtext'>Last Saved: {time}</p>
        {
          this.props.saveError &&
          <p className='text-red'>{this.props.saveError.message}</p>
        }
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
              defaultChecked={!this.props.state.preferences.getIn(['Attacks', 'display'])}
              onChange={() => {
                this.props.dispatch({ type: 'TOGGLE_ATTACK_PANE' });
              }}
            />
            <label htmlFor='settings-attack-pane'>Hide Attacks Pane</label>
          </div>
          <div className='inputs'>
            <input
              type='checkbox'
              id='settings-spells-pane'
              checked={!this.props.state.preferences.getIn(['Spells', 'display'])}
              onChange={() => {
                this.props.dispatch({ type: 'TOGGLE_SPELLS_PANE' })
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
              checked={this.props.state.preferences.get('classCharges') === 'ATTACK_ONLY'}
              onChange={() => {
                this.props.dispatch({ type: 'SET_CLASS_CHARGES', data: 'ATTACK_ONLY' });
              }}
            />
            <label htmlFor='settings-chrgs-attack'>Attack pane only</label>
          </div>
          <div className='inputs'>
            <input
              type='radio'
              id='settings-chrgs-spells'
              checked={this.props.state.preferences.get('classCharges') === 'SPELLS_ONLY'}
              onChange={() => {
                this.props.dispatch({ type: 'SET_CLASS_CHARGES', data: 'SPELLS_ONLY' })
              }}
            />
            <label htmlFor='settings-chrgs-spells'>Spell pane only</label>
          </div>
          <div className='inputs'>
            <input
              type='radio'
              id='settings-chrgs-both'
              checked={this.props.state.preferences.get('classCharges') === 'BOTH'}
              onChange={() => {
                this.props.dispatch({ type: 'SET_CLASS_CHARGES', data: 'BOTH' })
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
    } = this.props.state;
    let dispatch = this.props.dispatch;

    return (
      <div className="character-container">
        <section ref="header" className="character-header">
          <header>
            <div className='flex'>
              <div
                className='flex-auto p3'
                onClick={() => this.setState({ mainMenu: true })}
              >
                <h5 className='p0'>
                  {character.get('charName')}
                  <Icon
                    className={
                      this.props.saveError
                      ? 'text-red ml2'
                      : this.props.isSaving
                      ? 'text-blue ml2'
                      : 'text-green ml2'
                    }
                    icon={
                      this.props.saveError
                      ? 'fa fa-exclamation'
                      : this.props.isSaving
                      ? 'fa fa-download'
                      : 'fa fa-check'
                    }
                  />
                </h5>
              </div>
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
              preferences.get('tabs')
                .filter(tab => {
                  let prefs = preferences.getIn([tab.get('name')]);
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
                handleInfoChange={dispatch}
              />
            </SwipePane>
            <SwipePane>
              <Features
                features={character.get('charFeatures')}
                charges={character.get('charClassCharges')}
                handleFeatureChange={dispatch}
              />
            </SwipePane>
            <SwipePane>
              <Abilities
                abilities={character.get('charAbilities')}
                skills={character.get('charSkills')}
                proficiencyBonus={character.get('charProficiencyBonus')}
                passivePerception={character.get('charPassivePerception')}
                handleAbilityChange={dispatch}
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
                handleDefenseChange={dispatch}
              />
            </SwipePane>
            {
              (function conditionalAttacks(prefs) {
                if (prefs.getIn(['Attacks', 'display'])) {
                  return <SwipePane>
                    <Attacks
                      attacks={character.get('charAttacks')}
                      charges={character.get('charClassCharges')}
                      bubbles={character.get('charAttackBubbles')}
                      preferences={prefs}
                      handleAttacksChange={dispatch}
                      handlePreferencesChange={dispatch}
                    />
                  </SwipePane>
                }
              })(preferences)
            }
            {
              (function conditionalSpells(prefs) {
                if (prefs.getIn(['Spells', 'display'])) {
                  return <SwipePane>
                    <Spells
                      bubbles={character.get('charSpellBubbles')}
                      spellDC={character.get('charSpellSaveDC')}
                      spells={character.get('charSpells')}
                      charges={character.get('charClassCharges')}
                      preferences={prefs}
                      handleSpellsChange={dispatch}
                    />
                  </SwipePane>
                }
              })(preferences)
            }
            <SwipePane>
              <Equipments
                equipment={character.get('charEquipment')}
                handleEquipmentChange={dispatch}
              />
            </SwipePane>
          </SwipePanes>
        </section>
        <Loading isLoading={this.props.isLoading} />
      </div>
    );
  }
});

export default connectUserRoute(characterProvider(Character));
