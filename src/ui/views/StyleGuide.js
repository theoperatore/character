"use strict";

var React = require('react/addons');
var Immutable = require('immutable');
var Panel = require('../components/common/Panel');
var Shell = require('../components/common/Shell');
var SwipePanes = require('../components/common/SwipePanes');
var SwipePane = require('../components/common/SwipePane');
var SettingsWell = require('../components/common/SettingsWell');
var Tabs = require('../components/common/Tabs');
var Tab = require('../components/common/Tab');
var Icon = require('../components/common/Icon');
var MoneyChart = require('../components/common/MoneyChart');


var mockSkills = require('../mock/character-skills');
var mockEquipment = require('../mock/character-equipment');

module.exports = React.createClass({
  displayName : "StyleGuide",
  getInitialState : function() {
    return ({
      skillsData : mockSkills,
      skillsSort : true,
      equipData : Immutable.fromJS(mockEquipment),
      settingsWellOpen : false
    })
  },

  toggleSettingsWell : function() {
    this.setState({ settingsWellOpen : !this.state.settingsWellOpen });
  },

  toggleSkillsSort : function() {
    this.setState({ skillsSort : !this.state.skillsSort });
  },

  randomizeGold : function() {
    var data = this.state.equipData;

    data = data.updateIn(['money', 'cp'], () => Math.round(Math.random() * 50));
    data = data.updateIn(['money', 'sp'], () => Math.round(Math.random() * 50));
    data = data.updateIn(['money', 'gp'], () => Math.round(Math.random() * 50));
    data = data.updateIn(['money', 'ep'], () => Math.round(Math.random() * 50));
    data = data.updateIn(['money', 'pp'], () => Math.round(Math.random() * 50));

    this.setState({ equipData : data });
  },

  augmentSkills : function() {
    var out = [];

    mockSkills.forEach((skill) => {
      var tmp = {};

      tmp.name = skill.name;
      tmp.score = Math.ceil((Math.random() * 8));
      tmp.trained = skill.trained;
      tmp.mod = skill.mod;

      out.push(tmp)
    })

    this.setState({skillsData : out});
  },

  render : function() {
    return (
      <div className="container">
        <section>
          <h1>Headings 1</h1>
          <h2>Headings 2</h2>
          <h3>Headings 3</h3>
          <h4>Headings 4</h4>
          <h5>Headings 5</h5>
          <h6>Headings 6</h6>
        </section>
        <hr />
        <section>
          <p><strong>Colors</strong></p>
          <span className="square bg-blue"></span>
          <span className="square bg-gold"></span>
          <span className="square bg-red"></span>
          <span className="square bg-green"></span>
          <p className="text-blue">Text Colors</p>
          <p className="text-gold">Text Colors</p>
          <p className="text-red">Text Colors</p>
          <p className="text-green">Text Colors</p>
        </section>
        <hr />
        <section>
          <p><strong>Collapsing Panels</strong></p>
          <Panel title={"Click Me 1"}>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget augue sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In erat lacus, porta eu blandit scelerisque, vestibulum id purus. Nam vel rhoncus purus. Nunc molestie ligula neque, a finibus ante semper at. In hac habitasse platea dictumst. Aliquam erat lacus, rutrum eget ex at, hendrerit pretium massa. Praesent commodo vestibulum dictum. Mauris congue sagittis neque, nec malesuada urna gravida ac.</p>
          </Panel>
          <Panel title={"Click Me 2"}>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget augue sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In erat lacus, porta eu blandit scelerisque, vestibulum id purus. Nam vel rhoncus purus. Nunc molestie ligula neque, a finibus ante semper at. In hac habitasse platea dictumst. Aliquam erat lacus, rutrum eget ex at, hendrerit pretium massa. Praesent commodo vestibulum dictum. Mauris congue sagittis neque, nec malesuada urna gravida ac.</p>
          </Panel>
          <Panel title={"Click Me 3"}>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget augue sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In erat lacus, porta eu blandit scelerisque, vestibulum id purus. Nam vel rhoncus purus. Nunc molestie ligula neque, a finibus ante semper at. In hac habitasse platea dictumst. Aliquam erat lacus, rutrum eget ex at, hendrerit pretium massa. Praesent commodo vestibulum dictum. Mauris congue sagittis neque, nec malesuada urna gravida ac.</p>
          </Panel>
        </section>
        <hr />
        <section>
          <p><strong>Settings Wells</strong></p>
          <button onClick={this.toggleSettingsWell}>Toggle</button>
          <SettingsWell open={this.state.settingsWellOpen}>
            <div className="container-fluid">
              <h2>Change things</h2>
              <p>This is where you'll do it</p>
              <input type="text" className="input form-input" placeholder="Some Box..." />
            </div>
          </SettingsWell>
        </section>
        <hr />
        <section>
          <p><strong>Swipe Panes</strong></p>
          <SwipePanes activeIdx={0} onSlideChangeEnd={(s) => console.log("end", s)}>
            <SwipePane title={"Title 1"}>
              <p>Swipe Me 1</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget augue sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In erat lacus, porta eu blandit scelerisque, vestibulum id purus. Nam vel rhoncus purus. Nunc molestie ligula neque, a finibus ante semper at. In hac habitasse platea dictumst. Aliquam erat lacus, rutrum eget ex at, hendrerit pretium massa. Praesent commodo vestibulum dictum. Mauris congue sagittis neque, nec malesuada urna gravida ac.</p>
            </SwipePane>
            <SwipePane title={"Title 2"}>
              <p>Swipe Me 2</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget augue sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In erat lacus, porta eu blandit scelerisque, vestibulum id purus. Nam vel rhoncus purus. Nunc molestie ligula neque, a finibus ante semper at. In hac habitasse platea dictumst. Aliquam erat lacus, rutrum eget ex at, hendrerit pretium massa. Praesent commodo vestibulum dictum. Mauris congue sagittis neque, nec malesuada urna gravida ac.</p>
            </SwipePane>
            <SwipePane title={"Title 3"}>
              <p>Swipe Me 3</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget augue sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In erat lacus, porta eu blandit scelerisque, vestibulum id purus. Nam vel rhoncus purus. Nunc molestie ligula neque, a finibus ante semper at. In hac habitasse platea dictumst. Aliquam erat lacus, rutrum eget ex at, hendrerit pretium massa. Praesent commodo vestibulum dictum. Mauris congue sagittis neque, nec malesuada urna gravida ac.</p>
            </SwipePane>
          </SwipePanes>
        </section>
        <hr />
        <section>
          <p><strong>Justifed Tabs and Icons</strong></p>
          <Tabs activeIdx={2}>
            <Tab><Icon icon="icon-crown" /></Tab>
            <Tab><Icon icon="icon-features" /></Tab>
            <Tab><Icon icon="icon-chart" /></Tab>
            <Tab><Icon icon="icon-shield" /></Tab>
            <Tab><Icon icon="icon-attack" /></Tab>
            <Tab><Icon icon="icon-repo" /></Tab>
            <Tab><Icon icon="icon-equipment"/></Tab>
          </Tabs>
        </section>
        <hr />
        <section>
          <p><strong>SVG Shell</strong></p>
          <button onClick={this.augmentSkills}>randomize</button>
          <button onClick={this.toggleSkillsSort}>toggle sort</button>
          <Shell data={this.state.skillsData} sort={this.state.skillsSort} />
        </section>
        <hr />
        <section>
          <p><strong>Currency</strong></p>
          <button onClick={this.randomizeGold}>randomize</button>
          <MoneyChart data={this.state.equipData.get('money')} />
        </section>
        <hr />
        <section>
          <p><strong>HP Bar</strong></p>
        </section>
        <hr />
        <section>
          <p><strong>Shield</strong></p>
        </section>
        <hr />
      </div>
    );
  }
})