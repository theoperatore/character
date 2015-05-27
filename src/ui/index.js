"use strict";

var FastClick = require('fastclick');
var React = require('react/addons');

var App = require('./views/App');
var Login = require('./views/Login');
var User = require('./views/User');
var StyleGuide = require('./views/StyleGuide');
var HTML404 = require('./views/HTML404');

var Index = React.createClass({
  render : function() {
    var view;
    console.log(this.props.location);
    switch(this.props.location) {
      case '/style' : view = <StyleGuide/>; break;
      case '/user'  : view = <User/>; break;
      default : view = <App />; break;
    }

    return (
      <div>
        {view}
      </div>
    );
  }
});

new FastClick(document.body);

function render() {
  var route = window.location.hash.substr(1);
  React.render(<Index location={route} />, document.body);
}

window.addEventListener('hashchange', render);
render();