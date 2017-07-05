import React, { Component } from 'react';
import Router from '../router/Router';
import { ROUTE_PROFILE } from '../routes';
import firebase from 'firebase';
import { ref } from '../../api';

export function connectSessionToLogin(Login, session) {
  return class ConnectedLoginSession extends Component {
    static displayName = 'ConnectedLoginSession';

    state = {
      isLoading: false,
      error: '',
    }

    componentWillMount() {
      if (session.getItem('__pocket_character_redirect_login__') === 'LOGIN') {
        this.setState({ isLoading: true });
        firebase.auth()
          .getRedirectResult()
          .then(result => result.user)
          .then(user => {
            return ref
              .child(`users/${user.uid}`)
              .once('value')
              .then(snapshot => snapshot.val())
              .then(userData => {
                if (!userData) {
                  return ref
                    .child(`users/${user.uid}`)
                    .update({ createdOn: Date.now() });
                }
              })
          })
          .then(() => {
            let currentUser = firebase.auth().currentUser;

            // only update if displayName doesn't exist yet
            if (!currentUser.displayName) {
              return currentUser.updateProfile({
                photoURL: currentUser.providerData[0].photoURL,
                displayName: currentUser.providerData[0].displayName
              })
            }
          })
          .then(() => {
            session.setItem('__pocket_character_redirect_login__', false);
            Router.nav(ROUTE_PROFILE);
          })
          .catch(err => {
            this.setState({ error: err.message, isLoading: false })
          })
      }
      else {
        this.setState({ isLoading: false, error: '' })
      }
    }

    render() {
      return <Login
        {...this.props}
        isLoading={this.state.isLoading}
        error={this.state.error}
      />
    }
  }
}
