import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LoadingIndicator from 'components/LoadingIndicator';
import Type from 'components/Type';

import { authenticateUser } from 'state/user/actions';

import './index.css';

class UserProvider extends Component {
  static propTypes = {
    authenticateUser: PropTypes.func.isRequired,
    user: PropTypes.shape({
      isLoading: PropTypes.bool,
      error: PropTypes.string,
    }),
  };

  componentWillMount() {
    this.props.authenticateUser();
  }

  render() {
    const { user, children } = this.props;

    if (!user || user.isLoading) {
      return (
        <section className="user_provider__container">
          <LoadingIndicator />
        </section>
      );
    }

    if (user.error) {
      return (
        <section className="user_provider__container">
          <Type element="h1" variant="display-1">
            Some error occurred
          </Type>
          <Type element="p" variant="body">
            <Link to="/login">Try logging in again</Link>
          </Type>
        </section>
      );
    }

    return children;
  }
}

const mapStateToProps = /* istanbul ignore next */ state => ({
  user: state.user,
});

const mapDispatchToProps = {
  authenticateUser,
};

export { UserProvider };
export default connect(mapStateToProps, mapDispatchToProps)(UserProvider);
