'use strict';

import React from 'react';
import ListItem from '../../components/ListItem/v2';
import Icon from '../../components/Icon';

export default React.createClass({
  displayName: 'Spell',

  propTypes: {
    spell: React.PropTypes.shape({
      id: React.PropTypes.string.isRequired,
      name: React.PropTypes.string.isRequired,
      desc: React.PropTypes.string.isRequired,
      cast: React.PropTypes.string.isRequired,
      range: React.PropTypes.string.isRequired,
      cmp: React.PropTypes.string.isRequired,
      dur: React.PropTypes.string.isRequired,
      prepared: React.PropTypes.bool.isRequired,
    }),
    spellLevel: React.PropTypes.number.isRequired,
  },

  render() {
    let { spell, spellLevel } = this.props;
    let subtext = `${spellLevel === 0 ? 'cantrip' : `lvl ${spellLevel}`}`;

    subtext = spell.prepared 
      ? <span><Icon icon='fa fa-bookmark text-spell' /> {subtext} </span>
      : subtext;

    return (
      <ListItem
        className={spell.prepared ? 'prepared-spell' : ''}
        name={spell.name}
        subtext={subtext}
        glyph={<Icon icon='icon-repo' />}
        glyphCss='text-spell'
      />
    )
  }
})
