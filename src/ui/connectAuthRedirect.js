import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default function connectAuthRedirect(View, onUnauthed) {
  return class ConnectedAuthRedirect extends Component {
    static propTypes = {
      dispatch: PropTypes.func.isRequired,
      state: PropTypes.object.isRequired,
    }

    componentWillReceiveProps(nextProps) {
      let status = nextProps.state.status;
      let user = nextProps.state.user;

      if (!user.get('uid') &&
          !status.get('userSignedIn') &&
          !status.get('userAuthenticating') &&
          !status.get('userLoadingProfile'))
      {
        onUnauthed();
      }
    }

    render() {
      return <View
        {...this.props}
      />
    }
  }
}
