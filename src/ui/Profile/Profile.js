"use strict";

import React from 'react';

import Router from '../router/Router';
import { ROUTE_LOGIN, ROUTE_CHARACTER } from '../routes';

import { getCharactersForUser, signOut, createCharacter, deleteCharacter } from '../state/actions';
import Icon from '../components/Icon';
import Loading from '../components/Loading';
import Drawer from '../components/Drawer';
import ListItem from '../components/ListItem/v2';
import Confirm from './Confirm';
import SimpleCreate from './SimpleCharacterCreateModal';

import connectUserRoute from '../connectUserRoute';
import connectAuthRedirect from '../connectAuthRedirect';

let Profile = React.createClass({
  displayName: "Profile",

  getInitialState() {
    return {
      menuOpen: false,
      confirmDelete: false,
      deleteId: null,
      createNewCharacter: false,
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
      deleteId: id,
      characterToDelete: this.props.state.user.getIn(['characters', id, 'characterName'])
    });
  },

  handleConfirm(answer) {
    switch(answer) {
      case 'yes':
        let charId = this.state.deleteId;
        let userId = this.props.state.user.get('uid');
        this.props.dispatch(deleteCharacter(userId, charId))
        this.setState({
          confirmDelete: false,
          characterToDelete: '',
          charId: null,
        });
        break;
      case 'no':
        this.setState({
          confirmDelete: false,
          characterToDelete: '',
          charId: null,
        });
        break;
    }
  },

  handleSimpleCreate(action) {
    let userId = this.props.state.user.get('uid');
    this.props.dispatch(createCharacter(userId, action.data.name));
  },

  signOut() {
    this.props.dispatch(signOut());
  },

  menuContent() {
    return <section>
      <div className='drawer-header'><p>Account</p></div>
      <div className='drawer-content p3'>
        <button
          onClick={this.signOut}
          className='btn btn-default btn-danger block mb2 mt6 full-width'
        ><Icon icon='fa fa-sign-out'/> Sign Out</button>
      </div>
    </section>
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

  getDisplayImg() {
    if (!this.props.state.user.get('displayName')) return null;

    let user = this.props.state.user;

    return user.get('profileImg')
    ? <img className='profile-img left' src={user.get('profileImg')}/>
    : <div className='text-gray bg-gray flex flex-center left' style={{ width: 50, height: 50}}>
        <span>{user.get('displayName').charAt(0).toUpperCase()}</span>
      </div>
  },

  render() {
    let isLoadingProfile = this.props.state.status.get('userLoadingProfile');
    let isLoadingCharacters = this.props.state.status.get('characterListLoading');
    let isCreating = this.props.state.status.get('characterCreating');
    let listLoadError = this.props.state.status.getIn(['characterListLoadError', 'code']);
    let user = this.props.state.user;

    return (
      <div className="profile-container">
        <div className="profile-header">
          { this.getDisplayImg() }
          <h5 className="profile-header-name left p2">{user.get('displayName')}</h5>
          <Icon
            icon='fa fa-ellipsis-v'
            className='p2 interactable right profile-header-action'
            onClick={() => this.setState({ menuOpen: true })}
          />
        </div>
        <Drawer
          id='account-menu'
          direction='right'
          overflowAppContainer='body'
          overflowPaneContainer='body'
          active={this.state.menuOpen}
          content={this.menuContent()}
          onDismiss={() => this.setState({ menuOpen: false })}
        />
        <div className="profile-content">
          <h3>Characters</h3>
          { isLoadingProfile || isLoadingCharacters
              ? <p>Loading...</p>
              : this.renderCharacters()
          }
          {
            !isLoadingProfile && !isLoadingCharacters &&
            <p
              className='subtext text-center p2 interactable'
              onClick={() => this.setState({ createNewCharacter: true })}
            ><Icon icon='fa fa-plus' /> Create a new character</p>
          }
          { listLoadError &&
              <p className='text-red'>{listLoadError}</p> 
          }
        </div>
        <Loading isLoading={isLoadingCharacters || isLoadingProfile || isCreating}/>
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
        <SimpleCreate
          active={this.state.createNewCharacter}
          onDismiss={() => this.setState({ createNewCharacter: false })}
          onCreate={this.handleSimpleCreate}
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
