

import Router from './router/Router';
import { ROUTE_LANDING, ROUTE_LOGIN, ROUTE_PROFILE, ROUTE_CHARACTER } from './routes';

// only the router should dispatch these actions,
// all other routing should be done via Router.nav(ROUTE)
export function initRouter(dispatch) {
  Router.get('/', () => {
    dispatch({
      type: 'GO_TO',
      data: {
        route: ROUTE_LANDING
      },
    });
  });

  Router.get('/login', () => {
    dispatch({
      type: 'GO_TO',
      data: {
        route: ROUTE_LOGIN
      }
    });
  });

  Router.get('/profile', () => {
    dispatch({
      type: 'GO_TO',
      data: {
        route: ROUTE_PROFILE
      }
    });
  });

  Router.get('/character/(:uid)', params => {
    dispatch({
      type: 'GO_TO',
      data: {
        route: ROUTE_CHARACTER,
        params,
      }
    });
  });

  Router.get('*', () => {
    dispatch({
      type: 'GO_TO',
      data: {
        route: 'notfound',
      },
    });
  });

  Router.init();
}