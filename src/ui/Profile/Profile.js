"use strict";

import React from 'react';
import { db, ref } from '../../api';
import Router from '../router/Router';
import Icon from '../components/Icon';
import Loading from '../components/Loading';
import ListItem from '../components/ListItem/v2';
import Confirm from './Confirm';

export default React.createClass({
  displayName: "Profile",

  getInitialState() {
    return ({
      characters : [],
      profileName: '...',
      isLoading: true,
      isCharacterLoading: false,
      confirmDelete: false,
      idToDelete: null,
    })
  },

  logout() {
    this.setState({ isCharacterLoading: true }, () => {
      db.auth().signOut().then(() => {
        // Router.nav('#/login'); TEMP ROUTE TO LANDING PAGE
        Router.nav('/');
      })
    });
  },

  handleGetCharacter(snapshot) {
    let val = snapshot.val() || {};
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

    let usr = db.auth().currentUser;
    this.setState({
      characters : out,
      profileName: usr.providerData[0].displayName || val.profileName || 'Anonymous',
      profileImg: usr.providerData[0].photoURL,
      isLoading: false
    });
  },

  componentWillMount() {
    let off = db.auth().onAuthStateChanged(user => {
      off(); // turn off authentication listening
      if (user) {
        return ref
          .child('/users/' + user.uid)
          .once('value')
          .then(this.handleGetCharacter)
          .catch(err => console.error(err))
      }
      else {
        Router.nav('#/login');
      }
    });
  },

  handleDelete(idx) {
    let character = this.state.characters[idx];
    this.setState({ confirmDelete: true, idToDelete: character.characterUID });
  },

  handleConfirm(answer) {
    switch (answer) {
      case 'no':
        this.setState({ confirmDelete: false, idToDelete: null });
        break;
      case 'yes':
        break;
    }
  },

  loadCharacter(idx) {
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
          addon={
            <div className='p3 interactable' onClick={this.handleDelete.bind(this, i)}>
              <Icon className='text-red' icon='fa fa-user-times'/>
            </div>
          }
          onClick={this.loadCharacter.bind(this, i)}
        />
      );
    });


    return (
      <div className="profile-container">
        <div className="profile-header">
          <img className='profile-img left' src={this.state.profileImg}/>
          <h5 className="profile-header-name left p2">{this.state.profileName}</h5>
          <h5 className='profile-header-action interactable right' onClick={this.logout}>Sign Out</h5>
        </div>
        <div className="profile-content">
          <h3>Characters</h3>
          { this.state.isLoading 
              ? <p>Loading...</p>
              : list.length === 0
              ? <p className='subtext text-center'>It's sad and lonely without any characters... :(</p>
              : list
          }
        </div>
        <Loading isLoading={this.state.isLoading}/>
        <Loading isLoading={this.state.isCharacterLoading}/>
        <Confirm
          active={this.state.confirmDelete}
          onConfirm={this.handleConfirm}
        />
      </div>
    );
  }
})
