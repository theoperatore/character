import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debug from 'debug';

import { ref } from '../../api';
import { loadCharacter } from '../state/actions';

const log = debug('pc:character');

function saveCharacterData(charId, characterToSave) {
  return new Promise((resolve, reject) => {
    ref
      .child(`characters/${charId}`)
      .update(characterToSave)
      .then(() => resolve())
      .catch(error => reject(error));
  })
}

function savePreferenceData(charId, preferencesToSave) {
  return new Promise((resolve, reject) => {
    ref
      .child(`preferences/${charId}`)
      .update(preferencesToSave)
      .then(() => resolve())
      .catch(err => reject(err));
  })
}

function saveCharacterMetaData(userId, charId, characterToSave) {
  return new Promise((resolve, reject) => {
    ref
      .child(`users/${userId}/characters/${charId}`)
      .update({
        characterClass: characterToSave.charInfo.class,
        characterLevel: characterToSave.charInfo.level,
      })
      .then(() => resolve())
      .catch(err => reject(err));
  })
}

function saveCharacter(userId, charId, characterToSave, preferencesToSave) {
  return new Promise((resolve, reject) => {
    Promise.all([
      saveCharacterData(charId, characterToSave),
      savePreferenceData(charId, preferencesToSave),
      saveCharacterMetaData(userId, charId, characterToSave)
    ])
    .then(() => resolve())
    .catch(error => reject(error))
  })
}

export function characterProvider(Component) {
  return class extends React.Component {
    static propTypes = {
      dispatch: PropTypes.func.isRequired,
      state: PropTypes.object.isRequired,
      characterId: PropTypes.string.isRequired,
    };

    state = {
      isSaving: false,
      saveError: null,
      lastSavedDate: Date.now(),
    };

    componentDidMount() {
      let characterId = this.props.characterId;
      this.props.dispatch(loadCharacter(characterId));
    }

    dispatchMiddleware = (action) => {
      log(action);

      let isLoading = this.props.state.status.get('characterLoading');
      let isInError = !!this.props.state.status.get('characterLoadError');

      if (isLoading || isInError) return;

      let cleanedAction = JSON.stringify(action);
      let characterId = this.props.characterId;

      ref.child(`actions/${characterId}`).push(cleanedAction);
      this.props.dispatch(action);
    };

    componentWillReceiveProps(nextProps) {
      let characterIsLoaded = nextProps.state.status.get('characterIsLoaded');
      let characterIsSaving = nextProps.state.status.get('characterSaving');

      if (!characterIsLoaded || characterIsSaving) return;

      let characterId = nextProps.characterId;
      let userId = nextProps.state.user.get('uid');
      let characterToSave = nextProps.state.character.toJS();
      let preferencesToSave = nextProps.state.preferences.toJS();

      // made into a side-effect because otherwise it would almost be impossible to
      // not have infinite state updates.
      log('saving new character and preferences state...', characterToSave);
      this.setState({ isSaving: true });
      saveCharacter(userId, characterId, characterToSave, preferencesToSave)
        .then(() => this.setState({ isSaving: false, saveError: null, lastSavedDate: Date.now() }))
        .catch(error => this.setState({ isSaving: false, saveError: error }));

    }

    render() {
      let isCharacterLoading = this.props.state.status.get('characterLoading');
      let isUserProfileLoading = this.props.state.status.get('userLoadingProfile');

      return <Component
        state={this.props.state}
        dispatch={this.dispatchMiddleware}
        isSaving={this.state.isSaving}
        saveError={this.state.saveError}
        lastSavedDate={this.state.lastSavedDate}
        isLoading={isUserProfileLoading || isCharacterLoading}
      />
    }
  };
}
