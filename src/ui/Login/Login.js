import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Router from '../router/Router';
import { ROUTE_PROFILE } from '../routes';
import Message from '../components/Message';
import Icon from '../components/Icon';
import firebase from 'firebase';
import { ref } from '../../api';
import { signOut, signInWithEmail } from '../state/actions';
import { connectSessionToLogin } from './connectSessionToLogin';
import { generateRandomName } from '../generateName';

const IDENTIFY = 'identify';
const SIGNUP = 'signup';
const PASSWORD = 'password';

export class Login extends Component {
  static displayName = 'Login';

  state = {
    messageType : "alert",
    disabled: false,
    error: '',
    formType: IDENTIFY,
    email: '',
  }

  emailInput = null;
  pwdInput = null;

  componentDidMount() {
    if (!sessionStorage.getItem('__pocket_character_redirect_login__')) {
      this.props.dispatch(signOut());
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

    this.setState({ disabled: true });
    firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        Router.nav(ROUTE_PROFILE);
      })
      .catch(error => {
        this.setState({ disabled: false, error: error.message });
      })
  }

  googleLogin = () => {
    if (this.props.isLoading || this.state.disabled) return;

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
            Router.nav(ROUTE_PROFILE);
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
      <Message type={this.state.messageType} message={this.state.error || this.props.error} />
      <input
        className='login-input'
        type='email'
        placeholder='email address'
        ref={ref => this.emailInput = ref}
      />
      <button
        className='login-btn'
        onClick={this.handleProviderSearch}
        disabled={this.props.isLoading || this.state.disabled}
      >{this.props.isLoading ? 'Authenticating...' : 'Sign In'}</button>
    </div>
  }

  renderSignUpForm = () => {
    return <div className="login-input-group">
      <Message type={this.state.messageType} message={this.state.error || this.props.error} />
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
        disabled={this.props.isLoading || this.state.disabled}
      >{this.props.isLoading || this.state.disabled ? 'Creating...' : 'Create Account'}</button>
      <hr />
      <div className='mt3'>
        <div
          className='login-google'
          disabled={this.props.isLoading || this.state.disabled}
          onClick={this.googleLogin}
        ></div>
      </div>
    </div>
  }

  renderPasswordForm = () => {
    return <div className='login-input-group'>
      <Message type={this.state.messageType} message={this.state.error || this.props.error} />
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
        disabled={this.props.isLoading || this.state.disabled}
      >{this.props.isLoading || this.state.disabled ? 'Authenticating...' : 'Sign In'}</button>
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

export default connectSessionToLogin(Login, window.sessionStorage);
