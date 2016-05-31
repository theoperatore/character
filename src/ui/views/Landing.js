'use strict';

var React = require('react');
var Link = require('../router/Link');
var db = require('../../api');

import { characters } from '../../dummy-data/dummy-characters';

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
    // let auth = db.ref.getAuth();

    // if (auth) {
    //   this.setState({ unauthed: false, profileId: auth.uid });
    // }
    db.ref.unauth();
  },

  testLogin() {
    this.setState({ authenticating: true })
    db
      .auth('theoperatore@gmail.com', 'ralfralf')
      .then(() => {
        let auth = db.ref.getAuth();

        if (auth) {
          this.setState({ unauthed: false, profileId: auth.uid });
        }
        else {
          this.setState({ err: 'auth is still null' });
        }
      })
      .catch(err => {
        this.setState({ err: err.message });
      });
  },

  uploadRalf() {
    let auth = db.ref.getAuth();
    let ralfId = characters.ralf.character_data.charId;
    let ralfName = characters.ralf.character_data.charName;
    let ralfInfo = characters.ralf.character_data.charInfo;
    let ralfClass = ralfInfo.class;
    let ralfLevel = ralfInfo.level;

    db.ref.child(`users/${auth.uid}/characters/${ralfId}`).set({
      characterId: ralfId,
      characterName: ralfName,
      characterClass: ralfClass,
      characterLevel: ralfLevel,
    }).then(() => {
      return db.ref.child(`characters/${ralfId}`).set(characters.ralf.character_data);
    }).then(() => {
      this.setState({ msg: 'OK!' });
    }).catch(err => {
      this.setState({ err: err.message });
    })
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
      </div>
    )
  }

  // <p><Link href="/style">Style Guide</Link></p>
})
