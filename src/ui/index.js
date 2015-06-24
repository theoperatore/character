"use strict";

var FastClick = require('fastclick');
var React = require('react/addons');
var Router = require('./router/Router');
var db = require('../api');

var Landing = require('./views/Landing');
var App = require('./views/App');
var Login = require('./views/Login');
var User = require('./views/User');
var StyleGuide = require('./views/StyleGuide');
var HTML404 = require('./views/HTML404');

new FastClick(document.body);

// default route
Router.get('/', (params) => {
  React.render(<Landing />, document.body);
})

// view a character
Router.get('/user/(:id)/character/(:name)', (params) => {
  React.render(<App character={params.name} user={params.id} />, document.body);
})

// user
Router.get('/profile/(:id)', (params) => {
  if (!db.ref.getAuth()) {
    Router.nav('/login');
    return;
  }

  React.render(<User id={params.id} />, document.body);
})

// login
Router.get('/login/(:id)', (params) => {
  var user = db.ref.getAuth();

  // if the user is already logged in, then redirect to profile page
  if (user) {
    db.once('/users/' + user.uid).then((snapshot) => {
      var u = snapshot.val();
      Router.nav('/profile/' + u['profile_name']);
    })
  }
  else {
    React.render(<Login token={params.id} />, document.body);
  }
})

// Not found
Router.get('*', () => {
  React.render(<HTML404 />, document.body);
})

// style guide
Router.get('/style', () => {
  React.render(<StyleGuide />, document.body);
})

// start routing!
Router.init();

// set up auth listnen
// db.ref.onAuth((auth) => {
//   if (!auth) {
//     Router.nav('/login');
//   }
// })
