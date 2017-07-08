import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase';

import Message from '../components/Message';
import Icon from '../components/Icon';

import { ref } from '../../api';
import { signOut } from '../state/actions';
import { generateRandomName } from '../generateName';

const IDENTIFY = 'identify';
const SIGNUP = 'signup';
const PASSWORD = 'password';

export class Login extends Component {
  static displayName = 'Login';

  state = {
    messageType : "alert",
    disabled: false,
    isLoading: false,
    error: '',
    formType: IDENTIFY,
    email: '',
  }

  emailInput = null;
  pwdInput = null;

  componentDidMount() {
    if (!window.sessionStorage.getItem('__pocket_character_redirect_login__')) {
      this.props.dispatch(signOut());
    }
  }

  componentWillMount() {
    if (window.sessionStorage.getItem('__pocket_character_redirect_login__') === 'LOGIN') {
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
          // pull displayName and photo from provider data;
          if (!currentUser.displayName) {
            return currentUser.updateProfile({
              photoURL: currentUser.providerData[0].photoURL,
              displayName: currentUser.providerData[0].displayName
            })
          }
        })
        .then(() => {
          window.sessionStorage.setItem('__pocket_character_redirect_login__', false);
          this.props.dispatch({ type: 'USER_LOADING_PROFILE' });
          this.props.history.push('/app');
        })
        .catch(err => {
          this.setState({ error: err.message, isLoading: false })
        });
    }
    else {
      this.setState({ isLoading: false, error: '' })
    }
  }

  handleProviderSearch = () => {
    firebase
      .auth()
      .fetchProvidersForEmail(this.emailInput.value.trim())
      .then(results => {
        let provider = results[0];

        // if results is empty, then new user, show sign up form
        // if results is federated, login via redirect
        // if results is password, show password form
        switch (provider) {
          case 'google.com':
            this.googleLogin();
            break;
          case 'password':
            this.setState({ formType: PASSWORD, email: this.emailInput.value.trim() });
            break;
          default:
            this.setState({ formType: SIGNUP, email: this.emailInput.value.trim() });
        }
      })
      .catch(error => {
        this.setState({ error: error.message });
      })
  }

  handlePasswordLogin = () => {
    let password = this.passwordInput.value.trim();
    let email = this.state.email;


    this.props.dispatch({ type: 'USER_LOADING_PROFILE' });
    this.setState({ disabled: true });
    firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.props.history.push("/app");
      })
      .catch(error => {
        this.setState({ disabled: false, error: error.message });
      });
  }

  googleLogin = () => {
    if (this.state.isLoading || this.state.disabled) return;

    this.setState({ disabled: true })

    sessionStorage.setItem('__pocket_character_redirect_login__', 'LOGIN');
    let provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('email');

    firebase.auth()
      .signInWithRedirect(provider)
      .catch(err => {
        this.setState({ err: err.message })
      });
  }

  handleAccountCreate = () => {
    let email = this.state.email;
    let pwd = this.pwdInput.value.trim();
    let confirmPwd = this.confirmPwdInput.value.trim();

    if (pwd !== confirmPwd) {
      this.setState({ error: 'Passwords must match!' })
      return;
    }

    this.props.dispatch({ type: 'USER_LOADING_PROFILE' });
    firebase.auth()
      .createUserWithEmailAndPassword(email, pwd)
      .then(user => {
        ref
          .child(`users/${user.uid}`)
          .update({ createdOn: Date.now() })
          .then(() => {
            return user.updateProfile({
              displayName: generateRandomName(),
              photoURL: '',
            })
          })
          .then(() => {
            this.props.history.push('/app');
          })
          .catch(error => {
            this.setState({ error: error.message });
          })
      })
      .catch(error => {
        this.setState({ error: error.message });
      })
  }

  renderLandingForm = () => {
    return <div className='login-input-group'>
      <Message type={this.state.messageType} message={this.state.error} />
      <input
        className='login-input'
        type='email'
        placeholder='email address'
        ref={ref => this.emailInput = ref}
      />
      <button
        className='login-btn'
        onClick={this.handleProviderSearch}
        disabled={this.state.isLoading || this.state.disabled}
      >{this.state.isLoading ? 'Authenticating...' : 'Sign In'}</button>
    </div>
  }

  renderSignUpForm = () => {
    return <div className="login-input-group">
      <Message type={this.state.messageType} message={this.state.error} />
      <p className='login-email-disabled text-center'>{this.state.email}</p>
      <hr />
      <input
        className='login-input'
        type='password'
        placeholder='new password'
        ref={ref => this.pwdInput = ref}
      />
      <input
        className='login-input'
        type='password'
        placeholder='confirm password'
        ref={ref => this.confirmPwdInput = ref}
      />
      <button
        className='login-btn'
        onClick={this.handleAccountCreate}
        disabled={this.state.isLoading || this.state.disabled}
      >{this.state.isLoading || this.state.disabled ? 'Creating...' : 'Create Account'}</button>
      <hr />
      <div className='mt3'>
        <div
          className='login-google'
          disabled={this.state.isLoading || this.state.disabled}
          onClick={this.googleLogin}
        ></div>
      </div>
    </div>
  }

  renderPasswordForm = () => {
    return <div className='login-input-group'>
      <Message type={this.state.messageType} message={this.state.error} />
      <p className='login-email-disabled text-center'>{this.state.email}</p>
      <input
        className='login-input'
        type='password'
        placeholder='password'
        ref={ref => this.passwordInput = ref}
      />
      <button
        className='login-btn'
        onClick={this.handlePasswordLogin}
        disabled={this.state.isLoading || this.state.disabled}
      >{this.state.isLoading || this.state.disabled ? 'Authenticating...' : 'Sign In'}</button>
    </div>
  }

  renderForm = () => {
    switch (this.state.formType) {
      case IDENTIFY:
        return this.renderLandingForm();
      case SIGNUP:
        return this.renderSignUpForm();
      case PASSWORD:
        return this.renderPasswordForm();
    }
  }

  render() {
    return (
      <div className="login-page">
        <div className="login-content">
          <h1 className="login-title ml3"><Icon icon='fa fa-user-secret'/></h1>
          <p>Who are you?</p>
          { this.renderForm() }
          <p className="login-subtext"><small>&copy;2016 - ClockworkMonocle</small></p>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
