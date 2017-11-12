import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebaseui from 'firebaseui';
import firebase from 'firebase';
import Type from 'components/Type';
import Icon from 'components/Icon';

import 'firebaseui/dist/firebaseui.css';
import './index.css';

class Login extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  };

  componentDidMount() {
    const config = {
      signInOptions: [
        {
          provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          scopes: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email',
          ],
        },
        // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        // firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        // firebase.auth.PhoneAuthProvider.PROVIDER_ID,
      ],
      callbacks: {
        signInSuccess: /* istanbul ignore next */ () =>
          this.props.history.push('/app'),
      },
    };

    let fbui = firebaseui.auth.AuthUI.getInstance();
    /* istanbul ignore next */
    if (fbui) {
      /* istanbul ignore next */
      fbui.reset();
    } else {
      fbui = new firebaseui.auth.AuthUI(firebase.auth());
    }

    fbui.start('#login', config);
  }

  render() {
    return [
      <div key="login__title" className="login__title">
        <Icon name="user-secret" size={64} />
        <Type variant="display-1">Who are you?</Type>
      </div>,
      <div key="login__form" id="login" />,
    ];
  }
}

export default Login;
