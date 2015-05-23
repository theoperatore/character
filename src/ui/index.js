"use strict";

var FastClick = require('fastclick');
var React = require('react/addons');
var Router = require('react-router-component');
var App = require('./views/App');
var Login = require('./views/Login');
var User = require('./views/User');
var StyleGuide = require('./views/StyleGuide');
var HTML404 = require('./views/HTML404');

var Locations = Router.Locations;
var Location = Router.Location;
var NotFound = Router.NotFound;

var Index = React.createClass({
  handleBeforeNavigation : function(path, params) {
    console.log(path, params);
  },
  render : function() {
    return (
      <Locations hash onBeforeNavigation={this.handleBeforeNavigation}>
        <Location path="/" handler={<App />} />
        <Location path="/login" handler={<Login />} />
        <Location path="/style" handler={<StyleGuide />} />
        <Location path="/user/:id" matchKeys={['id']}  handler={<User />} />
        <NotFound handler={<HTML404 />}/>
      </Locations>
    );
  }
})


new FastClick(document.body);
React.render(<Index />, document.body);