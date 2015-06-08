"use strict";

var FastClick = require('fastclick');
var React = require('react/addons');
var Router = require('./router/Router');

var Landing = require('./views/Landing');
var App = require('./views/App');
var Login = require('./views/Login');
var Signup = require('./views/Signup');
var User = require('./views/User');
var StyleGuide = require('./views/StyleGuide');
var HTML404 = require('./views/HTML404');

new FastClick(document.body);

// default route
Router.get('/', (params) => {
  React.render(<Landing />, document.body);
})

// view a character
Router.get('/character/(:id)', (params) => {
  console.log(params.id);
  React.render(<App character={params.id} />, document.body);
})

// user
Router.get('/user/(:id)', (params) => {
  React.render(<User id={params.id} />, document.body);
})

// login
Router.get('/login/(:id)', (params) => {
  React.render(<Login token={params.id} />, document.body);
})

// signup
Router.get('/signup', () => {
  React.render(<Signup />, document.body);
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

