const defaultUser = {
  profile: null,
  isAuthenticating: true,
};

export function user(state = defaultUser, action) {
  switch (action.type) {
    case 'LOAD_USER': {
      if (action.error) {
        return {
          error: action.error,
        };
      }

      if (action.isAuthenticating) {
        return {
          isAuthenticating: true,
        };
      }

      if (action.data) {
        return {
          profile: action.data,
        };
      }

      return {
        profile: null,
      };
    }
    default:
      return state;
  }
}
