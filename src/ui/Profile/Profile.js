"use strict";

import React from 'react';
import { db, ref } from '../../api';
import Router from '../router/Router';
import Icon from '../components/Icon';
import Loading from '../components/Loading';
import ListItem from '../components/ListItem/v2';

export default React.createClass({
  displayName: "Profile",

  getInitialState() {
    return ({
      characters : [],
      profileName: '...',
      isLoading: true,
      isCharacterLoading: false,
    })
  },

  logout() {
    this.setState({ isCharacterLoading: true }, () => {
      db.auth().signOut().then(() => {
        Router.nav('#/login');
      })
    });
  },

  handleGetCharacter(snapshot) {
    let val = snapshot.val();
    let out = [];

    if (val.characters) {
      Object.keys(val.characters).forEach((idx) => {
        let curr = val.characters[idx];
        let obj = {};

        obj.characterName = curr['characterName'];
        obj.characterLevel = curr['characterLevel'];
        obj.characterClass = curr['characterClass'];
        obj.createdDate = curr['createdOn'];
        obj.deathDate = curr['diedOn'];
        obj.characterUID = curr['characterId'];

        out.push(obj);
      })
    }

    this.setState({ characters : out, profileName: val.profileName, isLoading: false });
  },

  componentWillMount() {
    let user = db.auth().currentUser;

    if (user) {
      ref
        .child('/users/' + user.uid)
        .once('value')
        .then(this.handleGetCharacter);
    }
    else {
      let off = db.auth().onAuthStateChanged(user => {
        off(); // turn off authentication listening
        if (user) {
          ref
            .child('/users/' + user.uid)
            .once('value')
            .then(this.handleGetCharacter)
        }
        if (!user) {
          Router.nav('#/login');
        }
      });
    }
  },

  loadCharacter : function(idx) {
    var character = this.state.characters[idx];
    var href = `#/character/${character.characterUID}`;

    Router.nav(href);
    this.setState({ isCharacterLoading: true });
  },

  render() {
    var list = this.state.characters.map((character, i) => {
      return (
        <ListItem
          key={i}
          className='interactable'
          name={character.characterName}
          subtext={`level ${character.characterLevel} | ${character.characterClass}`}
          glyph={<div className='text-gray bg-gray flex flex-center' style={{ width: 50, height: 50}}>
              <Icon icon='fa fa-user'/>
            </div>}
          addon={<Icon className='text-red' icon='fa fa-user-times'/>}
          onClick={this.loadCharacter.bind(this, i)}
        />
      );
    });


    return (
      <div className="profile-container">
        <div className="profile-header">
          <h5 className="profile-header-name left p2">{this.state.profileName}</h5>
          <h5 className='profile-header-action interactable right p2' onClick={this.logout}>Sign Out</h5>
        </div>
        <div className="profile-content">
          <h3>Characters</h3>
          { this.state.isLoading 
              ? <p>Loading...</p>
              : list.length === 0
              ? <p className='subtext text-center'>Create a new character</p>
              : list
          }
        </div>
        <Loading isLoading={this.state.isLoading}/>
        <Loading isLoading={this.state.isCharacterLoading}/>
      </div>
    );
  }
})
