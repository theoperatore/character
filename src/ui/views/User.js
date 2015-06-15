"use strict";

var React = require('react/addons');
var db = require('../../api');
var Router = require('../router/Router');
var Icon = require('../components/Icon');
var Menu = require('../components/Menu');

module.exports = React.createClass({
  displayName : "User",


  getInitialState : function() {
    return ({
      characters : []
    })
  },


  logout : function() {
    db.ref.unauth();
  },


  componentWillMount : function() {
    db.once('/users/' + db.ref.getAuth().uid).then((snap) => {
      var val = snap.val();
      var out = [];

      if (val.characters) {
        Object.keys(val.characters).forEach((idx) => {
          var curr = val.characters[idx];
          var obj = {};

          obj.characterName = curr['character_name'];
          obj.characterLevel = curr['character_lvl'];
          obj.characterClass = curr['character_class'];
          obj.createdDate = curr['created_date'];
          obj.deathDate = curr['death_date'];

          out.push(obj);
        })

        this.setState({ characters : out });
      }
    })
  },


  render : function() {
    var list = this.state.characters.map((character, i) => {
      return (
        <li key={i}>
          <button className="profile-character-button">
            <div className="profile-character-container">
              <ul className="profile-character-details left">
                <li><h3>{character.characterName}</h3></li>
                <li>{character.characterClass} | {character.characterLevel}</li>
              </ul>
              <div className="profile-character-details right">
                <p><Icon icon="icon-angle-double-right" /></p>
              </div>
            </div>
          </button>
        </li>
      )
    });


    return (
      <div className="profile-container">
        <div className="profile-header">
          <p className="profile-header-name left">{this.props.id}</p>
          <div className="right">
            <Menu anchor={<Icon icon="icon-cog" />}>
              <p>new character</p>
              <p>logout</p>
            </Menu>
          </div>
          
        </div>
        <div className="profile-content">
          <ul className="profile-list-characters">
            {list}
          </ul>
        </div>
      </div>
    );
  }
})