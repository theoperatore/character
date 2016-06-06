'use strict';

import React from 'react';
import Link from '../router/Link';

export default React.createClass({
  displayName: 'Landing',

  getInitialState() {
    return ({
      
    })
  },

  render() {
    var style = {
      "maxWidth" : 225,
      "padding" : 5
    }

    return (
      <div style={style}>
        <h1>Pocket Character</h1>
        <hr />
        <Link className='link' href='/login'>Sign In</Link>
      </div>
    )
  }
})
