'use strict';

import React from 'react';

export default function connectAuthRedirect(View, onUnauthed) {
  return React.createClass({

    propTypes: {
      dispatch: React.PropTypes.func.isRequired,
      state: React.PropTypes.object.isRequired,      
    },

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
    },

    render() {
      return <View
        {...this.props}
      />
    },
  });
}