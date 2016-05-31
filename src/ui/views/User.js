"use strict";

import React from 'react';
import db from '../../api';
import Router from '../router/Router';
import Icon from '../components/Icon';
import Loading from '../components/Loading';


import dummy from '../../dummy-data/dummy-profile';


export default React.createClass({
  displayName : "User",


  getInitialState : function() {
    return ({
      characters : [],
      profileName: '',
    })
  },


  logout : function() {
    db.ref.unauth();
    Router.nav('/login');
  },


  componentWillMount : function() {
    if (db.ref.getAuth()) {
      db.ref.child('/users/' + db.ref.getAuth().uid).once('value').then((snap) => {
        var val = snap.val();
        var out = [];

        if (val.characters) {
          Object.keys(val.characters).forEach((idx) => {
            var curr = val.characters[idx];
            var obj = {};

            obj.characterName = curr['characterName'];
            obj.characterLevel = curr['characterLevel'];
            obj.characterClass = curr['characterClass'];
            obj.createdDate = curr['createdDate'];
            obj.deathDate = curr['deathDate'];
            obj.characterUID = curr['characterId'];

            out.push(obj);
          })
        }

        this.setState({ characters : out, profileName: val.profileName });
      })
    }
    else {
      this.setState({ characters: dummy, profileName: 'Test Profile' });
    }
  },


  loadCharacter : function(idx) {
    var character = this.state.characters[idx];
    var href = '/user/';
    var params = {};

    href += (this.props.id || 'nologin') + "/character/";
    href += character.characterUID;

    Router.nav(href);
    this.setState({ isLoading: true });
  },


  render : function() {
    var list = this.state.characters.map((character, i) => {
      return (
        <li key={i}>
          <button className="profile-character-button" onClick={this.loadCharacter.bind(this, i)}>
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
          <p className="profile-header-name left">{this.state.profileName}</p>
        </div>
        <div className="profile-content">
          <ul className="profile-list-characters">
            {list}
          </ul>
        </div>
        <Loading isLoading={this.state.isLoading}/>
      </div>
    );
  }
})
