"use strict";

var React = require('react/addons');
var SwipePanes = require('../components/SwipePanes');
var SwipePane = require('../components/SwipePane');
var Tabs = require('../components/Tabs');
var Tab = require('../components/Tab');
var Icon = require('../components/Icon');

var Info = require('../panes/Info');
var Features = require('../panes/Features');
var Abilities = require('../panes/Abilities');
var Defenses = require('../panes/Defenses');
var Attacks = require('../panes/Attacks');
var Spells = require('../panes/Spells');
var Equipments = require('../panes/Equipments');

module.exports = React.createClass({
  displayName : "App",
  render : function() {
    return (
      <div className="character-container">
        <h1>Character</h1>
        <p>{this.props.user}'s {this.props.character}</p>

        <Tabs activeIdx={0}>
          <Tab><Icon icon="icon-crown" /></Tab>
          <Tab><Icon icon="icon-features" /></Tab>
          <Tab><Icon icon="icon-chart" /></Tab>
          <Tab><Icon icon="icon-shield" /></Tab>
          <Tab><Icon icon="icon-attack" /></Tab>
          <Tab><Icon icon="icon-repo" /></Tab>
          <Tab><Icon icon="icon-equipment"/></Tab>
        </Tabs>

        <SwipePanes>
          <SwipePane>
            <Info />
          </SwipePane>
          <SwipePane>
            <Features />
          </SwipePane>
          <SwipePane>
            <Abilities />
          </SwipePane>
          <SwipePane>
            <Defenses />
          </SwipePane>
          <SwipePane>
            <Attacks />
          </SwipePane>
          <SwipePane>
            <Spells />
          </SwipePane>
          <SwipePane>
            <Equipments />
          </SwipePane>
        </SwipePanes>

      </div>
    );
  }
})