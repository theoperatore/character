'use strict';

var React = require('react/addons');
var Link = require('../router/Link');
var db = require('../../api');

module.exports = React.createClass({
  displayName : 'Landing',


  getInitialState : function() {
    return ({
      profile : ''
    })
  },


  componentWillMount : function() {
    var auth = db.ref.getAuth();

    if (auth) {
      db.once('/users/' + auth.uid).then((snap) => {
        this.setState({ profile : snap.val()['profile_name'] });
      })
    }
  },


  render : function() {
    var style = {
      "max-width" : 225,
      "padding" : 5
    }

    return (
      <div style={style}>
        <h1>Get to a place!</h1>
        <p className="lead">To view the app, click the profile link and select a demo character. To view all of the components the app uses, go to the Style Guide.</p>
        <p><Link href="/style">Style Guide</Link></p>
        <p><Link href={"/profile/" + this.state.profile}>Profile</Link></p>
      </div>
    )
  }
})
