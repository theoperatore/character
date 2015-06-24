"use strict";

var React = require('react/addons');
var db = require('../../api');

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


  getInitialState : function() {
    return ({
      activePane : 3
    })
  },


  componentWillMount : function() {
    //db.once('/users/')

    // /users/id/character/pushID must be the same pushId as /characters/pushID
    // in order to write
  },


  componentDidMount : function() {
    console.log(this.props.user, this.props.character);
  },


  handlePaneSwipe : function(ev) {
    this.setState({ activePane : ev.activeIndex });
  },


  handleTabSelect : function(idx) {
    this.setState({ activePane : idx });
  },


  render : function() {
    return (
      <div className="character-container">
        <h1>Character</h1>

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