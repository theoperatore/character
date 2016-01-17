'use strict';

var React = require('react');
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
      "maxWidth" : 225,
      "padding" : 5
    }

    return (
      <div style={style}>
        <h1>Character</h1>
        <p><Link href={"/profile/" + this.state.profile}>Profile</Link></p>
      </div>
    )
  }

  // <p><Link href="/style">Style Guide</Link></p>
})
