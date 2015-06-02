"use strict";

var FastClick = require('fastclick');
var React = require('react/addons');
var Router = require('./router/Router');
var db = require('../api/')

var App = require('./views/App');
var Login = require('./views/Login');
var User = require('./views/User');
var StyleGuide = require('./views/StyleGuide');
var HTML404 = require('./views/HTML404');

new FastClick(document.body);

// default route
Router.get('/', () => {
  React.render(<App />, document.body);
})

// user
Router.get('/user', () => {
  React.render(<User />, document.body);
})

// login
Router.get('/login', () => {
  React.render(<Login />, document.body);
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
Router.nav();

