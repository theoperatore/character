"use strict";

var React = require('react/addons');
var Immutable = require('immutable');
var db = require('../../api');
var blankCharacter = require('../data/blank');
var blankPreferences = require('../data/preferences');

var SwipePanes = require('../components/SwipePanes');
var SwipePane = require('../components/SwipePane');
var Tabs = require('../components/Tabs');
var Tab = require('../components/Tab');
var Icon = require('../components/Icon');
var Loading = require('../components/Loading');

var Info = require('../panes/Info');
var Features = require('../panes/Features');
var Abilities = require('../panes/Abilities');
var Defenses = require('../panes/Defenses');
var Attacks = require('../panes/Attacks');
var Spells = require('../panes/Spells');
var Equipments = require('../panes/Equipments');

module.exports = React.createClass({
  displayName : "App",


  getInitialState : function() {
    return ({
      activePane : 5,
      loading : true,
      character : Immutable.fromJS(blankCharacter),
      preferences : Immutable.fromJS(blankPreferences)
    })
  },


  // load character into immutable map
  componentWillMount : function() {

    // /users/id/character/pushID must be the same pushId as /characters/pushID
    // in order to write
    db.once('characters/' + this.props.characterUID).then((snap) => {
      var character = snap.val();
      var data;
      var preferences;

      data = JSON.parse(character.character_data);
      preferences = JSON.parse(character.preference_data);

      data = Immutable.fromJS(data);
      preferences = Immutable.fromJS(preferences);

      window.characterjs = data.toJS();
      window.character = data;
      window.preferences = preferences.toJS();

      this.setState({ character : data, preferences : preferences, loading : false });
    }).catch((err) => {
      console.error(err);
    })
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


  handleInfoChange : function(key, data) {
    console.log("got new info:", data);
  },


  handleFeatureChange : function(data) {
    console.log("feaure change", data);
  },


  handleAbilityChange : function(key, data) {
    console.log("ability change:", key, data);
  },


  handleDefenseChange : function(key, data) {
    console.log("defense change:", key, data);
  },


  handleAttacksChange : function(key, data) {
    console.log("attacks change:", key, data);
  },


  handleSpellsChange : function(key, data) {
    console.log("spells change:", key, data);
  },


  handleEquipmentChange : function(key, data) {
    console.log("equipment change:", key, data);
  },


  render : function() {
    return (
      <div className="character-container">
        <h1>{this.state.character.get('charName')}</h1>

        <Tabs activeIdx={this.state.activePane} onTabSelect={this.handleTabSelect}>
          <Tab><Icon icon="icon-crown" /></Tab>
          <Tab><Icon icon="icon-features" /></Tab>
          <Tab><Icon icon="icon-chart" /></Tab>
          <Tab><Icon icon="icon-shield" /></Tab>
          <Tab><Icon icon="icon-attack" /></Tab>
          <Tab><Icon icon="icon-repo" /></Tab>
          <Tab><Icon icon="icon-equipment"/></Tab>
        </Tabs>

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
        </SwipePanes>

        <Loading isLoading={this.state.loading} />
      </div>
    );
  }
})
