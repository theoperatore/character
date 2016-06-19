"use strict";

import React from 'react';

import Router from '../router/Router';
import { ROUTE_LOGIN, ROUTE_CHARACTER } from '../routes';

import { getCharactersForUser, signOut } from '../state/actions';
import Icon from '../components/Icon';
import Loading from '../components/Loading';
import ListItem from '../components/ListItem/v2';
import Confirm from './Confirm';

import connectUserRoute from '../connectUserRoute';
import connectAuthRedirect from '../connectAuthRedirect';

let Profile = React.createClass({
  displayName: "Profile",

  getInitialState() {
    return {
      confirmDelete: false,
    }
  },

  componentDidMount() {
    let user = this.props.state.user;
    let status = this.props.state.status;

    if (user.get('uid')) {
      this.props.dispatch(getCharactersForUser(user.get('uid')));
    }
  },

  componentWillReceiveProps(nextProps) {
    let user = nextProps.state.user;
    let status = nextProps.state.status;
    if (user.get('uid') && !user.get('characters') && !status.get('characterListLoading')) {
      this.props.dispatch(getCharactersForUser(user.get('uid')));
    }
  },

  loadCharacter(id) {
    Router.nav(ROUTE_CHARACTER, id);
  },

  deleteCharacter(id) {
    this.setState({
      confirmDelete: true,
      characterToDelete: this.props.state.user.getIn(['characters', id, 'characterName'])
    });
  },

  handleConfirm(answer) {
    switch(answer) {
      case 'yes':
      case 'no':
        this.setState({
          confirmDelete: false,
          characterToDelete: '',
        });
        break;
    }
  },

  signOut() {
    this.props.dispatch(signOut());
  },

  renderCharacters() {
    if (!this.props.state.user.get('characters')) return null;

    return this.props.state.user.get('characters').valueSeq().map((character, i) => {
      return (
        <ListItem
          key={i}
          className='interactable'
          name={character.get('characterName')}
          subtext={`level ${character.get('characterLevel')} | ${character.get('characterClass')}`}
          glyph={
            <div className='text-gray bg-gray flex flex-center' style={{ width: 50, height: 50}}>
              <Icon icon='fa fa-user'/>
            </div>
          }
          addon={
            <div className='p3 interactable' onClick={this.deleteCharacter.bind(this, character.get('characterId'))}>
              <Icon className='text-red' icon='fa fa-user-times'/>
            </div>
          }
          onClick={this.loadCharacter.bind(this, character.get('characterId'))}
        />
      );
    });
  },

  render() {
    let isLoadingProfile = this.props.state.status.get('userLoadingProfile');
    let isLoadingCharacters = this.props.state.status.get('characterListLoading');
    let listLoadError = this.props.state.status.getIn(['characterListLoadError', 'code']);
    let user = this.props.state.user;

    return (
      <div className="profile-container">
        <div className="profile-header">
          <img className='profile-img left' src={user.get('profileImg')}/>
          <h5 className="profile-header-name left p2">{user.get('displayName')}</h5>
          <h5 className='profile-header-action interactable right' onClick={this.signOut}>Sign Out</h5>
        </div>
        <div className="profile-content">
          <h3>Characters</h3>
          { isLoadingProfile || isLoadingCharacters
              ? <p>Loading...</p>
              : this.renderCharacters()
          }
          { listLoadError 
              && <p className='text-red'>{listLoadError}</p> 
          }
        </div>
        <Loading isLoading={isLoadingCharacters || isLoadingProfile}/>
        <Confirm
          active={this.state.confirmDelete}
          confirmName={this.state.characterToDelete}
          message={
            <div>
              <p className='text-red mt2 text-center'>Delete your character: <span className='text-blue important'><em>{this.state.characterToDelete}</em></span> ?</p>
              <p className='important mt2 text-center'>Note: This is a permanent action! It cannot be undone!</p>
            </div>
          }
          onConfirm={this.handleConfirm}
        />
      </div>
    );
  }
})

export default connectUserRoute(
  connectAuthRedirect(
    Profile,
    () => {
      Router.nav(ROUTE_LOGIN);
    }
  )
)
