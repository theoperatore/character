'use strict';

var React = require('react');
var Link = require('../router/Link');

import { db, ref } from '../../api';
import uuid from 'node-uuid';
import { characters } from '../../dummy-data/dummy-characters';
import defaultCharacter from '../data/defaultCharacter';

module.exports = React.createClass({
  displayName: 'Landing',

  getInitialState() {
    return ({
      profileId : null,
      unauthed: true,
      authenticating: false,
      err: '',
      msg: '',
    })
  },

  componentWillMount() {
    db.auth().signOut();
  },

  testLogin() {
    this.setState({ authenticating: true })
    db
      .auth()
      .signInWithEmailAndPassword('theoperatore@gmail.com', 'ralfralf')
      .then(user => {
        this.setState({ unauthed: false, profileId: user.uid });
      })
      .catch(err => {
        this.setState({ err: err.message });
      });
  },

  uploadRalf() {
    let auth = db.auth().currentUser;
    let ralfId = characters.ralf.character_data.charId;
    let ralfName = characters.ralf.character_data.charName;
    let ralfInfo = characters.ralf.character_data.charInfo;
    let ralfClass = ralfInfo.class;
    let ralfLevel = ralfInfo.level;

    ref.child(`users/${auth.uid}/characters/${ralfId}`).set({
      characterId: ralfId,
      characterName: ralfName,
      characterClass: ralfClass,
      characterLevel: ralfLevel,
    }).then(() => {
      return ref.child(`characters/${ralfId}`).set(characters.ralf.character_data);
    }).then(() => {
      this.setState({ msg: 'OK!' });
    }).catch(err => {
      this.setState({ err: err.message });
    })
  },

  uploadBlank() {
    let auth = db.auth().currentUser;
    let characterId = uuid.v1();
    let characterName = this.nameInput.value.trim() || 'Blank Character';
    let characterClass = defaultCharacter.charInfo.class;
    let characterLevel = defaultCharacter.charInfo.level;
    let createdOn = Date.now();
    let characterData = Object.assign({}, defaultCharacter, {
      charName: characterName,
    });

    ref.child(`users/${auth.uid}/characters/${characterId}`).set({
      characterId,
      characterName,
      characterClass,
      characterLevel,
      createdOn,
    }).then(() => {
      return ref.child(`characters/${characterId}`).set(characterData);
    }).then(() => {
      this.setState({ msg: 'CHARACTER_OK!' });
    }).catch(err => {
      this.setState({ err: err.message });
    });
  },

  render() {
    var style = {
      "maxWidth" : 225,
      "padding" : 5
    }

    return (
      <div style={style}>
        <h1>Character</h1>
        {
          this.state.err !== ''
            ? <p style={{ color: 'red' }}>{this.state.err}</p>
            : null
        }
        {
          this.state.msg !== ''
            ? <p style={{ color: 'green' }}>{this.state.msg}</p>
            : null
        }
        { 
          this.state.unauthed
            ? <button
                disabled={this.state.authenticating}
                onClick={this.testLogin}>{this.state.authenticating ? 'logging you in...' : 'Test Authenticate'}</button>
            : <p><Link href={"/profile/" + this.state.profileId}>Go To Profile</Link></p>
        }
        <hr />
        {
          this.state.unauthed
            ? <p>log in to upload ralf character</p>
            : <button
                onClick={this.uploadRalf}
              >Re-Upload Ralf</button>
        }
        <hr />
        {
          this.state.unauthed
            ? null
            : <div>
                <input
                  type='text'
                  ref={ref => this.nameInput = ref}
                  placeholder='new character name'
                />
                <button
                  onClick={this.uploadBlank}
                >Upload new character</button>
              </div>
        }
      </div>
    )
  }

  // <p><Link href="/style">Style Guide</Link></p>
})
