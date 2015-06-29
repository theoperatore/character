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
    return (
      <div className="container">
        <h1>Do the things!</h1>
        <p><Link href="/style">Style Guide</Link></p>
        <p><Link href={"/profile/" + this.state.profile}>Profile</Link></p>
        <p><Link href="/user/bill/character/chet">Character App</Link></p>
        <p><Link href="/login">Log In</Link></p>
      </div>
    )
  }
})
