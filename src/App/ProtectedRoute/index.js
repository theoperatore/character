import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export function ProtectedRoute({ user, ...routeProps }) {
  return (
    <Route
      path={routeProps.path}
      render={() => {
        if (!user.profile) {
          return <Redirect to="/login" />;
        }

        return <Route {...routeProps} />;
      }}
    />
  );
}

ProtectedRoute.propTypes = {
  user: PropTypes.shape({
    profile: PropTypes.object,
  }).isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(ProtectedRoute);
